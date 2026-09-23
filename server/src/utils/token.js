const crypto = require("crypto");

const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

const getSecret = () => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is required");
  return process.env.JWT_SECRET;
};

const signToken = (payload) => {
  const header = encode({ alg: "HS256", typ: "JWT" });
  const body = encode({ ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 });
  const signature = crypto.createHmac("sha256", getSecret()).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
};

const verifyToken = (token) => {
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) throw new Error("Invalid token");
  const expected = crypto.createHmac("sha256", getSecret()).update(`${header}.${body}`).digest();
  const received = Buffer.from(signature, "base64url");
  if (expected.length !== received.length || !crypto.timingSafeEqual(expected, received)) {
    throw new Error("Invalid token");
  }
  const payload = JSON.parse(Buffer.from(body, "base64url").toString());
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) throw new Error("Expired token");
  return payload;
};

module.exports = { signToken, verifyToken };
