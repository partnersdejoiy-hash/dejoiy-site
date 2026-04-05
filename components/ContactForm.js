import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  company: "",
  country: "",
  service: "Customer Experience",
  message: ""
};

export default function ContactForm({ endpoint = "/api/contact", buttonText = "Speak with expert" }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      let result = null;

      try {
        result = await response.json();
      } catch {
        throw new Error("Server returned an unexpected response.");
      }

      if (!response.ok) {
        throw new Error(result?.error || "Something went wrong");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully."
      });

      setFormData(initialForm);

    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send message."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-[2rem] glass p-6 md:grid-cols-2"
    >
      <div>
        <label className="mb-2 block text-sm text-white/70">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="you@company.com"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Company name"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Country"
          required
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-white/70">
          Service interested
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-primary px-4 py-3 outline-none focus:border-secondary"
          required
        >
          <option>Customer Experience</option>
          <option>AI Data Operations</option>
          <option>Trust & Safety</option>
          <option>Content Moderation</option>
          <option>Sales Support</option>
          <option>AI Model Training</option>
          <option>Back Office Operations</option>
          <option>Financial Compliance</option>
          <option>Web Designing & Creation</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-white/70">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Tell us about your requirements"
          required
        />
      </div>

      {status.message && (
        <div className="md:col-span-2">
          <div
            className={`rounded-2xl px-4 py-3 text-sm ${
              status.type === "success"
                ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                : "border border-red-400/30 bg-red-500/10 text-red-300"
            }`}
          >
            {status.message}
          </div>
        </div>
      )}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className={`rounded-full bg-gradient-to-r from-accent via-secondary to-highlight px-6 py-3 text-sm font-semibold shadow-glow transition-all hover:scale-[1.03] ${
            loading ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          {loading ? "Sending..." : buttonText}
        </button>
      </div>
    </form>
  );
}
