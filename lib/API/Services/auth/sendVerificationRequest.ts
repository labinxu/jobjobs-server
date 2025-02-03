import { SendVerificationRequestParams } from "next-auth/providers";

import transporter from "./transporter";

export const sendVerificationRequest = async ({
  url,
  identifier,
}: SendVerificationRequestParams) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "from-user@test.com",
      to: identifier,
      subject: "Activate your account",
      text: url,
    });
  } catch (error) {
    throw new Error("Failed to send verification email.");
  }
};
