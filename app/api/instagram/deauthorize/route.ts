import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import {
  extractSignedRequest,
  parseSignedRequest,
} from "@/lib/meta/signed-request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Deauthorize callback. Meta calls this when a user removes Comentio from their
 * Instagram (Settings > Apps and websites). We drop the connected account,
 * which cascades to its automations, DM logs and tracked links, so we stop
 * acting on their behalf the moment they revoke access.
 */
export async function POST(request: NextRequest) {
  const signedRequest = await extractSignedRequest(request);
  const payload = parseSignedRequest(signedRequest);
  if (!payload) {
    return NextResponse.json(
      { error: "Invalid signed_request" },
      { status: 400 }
    );
  }

  const userId = typeof payload.user_id === "string" ? payload.user_id : null;
  if (userId) {
    await prisma.instagramAccount.deleteMany({
      where: { instagramId: userId },
    });
  }

  return NextResponse.json({ success: true });
}
