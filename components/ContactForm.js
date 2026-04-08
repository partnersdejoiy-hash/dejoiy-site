import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  company: "",
  country: "",
  service: "Customer Experience",
  message: ""
};

export default function ContactForm({ endpoint = "/api/contact", buttonText = "Send message" }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      let result = null;
      try { result = await response.json(); } catch { throw new Error("Unexpected response."); }
      if (!response.ok) throw new Error(result?.error || "Something went wrong");
      setStatus({ type: "success", message: "Your message has been sent. We'll be in touch shortly." });
      setFormData(initialForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to send message." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "Full name", name: "name", type: "text", placeholder: "Your name" },
          { label: "Work email", name: "email", type: "email", placeholder: "you@company.com" },
          { label: "Company", name: "company", type: "text", placeholder: "Company name" },
          { label: "Country", name: "country", type: "text", placeholder: "Country" }
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1.5 text-[12px] font-medium text-white/50 uppercase tracking-wider">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="field"
              placeholder={field.placeholder}
              required
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block mb-1.5 text-[12px] font-medium text-white/50 uppercase tracking-wider">
          Service interested in
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="field"
          style={{ background: "#0d1030" }}
          required
        >
          {["Customer Experience","AI Data Operations","Trust & Safety","Content Moderation","Sales Support","AI Model Training","Back Office Operations","Financial Compliance","Web Designing & Creation"].map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1.5 text-[12px] font-medium text-white/50 uppercase tracking-wider">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="field resize-none"
          placeholder="Tell us about your requirements"
          required
        />
      </div>

      {status.message && (
        <div className={`rounded-xl px-4 py-3 text-sm ${
          status.type === "success"
            ? "border border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-400"
            : "border border-red-500/20 bg-red-500/[0.08] text-red-400"
        }`}>
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-[#020617] transition-all duration-200 hover:bg-white/90 ${
          loading ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        {loading ? "Sending..." : buttonText}
      </button>
    </form>
  );
}
