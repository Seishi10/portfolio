import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 5;
const requestLog = new Map<string, { count: number; startedAt: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const previous = requestLog.get(ip);
    const current = previous && now - previous.startedAt < rateWindowMs
      ? previous
      : { count: 0, startedAt: now };

    if (current.count >= maxRequestsPerWindow) {
      return NextResponse.json(
        { error: "Too many messages from this address. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((current.startedAt + rateWindowMs - now) / 1000)) } },
      );
    }

    current.count += 1;
    requestLog.set(ip, current);

    if (request.headers.get("content-length") && Number(request.headers.get("content-length")) > 20_000) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";

    if (website) return NextResponse.json({ ok: true });

    if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 5000) {
      return NextResponse.json({ error: "Please provide a valid name, email, and message." }, { status: 400 });
    }

    const { error: saveError } = await supabase.from("messages").insert({ name, email, message });
    if (saveError) {
      console.error("Failed to save contact message:", saveError.message);
      return NextResponse.json({ error: "We could not save your message." }, { status: 500 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL || "shirusei97@gmail.com";
    const sender = process.env.RESEND_FROM_EMAIL || "Portfolio contact <onboarding@resend.dev>";

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json({ error: "Email delivery is not configured yet." }, { status: 503 });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<h2>New portfolio message</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>`,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Failed to send contact email:", await emailResponse.text());
      return NextResponse.json({ error: "Your message was saved, but email delivery failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact request failed:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>\"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}
