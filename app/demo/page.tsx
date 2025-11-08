"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
export default function DemoPage() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [commandOutput, setCommandOutput] = useState<string[]>([]);
  const [theme, setTheme] = useState<"dark"|"light">("dark");
  const steps = [
    {
      title: "Step 1: Install Agent",
      command: "curl -fsSL install.is-host.in/install.sh | bash",
      description: "Run this command on your VPS to install the is-host.in agent",
      outputs: [
        "→ Downloading is-host.in agent...",
        "→ Detecting OS: Ubuntu 22.04 LTS",
        "→ Installing dependencies...",
        "  ✓ Docker 24.0.7",
        "  ✓ Docker Compose v2.21.0",
        "→ Registering agent...",
        "  ✓ Agent ID: srv_abc123xyz",
        "  ✓ Token: iht_7x9k2m4n8p1q",
        "",
        "🎉 Installation complete!",
        "",
        "Next steps:",
        "1. Copy your token: iht_7x9k2m4n8p1q",
        "2. Go to: https://is-host.in/connect",
        "3. Paste your token to link this server"
      ],
      duration: 500
    },
    {
      title: "Step 2: Connect to Dashboard",
      command: null,
      description: "Paste your token in the web dashboard",
      outputs: [
        "🌐 Opening dashboard...",
        "",
        "→ Connecting to server...",
        "  ✓ Server: Digital Ocean (NYC3)",
        "  ✓ IP: 159.89.123.45",
        "  ✓ CPU: 2 vCPUs",
        "  ✓ RAM: 4GB",
        "  ✓ Disk: 80GB SSD",
        "",
        "✅ Server connected successfully!"
      ],
      duration: 400
    },
    {
      title: "Step 3: Select Panel",
      command: null,
      description: "Choose which panel to deploy",
      outputs: [
        "📦 Available Panels:",
        "",
        "  → Pterodactyl (Game server management)",
        "  → CapRover (Platform as a Service)",
        "  → Coolify (Self-hosted Heroku)",
        "  → Dockploy (Docker deployment platform)",
        "",
        "Selected: Pterodactyl Panel",
        ""
      ],
      duration: 300
    },
    {
      title: "Step 4: Deploy with Live Logs",
      command: null,
      description: "Watch the installation in real-time",
      outputs: [
        "🚀 Starting deployment...",
        "",
        "[00:01] Pre-flight checks...",
        "[00:02]   ✓ Port 80 available",
        "[00:02]   ✓ Port 443 available",
        "[00:03]   ✓ Port 8080 available",
        "[00:04]   ✓ Sufficient disk space (65GB free)",
        "[00:05] Pulling Docker images...",
        "[00:12]   ✓ pterodactyl/panel:latest",
        "[00:18]   ✓ mariadb:10.5",
        "[00:22]   ✓ redis:alpine",
        "[00:24] Configuring database...",
        "[00:26]   ✓ Creating pterodactyl_db",
        "[00:28]   ✓ Running migrations",
        "[00:32] Setting up SSL with Let's Encrypt...",
        "[00:35]   ✓ Domain verified: panel.is-host.in",
        "[00:38]   ✓ Certificate issued",
        "[00:40] Configuring reverse proxy...",
        "[00:42]   ✓ Nginx configured",
        "[00:43]   ✓ Auto-redirect HTTP → HTTPS",
        "[00:45] Starting services...",
        "[00:47]   ✓ Database online",
        "[00:48]   ✓ Redis online",
        "[00:50]   ✓ Panel online",
        "[00:52] Running health checks...",
        "[00:54]   ✓ All services healthy",
        "",
        "✅ Deployment complete!",
        "",
        "🎉 Your Pterodactyl panel is live at:",
        "   https://panel.is-host.in",
        "",
        "📝 Admin credentials:",
        "   Email: admin@is-host.in",
        "   Password: (sent to your email)",
        "",
        "⏱️  Total time: 54 seconds"
      ],
      duration: 200
    },
    {
      title: "Step 5: Manage & Monitor",
      command: null,
      description: "View server status and metrics",
      outputs: [
        "📊 Server Dashboard",
        "",
        "Status: 🟢 Online",
        "Uptime: 99.8% (last 30 days)",
        "",
        "Resources:",
        "  CPU: 45% (0.9 / 2 vCPUs)",
        "  RAM: 2.1GB / 4GB (52%)",
        "  Disk: 12GB / 80GB (15%)",
        "",
        "Services:",
        "  ✓ Pterodactyl Panel",
        "  ✓ Database (MariaDB)",
        "  ✓ Cache (Redis)",
        "  ✓ Reverse Proxy (Nginx)",
        "",
        "SSL Certificate:",
        "  ✓ Valid until: March 8, 2026",
        "  ✓ Auto-renewal enabled",
        "",
        "🔔 Alerts: 0 active",
        "📈 Performance: Excellent"
      ],
      duration: 300
    }
  ];

  useEffect(() => {
    if (!isPlaying || step >= steps.length) return;

    const currentStep = steps[step];
    let outputIndex = 0;

    const interval = setInterval(() => {
      if (outputIndex < currentStep.outputs.length) {
        setCommandOutput(prev => [...prev, currentStep.outputs[outputIndex]]);
        outputIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (step < steps.length - 1) {
            setStep(step + 1);
            setCommandOutput([]);
          } else {
            setIsPlaying(false);
          }
        }, 1500);
      }
    }, currentStep.duration);
    return () => clearInterval(interval);
  }, [isPlaying, step]);
  function startDemo() {
    setStep(0);
    setCommandOutput([]);
    setIsPlaying(true);
  }
  function resetDemo() {
    setStep(0);
    setCommandOutput([]);
    setIsPlaying(false);
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
  return (
    <div className="grid-bg min-h-screen">
      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        ← home
      </Link>
      <button
        onClick={toggleTheme}
        className="fixed right-4 top-4 z-50 rounded border border-slate-300 bg-white px-3 py-1.5 text-xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
        aria-label="Toggle theme"
      >
        {theme === "light" ? "dark" : "light"}
      </button>
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            See it in action
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Deploy a panel in under 60 seconds
          </p>
        </div>
        {isPlaying && (
          <div className="mb-8 flex items-center justify-center gap-2">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className={`h-1.5 w-1.5 rounded-full transition-all ${
                  i < step ? 'bg-emerald-500' :
                  i === step ? 'bg-emerald-500 animate-pulse' :
                  'bg-slate-300 dark:bg-slate-700'
                }`}></div>
                {i < steps.length - 1 && (
                  <div className={`h-px w-8 ${
                    i < step ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="terminal rounded-lg p-3 sm:p-4">
          <div className="mb-3 flex items-center gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
              {isPlaying ? steps[step]?.title : 'demo.sh'}
            </span>
          </div>
          <div>
            {!isPlaying && step === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <h2 className="mb-3 text-xl font-semibold">Product Demo</h2>
                <p className="mb-8 max-w-md text-sm text-slate-600 dark:text-slate-400">
                  Watch a complete deployment from start to finish
                </p>
                <button
                  onClick={startDemo}
                  className="rounded bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  ▶ Start Demo
                </button>
              </div>
            ) : (
              <>
                {steps[step]?.command && (
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm text-emerald-500">$</span>
                    <span className="font-mono text-sm">{steps[step].command}</span>
                  </div>
                )}

                <div className="min-h-[400px] max-h-[450px] overflow-y-auto font-mono text-xs">
                  {commandOutput.map((line, i) => {
                    const safeLine = line || '';
                    return (
                      <div key={i} className={`${
                        safeLine.startsWith('→') ? 'text-blue-400' :
                        safeLine.startsWith('✓') || safeLine.startsWith('✅') || safeLine.startsWith('🎉') ? 'text-emerald-400' :
                        safeLine.startsWith('[') ? 'text-slate-400' :
                        safeLine.includes('error') || safeLine.includes('Error') ? 'text-red-400' :
                        'text-slate-600 dark:text-slate-400'
                      }`}>
                        {safeLine || '\u00A0'}
                      </div>
                    );
                  })}
                  {isPlaying && (
                    <span className="inline-block h-4 w-2 animate-pulse bg-emerald-400"></span>
                  )}
                </div>

                {!isPlaying && step === steps.length - 1 && (
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={resetDemo}
                      className="rounded border border-emerald-600 bg-transparent px-4 py-2 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white"
                    >
                      ↻ Replay Demo
                    </button>
                    <Link
                      href="/"
                      className="rounded bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                    >
                      Join Waitlist →
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <h3 className="mb-1.5 font-semibold">Fast Deploy</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Under 60 seconds
            </p>
          </div>
          <div className="text-center">
            <h3 className="mb-1.5 font-semibold">Live Logs</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Real-time output
            </p>
          </div>
          <div className="text-center">
            <h3 className="mb-1.5 font-semibold">Secure</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Automatic SSL
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
