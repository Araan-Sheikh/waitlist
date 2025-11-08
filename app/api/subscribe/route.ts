import { NextResponse } from "next/server";
import { z } from "zod";
import { google } from "googleapis";
export const runtime = "nodejs";
const schema = z.object({
  email: z.string().email()
});
async function appendToSheet(email: string, timestamp: string) {
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.warn("Google Sheets not configured. Email will not be saved.");
    return;
  }
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:A",
    });
    const existingEmails = readResponse.data.values?.flat() || [];
    if (existingEmails.includes(email)) {
      throw new Error("already_exists");
    }
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "RAW",
      requestBody: {
        values: [[email, timestamp]],
      },
    });
  } catch (error: any) {
    if (error.message === "already_exists") {
      throw error;
    }
    throw new Error(`Google Sheets API error: ${error.message}`);
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);
    const normalized = email.trim().toLowerCase();
    const timestamp = new Date().toISOString();
    try {
      await appendToSheet(normalized, timestamp);
    } catch (e: any) {
      if (e.message === "already_exists") {
        return NextResponse.json({ message: "You're already on the list." }, { status: 200 });
      }
      console.error("Google Sheets error:", e.message);
    }
    return NextResponse.json({ message: "Thanks! We'll be in touch." }, { status: 200 });
  } catch (e: any) {
    const msg = e?.issues?.[0]?.message || e?.message || "Invalid request";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
