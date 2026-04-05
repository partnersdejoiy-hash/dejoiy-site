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
  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "authorizationLetter") {
      setFormData((prev) => ({
        ...prev,
        authorizationLetter: files?.[0] || null
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
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
        authorizationLetterName: formData.authorizationLetter
          ? formData.authorizationLetter.name
          : "No file uploaded"
      };

      const response = await fetch("/api/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
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
        message: "Verification request sent successfully."
      });

      setFormData(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send verification request."
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
        <label className="mb-2 block text-sm text-white/70">Company name</label>
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
        <label className="mb-2 block text-sm text-white/70">Contact email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="contact@company.com"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Employee full name</label>
        <input
          type="text"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Employee full name"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Employee ID</label>
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Employee ID"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-white/70">Purpose of verification</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          rows="4"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Reason for verification"
          required
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-white/70">Upload authorization letter</label>
        <input
          type="file"
          name="authorizationLetter"
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70 outline-none"
        />
        <p className="mt-2 text-xs text-white/50">
          Current upload support sends the file name only. Full file upload requires storage integration.
        </p>
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
          {loading ? "Sending..." : "Send verification request"}
        </button>
      </div>
    </form>
  );
}
