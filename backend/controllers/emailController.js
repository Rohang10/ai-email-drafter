import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// ✅ Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Make sure this exists in your .env

export const draftAndSendEmail = async (req, res) => {
  const { to, subject, context } = req.body;

  console.log("Step 1: Received request:", { to, subject, context });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a professional email with the subject "${subject}" and the content: "${context}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const draft = await response.text();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: draft,
    });

    res.json({ success: true, draft });
  } catch (error) {
    console.error("❌ Error in draftAndSendEmail:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
