"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill in all fields before submitting.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website: "" }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        setErrorMessage(result?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMessage("Unable to send your message. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} required className="glass-input min-h-11 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none transition-colors duration-200 hover:border-white/20 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="glass-input min-h-11 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none transition-colors duration-200 hover:border-white/20 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea id="message" rows={5} value={message} onChange={(event) => setMessage(event.target.value)} required className="glass-input rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none transition-colors duration-200 hover:border-white/20 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={status === "sending"} className="min-h-11 w-full rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[#0A0E17] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_20px_var(--color-accent-soft)] disabled:cursor-wait disabled:opacity-60 sm:w-fit">
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      {status === "success" && <p role="status" className="text-sm text-[var(--color-success)]">Message sent successfully. Thank you!</p>}
      {status === "error" && <p role="alert" className="text-sm text-[var(--color-error)]">{errorMessage}</p>}
    </form>
  );
}
