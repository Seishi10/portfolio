"use client";
import { supabase } from "@/lib/supabaseBrowser";
import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

      async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      return;
    }

    const { error } = await supabase
      .from("messages")
      .insert({ name, email, message });

    if (error) {
      console.error("Failed to save message:", error.message);
      setStatus("error");
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="glass-input min-h-11 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none transition-colors duration-200 hover:border-white/20 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="glass-input min-h-11 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none transition-colors duration-200 hover:border-white/20 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="glass-input rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none transition-colors duration-200 hover:border-white/20 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      <button
        type="submit"
        className="min-h-11 w-full rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[#0A0E17] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_20px_var(--color-accent-soft)] sm:w-fit"
      >
        Send Message
      </button>

      {status === "success" && (
        <p className="text-sm text-green-600">
          Message received — thank you! (Not yet saved permanently — backend coming in a later phase.)
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Please fill in all fields before submitting.
        </p>
      )}
    </form>
  );
}
