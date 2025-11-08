"use client";

import { useState, useEffect } from "react";
export default function Page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState<"dark"|"light">("dark");
  const [showCinematic, setShowCinematic] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const scenes = [
    { type: "title", text: "is-host.in", subtitle: "The Universal Installer", duration: 3000 },
    { type: "fade", text: "Developers struggle with panel installations...", duration: 3000 },
    { type: "problem", lines: [
      "Complex installation",
      "Incompatibility issues",
      "Time-consuming setups",
      "High error rates",
      "No unified management"
    ], duration: 5000 },
    { type: "transition", text: "Until now.", duration: 2000 },
    { type: "hero", text: "curl -fsSL install.is-host.in/install.sh | bash", subtitle: "One command. Any panel. Anywhere.", duration: 4000 },
    { type: "feature", title: "Agent-Based", text: "Lightweight Go binary. Real-time logs. Auto-detection.", duration: 3500 },
    { type: "feature", title: "Multi-Panel", text: "Pterodactyl. CapRover. Coolify. Dockploy. More.", duration: 3500 },
    { type: "feature", title: "Centralized", text: "One dashboard. All your VPS instances.", duration: 3500 },
    { type: "roadmap", lines: [
      "Q1 2026 — MVP Launch",
      "Q2 2026 — 5 Major Panels",
      "Q3 2026 — AI Healing",
      "Q4 2026 — Managed Cloud",
      "2027 — Marketplace"
    ], duration: 4500 },
    { type: "vision", text: "The Vercel for VPS Panels", subtitle: "Make server management simple.", duration: 3500 },
    { type: "founder", text: "Built by is-cod.in", subtitle: "Mohammed Araan Sheikh, Founder & CTO", duration: 3500 },
    { type: "end", text: "Join the waitlist.", subtitle: "Early access Q1 2026", duration: 3000 }
  ];
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
      } else {
        setIsPlaying(false);
      }
    }, scenes[currentScene].duration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentScene, scenes]);

  function startCinematic() {
    setShowCinematic(true);
    setIsPlaying(true);
    setCurrentScene(0);
  }

  function closeCinematic() {
    setShowCinematic(false);
    setIsPlaying(false);
    setCurrentScene(0);
  }

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.theme = newTheme;
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setMessage(data.message || "You are on the list!");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong");
    }
  }
  return (
    <div className="grid-bg min-h-screen">
      <button
        onClick={toggleTheme}
        className="fixed right-4 top-4 z-50 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
        aria-label="Toggle theme"
      >
        {theme === "light" ? "dark" : "light"}
      </button>
      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-16">
        <div className="mb-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">$ is-host init</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            &gt; The universal installer <br/>for developer panels<span className="animate-blink">_</span>
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Install a Go agent with one command, connect to the web dashboard, and deploy Pterodactyl, CapRover, Coolify and more with live logs.
          </p>
        </div>
        <div className="terminal rounded-lg p-3 sm:p-4">
          <div className="mb-3 flex items-center gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">waitlist.sh</span>
          </div>
          <form onSubmit={submit}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2">
                <span className="text-sm text-emerald-500">$</span>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status==='loading'}
                className="w-full rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 sm:w-auto sm:px-3 sm:py-1.5 sm:text-xs"
              >
                {status === 'loading' ? '...' : 'join'}
              </button>
            </div>
            {message && (
              <p className={`mt-2 text-xs ${status==='success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
        <div className="terminal mt-6 rounded-lg p-3 sm:p-4">
          <pre className="overflow-x-auto text-xs text-slate-600 dark:text-slate-400">
            <code>
{`# 1. Install agent on your VPS
curl -fsSL install.is-host.in/install.sh | bash

# 2. Copy the token from output
# Agent registered: abc123...

# 3. Go to is-host.in
# Paste token → select panel → deploy with live logs`}
            </code>
          </pre>
        </div>
        <div className="mt-8 space-y-3 text-sm sm:mt-12 sm:space-y-4">
          <Feature label="one-command" desc="curl | bash — zero manual setup" />
          <Feature label="verified" desc="Pre-tested scripts with SSL & DNS" />
          <Feature label="multi-panel" desc="Pterodactyl, CapRover, Coolify, Dockploy" />
          <Feature label="centralized" desc="Dashboard for all VPS instances" />
          <Feature label="agent-based" desc="Lightweight Go binary with WebSocket logs" />
          <Feature label="auto-detect" desc="OS, Docker, dependencies — all configured" />
        </div>
        <div className="mt-6 sm:mt-8">
          <button
            onClick={startCinematic}
            className="group flex w-full items-center justify-center gap-2 rounded border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-700 hover:shadow-lg sm:w-auto"
          >
            <span>▶</span>
            <span>Watch the story</span>
          </button>
        </div>
        {showCinematic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <button
              onClick={closeCinematic}
              className="absolute right-6 top-6 z-10 rounded border border-slate-700 bg-black/50 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-sm hover:bg-black/70"
            >
              ✕ skip
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <Scene scene={scenes[currentScene]} key={currentScene} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900">
              <div 
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
              />
            </div>
          </div>
        )}
        <div className="mt-12 sm:mt-16">
          <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <FAQ 
              question="When does it launch?"
              answer="MVP launches Q1 2026 (January - March 2026). Early access for waitlist members starts first."
            />
            <FAQ 
              question="Is it free?"
              answer="Yes! The open beta is completely free. We'll introduce premium features later for enterprise users."
            />
            <FAQ 
              question="Which panels are supported?"
              answer="Launch: Pterodactyl, CapRover, Coolify, Dockploy. More panels added based on community demand."
            />
            <FAQ 
              question="Do I need Docker installed?"
              answer="No. The agent auto-detects your OS and installs all dependencies (Docker, SSL, DNS) automatically."
            />
            <FAQ 
              question="What VPS providers work?"
              answer="Any Linux VPS: DigitalOcean, Linode, Vultr, Hetzner, AWS, Azure, or self-hosted servers."
            />
            <FAQ 
              question="Can I manage multiple servers?"
              answer="Yes! The centralized dashboard lets you manage all your VPS instances from one place."
            />
          </div>
        </div>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:mt-16 sm:pt-8">
          <p>is-host.in · Early access opens Q1 2026</p>
        </footer>
      </section>
    </div>
  );
}
function Feature({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex gap-2 sm:gap-3">
      <span className="text-emerald-500 flex-shrink-0">→</span>
      <div className="flex flex-col sm:block">
        <span className="font-medium">{label}</span>
        <span className="sm:ml-2 text-slate-500 dark:text-slate-400">{desc}</span>
      </div>
    </div>
  );
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-3 p-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-900 sm:items-center sm:p-4"
      >
        <span className="text-sm font-medium pr-2">{question}</span>
        <span className="text-lg text-emerald-600 dark:text-emerald-400 flex-shrink-0">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="border-t border-slate-200 px-3 py-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400 sm:px-4">
          {answer}
        </div>
      )}
    </div>
  );
}
function Scene({ scene }: { scene: any }) {
  if (scene.type === "title") {
    return (
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold text-white">{scene.text}</h1>
        <p className="mt-4 text-2xl text-slate-400">{scene.subtitle}</p>
      </div>
    );
  }
  if (scene.type === "fade") {
    return (
      <div className="text-center animate-fade-in">
        <p className="text-3xl md:text-4xl text-slate-300">{scene.text}</p>
      </div>
    );
  }
  if (scene.type === "problem") {
    return (
      <div className="max-w-2xl animate-fade-in">
        <h2 className="text-4xl font-bold text-rose-400 mb-8">The Problem</h2>
        <ul className="space-y-4 text-2xl text-slate-300">
          {scene.lines.map((line: string, i: number) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-rose-400">✗</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (scene.type === "transition") {
    return (
      <div className="text-center animate-fade-in">
        <p className="text-5xl md:text-7xl font-bold text-emerald-400">{scene.text}</p>
      </div>
    );
  }
  if (scene.type === "hero") {
    return (
      <div className="max-w-3xl text-center animate-fade-in">
        <pre className="rounded-lg bg-slate-900 border border-emerald-500/30 p-6 text-left text-emerald-400 text-xl md:text-2xl">
          <code>{scene.text}</code>
        </pre>
        <p className="mt-6 text-2xl text-slate-300">{scene.subtitle}</p>
      </div>
    );
  }
  if (scene.type === "feature") {
    return (
      <div className="max-w-2xl text-center animate-fade-in">
        <h2 className="text-5xl font-bold text-emerald-400 mb-6">{scene.title}</h2>
        <p className="text-2xl text-slate-300">{scene.text}</p>
      </div>
    );
  }
  if (scene.type === "pricing") {
    return (
      <div className="max-w-2xl animate-fade-in">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Pricing</h2>
        <ul className="space-y-3 text-xl text-slate-300">
          {scene.lines.map((line: string, i: number) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-emerald-400">✓</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (scene.type === "roadmap") {
    return (
      <div className="max-w-2xl animate-fade-in">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Roadmap</h2>
        <ul className="space-y-3 text-xl text-slate-300">
          {scene.lines.map((line: string, i: number) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    );
  }
  if (scene.type === "vision") {
    return (
      <div className="text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-emerald-400">{scene.text}</h1>
        <p className="mt-6 text-2xl text-slate-300">{scene.subtitle}</p>
      </div>
    );
  }
  if (scene.type === "founder") {
    return (
      <div className="text-center animate-fade-in">
        <p className="text-3xl text-slate-300">{scene.text}</p>
        <p className="mt-4 text-xl text-slate-400">{scene.subtitle}</p>
      </div>
    );
  }
  if (scene.type === "end") {
    return (
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold text-white">{scene.text}</h1>
        <p className="mt-4 text-2xl text-emerald-400">{scene.subtitle}</p>
      </div>
    );
  }

  return null;
}
