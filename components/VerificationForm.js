import { useState } from "react";

const initialForm = {
  company: "",
  email: "",
  employeeName: "",
  employeeId: "",
  purpose: "",
  authorizationLetter: null
};

export default function VerificationForm() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "authorizationLetter") {
      setFormData((prev) => ({ ...prev, authorizationLetter: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const payload = {
        company: formData.company,
        email: formData.email,
        employeeName: formData.employeeName,
        employeeId: formData.employeeId,
        purpose: formData.purpose,
        authorizationLetterName: formData.authorizationLetter ? formData.authorizationLetter.name : "No file uploaded"
      };
      const response = await fetch("/api/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      let result = null;
      try { result = await response.json(); } catch { throw new Error("Unexpected response."); }
      if (!response.ok) throw new Error(result?.error || "Something went wrong");
      setStatus({ type: "success", message: "Verification request sent successfully. Our team will review and respond." });
      setFormData(initialForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to send verification request." });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Company name", name: "company", type: "text", placeholder: "Requesting company name" },
    { label: "Contact email", name: "email", type: "email", placeholder: "contact@company.com" },
    { label: "Employee full name", name: "employeeName", type: "text", placeholder: "Full legal name" },
    { label: "Employee ID (optional)", name: "employeeId", type: "text", placeholder: "Employee ID if known" }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
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
              required={field.name !== "employeeId"}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block mb-1.5 text-[12px] font-medium text-white/50 uppercase tracking-wider">
          Purpose of verification
        </label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          rows="4"
          className="field resize-none"
          placeholder="Please describe the reason for this verification request"
          required
        />
      </div>

      <div>
        <label className="block mb-1.5 text-[12px] font-medium text-white/50 uppercase tracking-wider">
          Authorization letter
        </label>
        <div className="relative">
          <input
            type="file"
            name="authorizationLetter"
            onChange={handleChange}
            className="field cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-white/[0.08] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white/70 hover:file:bg-white/[0.12]"
          />
        </div>
        <p className="mt-1.5 text-[11px] text-white/30">
          File name is transmitted. Full document upload requires storage integration.
        </p>
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
        className={`w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-[#05071a] transition-all duration-200 hover:bg-white/90 ${
          loading ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        {loading ? "Submitting..." : "Submit verification request"}
      </button>
    </form>
  );
}
