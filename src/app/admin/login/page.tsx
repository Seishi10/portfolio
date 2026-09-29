"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setError("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password || normalizedEmail.length > 254 || password.length > 128) {
      setError("Invalid email or password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        setError("Invalid email or password.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-sm flex-col justify-center px-6">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            maxLength={254}
            required
            spellCheck={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            maxLength={128}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Checking…" : "Log In"}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </section>
  );
}
