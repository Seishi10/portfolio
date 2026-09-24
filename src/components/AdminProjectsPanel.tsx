"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Project = {
  id: string;
  title: string;
  type: string;
  description: string;
  tech: string[];
  created_at: string;
};

export default function AdminProjectsPanel({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [error, setError] = useState("");

  async function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !type.trim() || !description.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    const techArray = tech
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const { error: insertError } = await supabase.from("projects").insert({
      title,
      type,
      description,
      tech: techArray,
    });

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setTitle("");
    setType("");
    setDescription("");
    setTech("");
    router.refresh();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this project? This cannot be undone."
    );
    if (!confirmed) return;

    await supabase.from("projects").delete().eq("id", id);
    router.refresh();
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="text-lg font-semibold">Add Project</h2>
        <form onSubmit={handleAdd} className="mt-4 flex flex-col gap-4">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <input
            placeholder="Type (e.g. Academic Project)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <textarea
            placeholder="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <input
            placeholder="Tech (comma-separated, e.g. React, Node.js)"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <button
            type="submit"
            className="w-fit rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Add Project
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold">
          Existing Projects ({initialProjects.length})
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {initialProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm"
            >
              <div>
                <p className="font-medium text-sm">{project.title}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {project.type}
                </p>
              </div>
              <button
                onClick={() => handleDelete(project.id)}
                className="text-xs font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}