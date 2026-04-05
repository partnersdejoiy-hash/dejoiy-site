import { Resend } from "resend";

const resend = new Resend(process.env.re_QLwQ96i2_KGJWoqr7pC2mHjZxH6ZVif1E);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { company, email, employeeName, employeeId, purpose } = req.body;

    const data = await resend.emails.send({
      from: "DEJOIY <no-reply.notifications@corp.dejoiy.com>",
      to: ["employment.verification@dejoiy.com"],
      subject: "Employee Verification Request",
      html: `
        <h2>Employee Verification Request</h2>

        <p><b>Company:</b> ${company}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Employee Name:</b> ${employeeName}</p>
        <p><b>Employee ID:</b> ${employeeId}</p>
        <p><b>Purpose:</b> ${purpose}</p>
      `
    });

    console.log(data);

    return res.status(200).json({ success: true });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Email failed",
      details: error.message
    });
  }
}
