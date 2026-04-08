import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      company,
      email,
      employeeName,
      employeeId,
      purpose,
      authorizationLetterName
    } = req.body;

    if (!company || !email || !employeeName || !purpose) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Email service is not configured" });
    }

    const toEmail = process.env.VERIFICATION_TO_EMAIL || process.env.CONTACT_EMAIL || "hello@corp.dejoiy.com";
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

    const response = await resend.emails.send({
      from: `DEJOIY Corp <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: `Background Verification Request — ${employeeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111; max-width: 600px;">
          <h2 style="border-bottom: 2px solid #eee; padding-bottom: 12px;">New Background Verification Request</h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 180px;">Company Name:</td><td>${company}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Contact Email:</td><td>${email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Employee Name:</td><td>${employeeName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Employee ID:</td><td>${employeeId || "Not provided"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Authorization Letter:</td><td>${authorizationLetterName || "Not uploaded"}</td></tr>
          </table>
          <p style="font-weight: bold; margin-top: 16px;">Purpose of Verification:</p>
          <div style="padding: 12px; background: #f6f6f6; border-radius: 8px; border-left: 3px solid #6B5CFF;">
            ${purpose}
          </div>
          <p style="margin-top: 24px; color: #888; font-size: 13px;">This request was submitted via the DEJOIY Corp employee verification portal.</p>
        </div>
      `
    });

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Verification form error:", error);
    return res.status(500).json({ error: error?.message || "Failed to send verification request" });
  }
}
