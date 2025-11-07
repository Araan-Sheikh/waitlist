import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";
export const runtime = "nodejs";
const schema = z.object({
  email: z.string().email()
});
async function ensureDir(p: string) {
  try { await fs.mkdir(p, { recursive: true }); } catch {}
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    const dataDir = path.join(process.cwd(), "data");
    const file = path.join(dataDir, "waitlist.csv");
    await ensureDir(dataDir);

    let existing = "";
    try { existing = await fs.readFile(file, "utf8"); } catch {}

    const normalized = email.trim().toLowerCase();
    if (existing && existing.split("\n").some(line => line.split(",")[0] === normalized)) {
      return NextResponse.json({ message: "You’re already on the list." }, { status: 200 });
    }
    const header = "email,timestamp\n";
    const line = `${normalized},${new Date().toISOString()}\n`;
    const content = existing
      ? (existing.startsWith("email,") ? existing + line : header + existing + line)
      : header + line;

    await fs.writeFile(file, content, "utf8");

    return NextResponse.json({ message: "Thanks! We’ll be in touch." }, { status: 200 });
  } catch (e: any) {
    const msg = e?.issues?.[0]?.message || e?.message || "Invalid request";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
