import { createHmac, timingSafeEqual } from "crypto";

function base64UrlToBuffer(input: string): Buffer {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(padded, "base64");
}

/**
 * Parse and verify a Meta `signed_request` (the payload sent to the deauthorize
 * and data-deletion callbacks). The signature is HMAC-SHA256 over the RAW
 * base64url payload string, keyed by the app secret. Instagram-Login apps sign
 * with the Instagram app secret and Facebook-Login apps with the Facebook one;
 * both belong to the same app, so we accept either — mirroring how the webhook
 * verifies signatures. Returns the decoded payload, or null when the request is
 * missing, tampered, or unparseable.
 */
export function parseSignedRequest(
  signedRequest: string | null | undefined
): Record<string, unknown> | null {
  if (!signedRequest || !signedRequest.includes(".")) return null;
  const [encodedSig, encodedPayload] = signedRequest.split(".", 2);
  if (!encodedSig || !encodedPayload) return null;

  const secrets = [
    process.env.FACEBOOK_APP_SECRET,
    process.env.INSTAGRAM_APP_SECRET,
  ].filter((s): s is string => Boolean(s));
  if (secrets.length === 0) {
    throw new Error(
      "FACEBOOK_APP_SECRET or INSTAGRAM_APP_SECRET is required to verify signed requests"
    );
  }

  const providedSig = base64UrlToBuffer(encodedSig);
  const signatureValid = secrets.some((secret) => {
    const expected = createHmac("sha256", secret).update(encodedPayload).digest();
    try {
      return timingSafeEqual(providedSig, expected);
    } catch {
      return false;
    }
  });
  if (!signatureValid) return null;

  try {
    const json = base64UrlToBuffer(encodedPayload).toString("utf8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Meta posts these callbacks as `application/x-www-form-urlencoded` with a
 * `signed_request` field; some tooling sends JSON. Read either.
 */
export async function extractSignedRequest(
  request: Request
): Promise<string | null> {
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as { signed_request?: unknown };
      return typeof body?.signed_request === "string" ? body.signed_request : null;
    }
    const form = await request.formData();
    const value = form.get("signed_request");
    return typeof value === "string" ? value : null;
  } catch {
    return null;
  }
}
