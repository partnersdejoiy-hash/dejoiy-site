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
      return res.status(400).json({
        error: "Required fields are missing"
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: "Missing RESEND_API_KEY"
      });
    }

    if (!process.env.VERIFICATION_TO_EMAIL) {
      return res.status(500).json({
        error: "Missing VERIFICATION_TO_EMAIL"
      });
    }

    if (!process.env.FROM_EMAIL) {
      return res.status(500).json({
        error: "Missing FROM_EMAIL"
      });
    }

    const response = await resend.emails.send({
      from: `DEJOIY <${process.env.FROM_EMAIL}>`,
      to: [process.env.VERIFICATION_TO_EMAIL],
      reply_to: email,
      subject: `New Background Verification Request - ${employeeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New Background Verification Request</h2>
          <p><strong>Company Name:</strong> ${company}</p>
          <p><strong>Contact Email:</strong> ${email}</p>
          <p><strong>Employee Name:</strong> ${employeeName}</p>
          <p><strong>Employee ID:</strong> ${employeeId || "Not provided"}</p>
          <p><strong>Purpose:</strong></p>
          <div style="padding: 12px; background: #f4f4f4; border-radius: 8px;">
            ${purpose}
          </div>
          <p><strong>Authorization Letter:</strong> ${authorizationLetterName || "Not uploaded"}</p>
        </div>
      `
    });

    return res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.log("VERIFICATION_TO_EMAIL:", process.env.VERIFICATION_TO_EMAIL);

    return res.status(500).json({
      error: error?.message || "Failed to send verification request"
    });
  }
}
