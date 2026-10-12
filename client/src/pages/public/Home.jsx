import { Link } from "react-router-dom";
import {
  FileText, Grid3x3, MapPin, Mail, ShieldCheck, BadgeCheck,
  Landmark, Leaf, Truck, Box, Send, Search, ClipboardList, Car
} from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ScrollReveal from "../../components/common/ScrollReveal";

const services = [
  {
    icon: Landmark,
    title: "Engineering",
    description: "Civil and structural engineering support for oil & gas, industrial and public infrastructure projects.",
  },
  {
    icon: Leaf,
    title: "Environment",
    description: "Environmental assessment, remediation and compliance services that keep projects within regulation.",
  },
  {
    icon: Truck,
    title: "Transport",
    description: "Logistics, haulage and site-access planning engineered for the realities of the Niger Delta terrain.",
  },
  {
    icon: Box,
    title: "Modeling",
    description: "Digital modelling, simulation and visualisation that de-risk decisions before ground is broken.",
  },
];

const whyPoints = [
  {
    icon: ShieldCheck,
    title: "Safety-first execution",
    description: "Documented HSE procedures and site supervision on every engagement, because reputations are built on the ground.",
  },
  {
    icon: MapPin,
    title: "Niger Delta familiarity",
    description: "Practical knowledge of the terrain, communities and logistics realities across Rivers State and beyond.",
  },
  {
    icon: FileText,
    title: "Full regulatory compliance",
    description: "Registered with RC 937834 and experienced in meeting Nigerian regulatory and reporting standards.",
  },
  {
    icon: BadgeCheck,
    title: "Local content delivery",
    description: "Nigerian engineering talent and local sourcing that strengthens communities and satisfies local content goals.",
  },
];

const team = [
  {
    initials: "AO",
    name: "Dr. Abraham Oba",
    credentials: "Ph.D, FNSE, FNITHE, MDA",
    role: "MANAGING DIRECTOR & PRINCIPAL CONSULTANT",
    description: "A fellow of the Nigerian Society of Engineers with deep experience leading environmental and civil engineering engagements for oil & gas and government clients.",
  },
  {
    initials: "CA",
    name: "Engr. Clement Atamakhai",
    credentials: "B.Eng, MNSE",
    role: "HEAD, ENGINEERING & PROJECTS",
    description: "Leads engineering delivery across fabrication, civil works and site supervision, with a focus on safe, on-schedule execution in challenging terrain.",
  },
];

