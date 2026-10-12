import { useState } from "react";
import { Send, Mail, ArrowRight } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ScrollReveal from "../../components/common/ScrollReveal";
import { CometSpinner } from "@/components/ring";
import { quoteService } from "../../services/quoteService";

const steps = [
  { label: "We acknowledge your request by your preferred contact method." },
  { label: "An engineer reviews your scope and may ask clarifying questions." },
  { label: "You receive a costed proposal aligned to your budget and timeline." },
];

export default function RequestQuote() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "Engineering",
    budgetRange: "",
    timeline: "",
    contactMethod: "Email",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await quoteService.submit({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        message: `Project type: ${form.projectType}. Budget: ${form.budgetRange || "Not specified"}. Timeline: ${form.timeline || "Not specified"}. Preferred contact: ${form.contactMethod}.\n\n${form.message}`,
        website: form.website,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <section className="bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/quote-hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
          <ScrollReveal>
            <p className="text-red-800 text-sm font-semibold mb-3">REQUEST A QUOTE</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-2xl">
              Tell us about your project
            </h1>
            <p className="text-gray-300 max-w-2xl">
              Complete the short form below and our engineers will review your scope and respond
              with a clear approach, timeline and costed proposal within two business days.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <ScrollReveal className="lg:col-span-2">
          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-6">
              <p className="font-semibold mb-1">Request received</p>
              <p className="text-sm">
                Thanks — our engineers will review your scope and respond within two business
                days via your preferred contact method.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Chidi Okonkwo"
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company / organisation</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g. Delta Energy Services Ltd"
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone number *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+234 800 000 0000"
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project type *</label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  >
                    <option>Engineering</option>
                    <option>Environment</option>
                    <option>Transport</option>
                    <option>Modeling</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Budget range (optional)</label>
                  <select
                    name="budgetRange"
                    value={form.budgetRange}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  >
                    <option value="">Select a range</option>
                    <option>Under ₦5,000,000</option>
                    <option>₦5,000,000 – ₦20,000,000</option>
                    <option>₦20,000,000 – ₦100,000,000</option>
                    <option>Above ₦100,000,000</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred timeline</label>
                  <select
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  >
                    <option value="">Select a timeline</option>
                    <option>Immediate</option>
                    <option>Within 1 month</option>
                    <option>1–3 months</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred contact method</label>
                  <select
                    name="contactMethod"
                    value={form.contactMethod}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  >
                    <option>Email</option>
                    <option>Phone</option>
                    <option>WhatsApp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Project description *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={500}
                  placeholder="Describe the scope, location and any technical or regulatory requirements. (max 500 characters)"
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                />
              </div>

              {/* Honeypot field — hidden from real users */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              {status === "error" && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 bg-red-800 hover:bg-red-950 text-white font-medium px-6 py-2.5 rounded-md disabled:opacity-60"
                >
                  {status === "loading" ? <CometSpinner className="w-4 h-4 text-white" /> : <Send className="w-4 h-4" />}
                  {status === "loading" ? "Submitting..." : "Submit quote request"}
                </button>
                <p className="text-xs text-gray-400">We respond within 2 business days. Your details are never shared with third parties.</p>
              </div>
            </form>
          )}
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="bg-gray-950 text-white rounded-lg p-6 mb-6">
            <p className="font-semibold mb-4">What happens next</p>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-6 h-6 bg-red-800 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-300">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-6">
            <p className="font-semibold mb-4">Reviewed by our leadership</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-950 text-white rounded-full flex items-center justify-center text-xs font-bold">AO</div>
                <div>
                  <p className="text-sm font-medium">Dr. Abraham Oba</p>
                  <p className="text-xs text-gray-400">Ph.D, FNSE, FNITHE, MDA</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-950 text-white rounded-full flex items-center justify-center text-xs font-bold">CA</div>
                <div>
                  <p className="text-sm font-medium">Engr. Clement Atamakhai</p>
                  <p className="text-xs text-gray-400">B.Eng, MNSE</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">RC 937834 · IYAENE Nigeria Limited</p>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-lg p-6">
            <p className="font-semibold mb-2">Prefer to talk first?</p>
            <p className="text-sm text-gray-600 mb-4">
              Reach us directly — we're happy to discuss your project before any paperwork.
            </p>
            <a href="mailto:iyaenenigerialtd@gmail.com" className="flex items-center gap-2 text-sm text-blue-950 font-medium mb-2">
              <Mail className="w-4 h-4" /> iyaenenigerialtd@gmail.com
            </a>
            <a href="/contact" className="flex items-center gap-2 text-sm text-red-800 font-medium">
              Go to contact page <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}