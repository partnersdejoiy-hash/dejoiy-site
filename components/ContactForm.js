const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setStatus({ type: "", message: "" });

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let result = null;

    try {
      result = await response.json();
    } catch {
      throw new Error("Server returned an unexpected response.");
    }

    if (!response.ok) {
      throw new Error(result?.error || "Something went wrong.");
    }

    setStatus({
      type: "success",
      message: "Your message has been sent successfully.",
    });

    setFormData(initialForm);
  } catch (error) {
    setStatus({
      type: "error",
      message: error.message || "Failed to send message.",
    });
  } finally {
    setLoading(false);
  }
};
