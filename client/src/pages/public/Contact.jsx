import { useState } from "react";
import { MapPin, Mail, Clock, Landmark, Send } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ScrollReveal from "../../components/common/ScrollReveal";
import { CometSpinner } from "@/components/ring";
import { messageService } from "../../services/messageService";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await messageService.submit(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <section className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <ScrollReveal>
            <p className="text-red-800 text-sm font-semibold mb-3">CONTACT</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-2xl">
              Let's talk about your project
            </h1>
            <p className="text-gray-300 max-w-2xl">
              Whether you have a defined scope or just an idea, our team is ready to help. Send
              a message, call the office, or visit us in Port Harcourt.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: MapPin, title: "Head office", value: "#48 Old Aba Road, Port Harcourt, Rivers State, Nigeria" },
            { icon: Mail, title: "Email us", value: "iyaenenigerialtd@gmail.com" },
            { icon: Clock, title: "Working hours", value: "Mon – Fri · 9:00am – 4:30pm | Sat · 9:00am – 1:00pm", sub: "Closed on public holidays" },
            { icon: Landmark, title: "Registration", value: "RC 937834", sub: "Corporate Affairs Commission" },
          ].map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 100}>
              <div className="border border-gray-100 rounded-lg p-5 h-full">
                <div className="w-10 h-10 bg-blue-100 text-blue-950 rounded-md flex items-center justify-center mb-3">
                  <c.icon className="w-4 h-4" />
                </div>
                <p className="font-semibold text-sm mb-1">{c.title}</p>
                <p className="text-sm text-gray-500">{c.value}</p>
                {c.sub && <p className="text-xs text-gray-400 mt-1">{c.sub}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ScrollReveal>
            <p className="text-red-800 text-sm font-semibold mb-2">SEND A MESSAGE</p>
            <h2 className="text-2xl font-bold mb-2">We're here to help</h2>
            <p className="text-gray-500 mb-6">
              Fill in the form and we'll get back to you. For detailed project scopes, use the
              quote request instead.
            </p>

            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 text-sm">
                Thanks — your message has been sent. We'll get back to you within one business day.
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
                      placeholder="e.g. Amina Bello"
                      className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                    />
                  </div>
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
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={500}
                    placeholder="How can we help? (max 500 characters)"
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
                    {status === "loading" ? "Sending..." : "Send message"}
                  </button>
                  <p className="text-xs text-gray-400">We usually reply within one business day.</p>
                </div>
              </form>
            )}
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="rounded-lg overflow-hidden border border-gray-100 mb-4">
              <iframe
                title="IYAENE office location"
                src="https://www.google.com/maps?q=48+Old+Aba+Road,+Port+Harcourt&output=embed"
                className="w-full h-72 border-0"
                loading="lazy"
              />
            </div>
            <div className="bg-gray-950 text-white rounded-lg p-5">
              <p className="font-semibold mb-3">Visit the office</p>
              <p className="text-sm text-gray-300 mb-2">#48 Old Aba Road, Port Harcourt, Rivers State, Nigeria</p>
              <p className="text-sm text-gray-300 mb-2">iyaenenigerialtd@gmail.com</p>
              <p className="text-sm text-gray-300">Mon – Fri · 9:00am – 4:30pm</p>
              <p className="text-sm text-gray-300">Sat · 9:00am – 1:00pm</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}