const process = [
  {
    icon: Send,
    step: "01",
    title: "Submit your request",
    description: "Tell us the project type, scope and timeline through the short quote form. It takes under two minutes.",
  },
  {
    icon: Search,
    step: "02",
    title: "Technical review",
    description: "Our engineers review the brief and clarify any technical or regulatory requirements with your team.",
  },
  {
    icon: ClipboardList,
    step: "03",
    title: "Scope & proposal",
    description: "We return a clear scope, approach and costed proposal aligned to your budget and delivery window.",
  },
  {
    icon: Car,
    step: "04",
    title: "Mobilise & deliver",
    description: "Once approved, we mobilise teams and equipment, reporting progress at every milestone.",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-construction.jpg')] bg-cover bg-center opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-gray-800/80 text-gray-200 text-xs px-3 py-1.5 rounded-full mb-6">
              <MapPin className="w-3.5 h-3.5" />
              RC 937834 · Port Harcourt, Rivers State
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
              Engineering, environment and construction partners you can build on.
            </h1>
            <p className="text-gray-300 max-w-2xl mb-8 text-lg">
              IYAENE Nigeria Limited supports oil & gas operators, government agencies and
              construction firms with civil engineering, environmental, transport and modeling
              services — delivered safely, compliantly and on schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/request-a-quote"
                className="inline-flex items-center justify-center gap-2 bg-red-800 hover:bg-red-950 text-white font-medium px-6 py-3 rounded-md"
              >
                <FileText className="w-4 h-4" />
                Request a Quote
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 text-white font-medium px-6 py-3 rounded-md"
              >
                <Grid3x3 className="w-4 h-4" />
                Explore Services
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> iyaenenigerialtd@gmail.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Port Harcourt, Nigeria
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" /> HSE-compliant delivery
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats bar */}
        <div className="relative bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "20+", label: "Years combined industry experience" },
              { value: "150+", label: "Projects supported across the Niger Delta" },
              { value: "4", label: "Core engineering disciplines" },
              { value: "RC 937834", label: "Fully registered Nigerian company" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-red-800">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <ScrollReveal>
          <p className="text-red-800 text-sm font-semibold mb-2">WHAT WE DO</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl">
            Four disciplines, one accountable delivery partner
          </h2>
          <p className="text-gray-500 max-w-2xl mb-10">
            From first survey to final handover, our teams cover the technical and environmental
            scope that keeps complex projects moving.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 120}>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 h-full">
                <div className="w-11 h-11 bg-blue-100 text-blue-950 rounded-md flex items-center justify-center mb-4">
                  <service.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <Link to="/services" className="text-sm text-blue-950 hover:text-blue-900 font-medium">
                  Request this service →
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Why IYAENE */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <p className="text-red-700 text-sm font-semibold mb-2">WHY IYAENE</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Local knowledge, engineering discipline
            </h2>
            <p className="text-gray-500 mb-8">
              Operating from Port Harcourt, we understand the terrain, the regulations and the
              operating realities of the Niger Delta. That means fewer surprises, faster
              mobilisation and project outcomes that hold up under scrutiny.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyPoints.map((point) => (
                <div key={point.title} className="flex gap-3">
                  <div className="w-9 h-9 bg-orange-100 text-red-800 rounded-md flex items-center justify-center shrink-0">
                    <point.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{point.title}</p>
                    <p className="text-sm text-gray-500">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="relative">
              <img
                src="/why-iyaene.jpg"
                alt="IYAENE engineers on site"
                className="rounded-lg w-full h-105 object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-gray-950 text-white rounded-md px-4 py-3">
                <p className="text-red-700 font-bold text-sm">RC 937834</p>
                <p className="text-xs text-gray-300">Registered in Nigeria with the Corporate Affairs Commission</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <ScrollReveal>
          <p className="text-red-800 text-sm font-semibold mb-2">LEADERSHIP</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl">
            Led by engineers with the credentials to back it up
          </h2>
          <p className="text-gray-500 max-w-2xl mb-10">
            Our engagements are overseen by nationally recognised professionals whose memberships
            and fellowships reflect real technical standing.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 150}>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 h-full">
                <div className="w-12 h-12 bg-blue-950 text-white rounded-full flex items-center justify-center font-bold mb-4">
                  {member.initials}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-blue-950 mb-1">{member.credentials}</p>
                <p className="text-xs text-gray-400 font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-gray-500">{member.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <p className="text-red-800 text-sm font-semibold mb-2">HOW WE WORK</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl">
              From first enquiry to mobilisation
            </h2>
            <p className="text-gray-500 max-w-2xl mb-10">
              A clear, low-friction process that gets you a considered technical response
              quickly — without endless back-and-forth.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 120}>
                <div className="bg-white border border-gray-100 rounded-lg p-6 h-full relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-950 text-white rounded-md flex items-center justify-center">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-3xl font-bold text-gray-200">{item.step}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-gray-800/80 text-gray-200 text-xs px-3 py-1.5 rounded-full mb-4">
              Response within 2 business days
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 max-w-lg">
              Have a project that needs the right partner?
            </h2>
            <p className="text-gray-400 max-w-lg">
              Share your scope and timeline. Our engineers will review it and come back with a
              clear approach and costed proposal — no obligation.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/request-a-quote"
                className="inline-flex items-center justify-center gap-2 bg-red-800 hover:bg-red-950 text-white font-medium px-6 py-3 rounded-md"
              >
                <FileText className="w-4 h-4" />
                Request a Quote
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 text-white font-medium px-6 py-3 rounded-md"
              >
                <MapPin className="w-4 h-4" />
                Talk to Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}