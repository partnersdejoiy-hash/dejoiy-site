export default function ContactForm() {
  return (
    <form className="grid gap-5 rounded-[2rem] glass p-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm text-white/70">Name</label>
        <input
          type="text"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Email</label>
        <input
          type="email"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Company</label>
        <input
          type="text"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Company name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Country</label>
        <input
          type="text"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Country"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-white/70">Service interested</label>
        <select className="w-full rounded-2xl border border-white/10 bg-primary px-4 py-3 outline-none focus:border-secondary">
          <option>Customer Experience</option>
          <option>AI Data Operations</option>
          <option>Trust & Safety</option>
          <option>Content Moderation</option>
          <option>Sales Support</option>
          <option>AI Model Training</option>
          <option>Back Office Operations</option>
          <option>Financial Compliance</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-white/70">Message</label>
        <textarea
          rows="5"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-secondary"
          placeholder="Tell us about your requirements"
        />
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-accent via-secondary to-highlight px-6 py-3 text-sm font-semibold shadow-glow transition-all hover:scale-[1.03]"
        >
          Speak with expert
        </button>
      </div>
    </form>
  );
}