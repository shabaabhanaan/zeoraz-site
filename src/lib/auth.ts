import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "zeoraz_secure_jwt_secret_token_key_123_abc";

// Helper to hash passwords using PBKDF2
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(":");
  const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === testHash;
}

// Simple Base64URL encoding helpers
function base64urlEncode(buf: Buffer): string {
  return buf.toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlDecode(str: string): Buffer {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64");
}

// Custom lightweight JWT Token Signer/Verifier
export function signToken(payload: Record<string, unknown>): string {
  const header = { alg: "HS256", typ: "JWT" };
  
  const encodedHeader = base64urlEncode(Buffer.from(JSON.stringify(header)));
  const encodedPayload = base64urlEncode(Buffer.from(JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 days expiration
  })));

  const signature = crypto.createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();

  const encodedSignature = base64urlEncode(signature);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export function verifyToken(token: string): Record<string, unknown> | null {
  try {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) return null;

    // Verify signature match
    const computedSignature = crypto.createHmac("sha256", JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest();
    
    const encodedComputedSignature = base64urlEncode(computedSignature);
    if (encodedComputedSignature !== signature) return null;

    const decodedPayload = JSON.parse(base64urlDecode(payload).toString("utf8"));
    
    // Check expiration
    if (decodedPayload.exp && Date.now() / 1000 > decodedPayload.exp) {
      return null;
    }

    return decodedPayload as Record<string, unknown>;
  } catch {
    return null;
  }
}
