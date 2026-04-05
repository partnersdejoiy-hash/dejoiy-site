export default function VerificationForm() {
  return (
    <form className="grid gap-5 rounded-[2rem] glass p-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm text-white/70">Company name</label>
        <input
          type="text"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Company name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Contact email</label>
        <input
          type="email"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="contact@company.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Employee full name</label>
        <input
          type="text"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Employee full name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Employee ID</label>
        <input
          type="text"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Employee ID"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-white/70">Purpose of verification</label>
        <textarea
          rows="4"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Reason for verification"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-white/70">Upload authorization letter</label>
        <input
          type="file"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70 outline-none"
        />
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-accent via-secondary to-highlight px-6 py-3 text-sm font-semibold shadow-glow transition-all hover:scale-[1.03]"
        >
          Verification request sent to DEJOIY team
        </button>
      </div>
    </form>
  );
}