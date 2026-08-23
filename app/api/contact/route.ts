import { NextResponse } from "next/server";
import { z } from "zod";
const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(2000),
});
export async function POST(request: Request) {
  try {
    const body = schema.safeParse(await request.json());
    if (!body.success)
      return NextResponse.json(
        { message: "Please check each field and try again." },
        { status: 400 },
      );
    return NextResponse.json(
      {
        message:
          "Thanks — your message is ready. Email delivery will activate when a provider is configured.",
      },
      { status: 202, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { message: "That request could not be processed." },
      { status: 400 },
    );
  }
}
