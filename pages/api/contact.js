import { Resend } from "resend";

const resend = new Resend(process.env.re_QhGnWW4G_CPx4fP4xPA34LCjCMtrXtFc6);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, company, country, service, message } = req.body;

    await resend.emails.send({
      from: "DEJOIY <onboarding@resend.dev>",
      to: ["partners.dejoiy@gmail.com"],
      subject: "New Contact Form Submission",
      html: `
        <h2>New Lead from DEJOIY Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Email sending failed" });
  }
}
