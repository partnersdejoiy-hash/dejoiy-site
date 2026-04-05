export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, company, country, service, message } = req.body;

    console.log("Contact form submission:", {
      name,
      email,
      company,
      country,
      service,
      message
    });

    return res.status(200).json({
      success: true,
      message: "Message received successfully"
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({
      error: "Server error"
    });
  }
}
