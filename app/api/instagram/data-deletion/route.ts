import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/db/client";
import { getBaseUrl } from "@/lib/env";
import {
  extractSignedRequest,
  parseSignedRequest,
} from "@/lib/meta/signed-request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Data Deletion Request callback (Meta Platform Terms 3.2). When a user asks
 * Meta to delete their data, Meta posts a signed_request here. We delete the
 * connected Instagram account (cascade removes automations, DM logs, tracked
 * links and clicks) and return the status URL + confirmation code Meta requires.
 * The human-readable status page lives at /data-deletion.
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
  const confirmationCode = randomBytes(8).toString("hex");

  if (userId) {
    await prisma.instagramAccount.deleteMany({
      where: { instagramId: userId },
    });
    await prisma.operationalEvent
      .create({
        data: {
          source: "SYSTEM",
          level: "INFO",
          message: `Data deletion processed for Instagram user ${userId} (code ${confirmationCode})`,
        },
      })
      .catch(() => {});
  }

  return NextResponse.json({
    url: `${getBaseUrl()}/data-deletion?code=${confirmationCode}`,
    confirmation_code: confirmationCode,
  });
}
