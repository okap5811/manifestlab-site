import { NextResponse } from "next/server";
import redirects from "../../../../content/redirects.json";

// /go/<token> — first-party campaign links (SPEC-attribution-spine).
// Always 302 (never 301/308): destinations must stay re-pointable
// without browsers or social-app webviews caching the hop (G-03).
// Unknown token → 302 to the homepage.

type RedirectEntry = { to: string };
const map: Record<string, RedirectEntry> = redirects;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const entry = map[token];
  const destination = entry?.to || new URL("/", request.url).toString();
  return NextResponse.redirect(destination, 302);
}
