const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
{
    name: { type: String, required: true, trim: true, minlength: 2 },
    password: { type: String, required: true, minlength: 8, select: false },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    profile: { type: String, required: false },
},
    { timestamps: true }
);

userSchema.pre("save", async function hashPassword() {
    if (!this.isModified("password")) return;

    const salt = crypto.randomBytes(16).toString("hex");
    const hash = await new Promise((resolve, reject) => {
        crypto.scrypt(this.password, salt, 64, (error, derivedKey) => {
            if (error) return reject(error);
            resolve(derivedKey.toString("hex"));
        });
    });
    this.password = `scrypt$${salt}$${hash}`;
});

userSchema.methods.comparePassword = async function comparePassword(password) {
    const [algorithm, salt, storedHash] = this.password.split("$");
    if (algorithm !== "scrypt" || !salt || !storedHash) return false;

    const derivedHash = await new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (error, derivedKey) => {
            if (error) return reject(error);
            resolve(derivedKey);
        });
    });
    return crypto.timingSafeEqual(derivedHash, Buffer.from(storedHash, "hex"));
};

module.exports = mongoose.model("user", userSchema);
