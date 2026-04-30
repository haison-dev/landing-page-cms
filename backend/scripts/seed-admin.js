"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../src/config/db");
const User_1 = require("../src/models/User");
dotenv_1.default.config({ path: '../.env' });
const run = async () => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
        throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
    }
    await (0, db_1.connectDB)();
    const existing = await User_1.User.findOne({ email: email.toLowerCase() });
    const hash = await bcryptjs_1.default.hash(password, 10);
    if (existing) {
        existing.password = hash;
        await existing.save();
        console.log('Admin account updated');
    }
    else {
        await User_1.User.create({ email: email.toLowerCase(), password: hash, role: 'admin' });
        console.log('Admin account created');
    }
    process.exit(0);
};
run().catch((error) => {
    console.error(error);
    process.exit(1);
});
