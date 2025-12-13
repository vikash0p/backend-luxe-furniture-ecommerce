import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envConfig } from "../../config/env.js";
import { createCookieOptions } from "../../utils/cookie.utils.js";





export const RegisterUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }],
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        const result = await User.findById(createdUser._id).select("-password");

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    if (user && isPasswordCorrect) {
        const token = jwt.sign({ id: user._id }, envConfig.jwtSecret, { expiresIn: "365d" });

        const cookieOptions = createCookieOptions();
        cookieOptions.expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

        res.cookie("token", token, cookieOptions);
        res.status(200).json({ message: "Login successful", token, success: true });
    } else {
        res.status(401).json({ message: "Invalid credentials", success: false });
    }
}
export const LogoutUser = (req, res) => {
    try {
        const cookieOptions = createCookieOptions();

        res.cookie("token", "", { ...cookieOptions, expires: new Date(0) });
        res.clearCookie("token", cookieOptions);

        res.status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Logout failed", success: false });
    }
};



export const getUserDetails = async (req, res) => {
    try {
        const { id } = req.user;

        if (!id) {
            return res.status(400).json({
                message: "User ID is missing in request",
                success: false,
            });
        }

        const user = await User.findOne({ _id: id }).select('-password'); // Exclude the password field

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        res.status(200).json({
            message: "User details fetched successfully",
            result: user,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({
            message: "An error occurred while fetching user details",
            success: false,
        });
    }
};
