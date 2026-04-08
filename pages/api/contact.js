import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, company, country, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Missing RESEND_API_KEY" });
    }

    const toEmail = process.env.CONTACT_EMAIL || "hello@corp.dejoiy.com";
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

    await resend.emails.send({
      from: `DEJOIY Corp <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Country:</strong> ${country || "Not provided"}</p>
          <p><strong>Service:</strong> ${service || "Not specified"}</p>
          <p><strong>Message:</strong></p>
          <div style="padding: 12px; background: #f4f4f4; border-radius: 8px;">
            ${message}
          </div>
        </div>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: error?.message || "Email sending failed" });
  }
}
