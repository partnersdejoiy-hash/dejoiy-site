export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    console.log("Contact form received:", data);

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error"
    });
  }
}
