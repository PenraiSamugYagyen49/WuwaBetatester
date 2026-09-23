const express = require("express");
const Upload = require("../models/upload.model");
const User = require("../models/user.model");
const { verifyToken } = require("../utils/token");

const router = express.Router();
const maxUploadSize = 25 * 1024 * 1024;

async function requireUploadUser(clientPayload) {
  let authToken;
  try {
    authToken = JSON.parse(clientPayload || "{}").authToken;
  } catch {
    authToken = null;
  }
  if (!authToken) {
    const error = new Error("Sign in before uploading a file.");
    error.status = 401;
    throw error;
  }

  try {
    const { sub } = verifyToken(authToken);
    const user = await User.findById(sub).select("_id");
    if (user) return user;
  } catch {
    // Return one auth error for missing, invalid, expired, and deleted-user tokens.
  }
  const error = new Error("Your session is invalid or expired.");
  error.status = 401;
  throw error;
}

router.post("/", async (req, res, next) => {
  try {
    const { handleUpload } = await import("@vercel/blob/client");
    const result = await handleUpload({
      request: req,
      body: req.body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const user = await requireUploadUser(clientPayload);
        if (!/^uploads\/[A-Za-z0-9][A-Za-z0-9._-]*$/.test(pathname)) {
          const error = new Error("Uploads must use the uploads/ path.");
          error.status = 400;
          throw error;
        }
        return {
          allowedContentTypes: [
            "image/*", "audio/*", "video/*", "application/pdf", "application/zip",
            "application/octet-stream", "text/plain",
          ],
          maximumSizeInBytes: maxUploadSize,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ ownerId: user._id.toString() }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const { ownerId } = JSON.parse(tokenPayload);
        await Upload.updateOne(
          { pathname: blob.pathname },
          {
            $set: {
              ownerId,
              url: blob.url,
              pathname: blob.pathname,
              contentType: blob.contentType || "application/octet-stream",
              size: blob.size,
            },
          },
          { upsert: true },
        );
      },
    });
    res.status(200).json(result);
  } catch (error) {
    if (error.status) return res.status(error.status).json({ message: error.message });
    next(error);
  }
});

module.exports = router;
