import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  // n'expose rien d'autre
  return NextResponse.json({ supabaseUrl: url });
}
