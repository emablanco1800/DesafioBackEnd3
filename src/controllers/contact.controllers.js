import { sendEmail } from "../utils/sendEmail.js";

export const contactEmail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    await sendEmail(email, subject, message);

    res.status(200).send("Email Sent");
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};