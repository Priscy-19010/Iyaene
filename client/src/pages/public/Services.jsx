import { Link } from "react-router-dom";
import { CheckCircle2, FileText, MapPin, MessageCircle } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ScrollReveal from "../../components/common/ScrollReveal";

const clientTypes = ["Oil & gas operators", "Government agencies", "Construction firms", "Industrial developers", "Marine & logistics partners", "Infrastructure contractors"];

const services = [
  {
    number: "01",
    title: "Engineering",
    tag: "Engineering",
    image: "/service-engineering.jpg",
    description: "Civil and structural engineering support for oil & gas, industrial and public infrastructure projects.",
    items: ["Civil & structural design support", "Fabrication and construction supervision", "Pipeline and facility civil works", "Technical documentation and reporting"],
  },
  {
    number: "02",
    title: "Environment",
    tag: "Environment",
    image: "/service-environment.jpg",
    description: "Environmental assessment, remediation and compliance services that keep projects within regulation.",
    items: ["Environmental impact assessment (EIA)", "Site remediation and waste management", "Water, soil and air quality monitoring", "Regulatory compliance and permitting"],
  },
  {
    number: "03",
    title: "Transport",
    tag: "Transport",
    image: "/service-transport.jpg",
    description: "Logistics, haulage and site-access planning engineered for the realities of the Niger Delta terrain.",
    items: ["Heavy haulage and equipment movement", "Route surveys and access planning", "Fleet coordination and site logistics", "Dredging and marine support logistics"],
  },
  {
    number: "04",
    title: "Modeling",
    tag: "Modeling",
    image: "/service-modeling.jpg",
    description: "Digital modelling, simulation and visualisation that de-risk decisions before ground is broken.",
    items: ["3D site and structural modelling", "Engineering simulation and analysis", "Cost and schedule modelling", "Visualisation for stakeholder approval"],
  },
];

export default function Services() {
  return (
    <>
      <Header />

      <section className="bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/services-hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
          <ScrollReveal>
            <p className="text-red-800 text-sm font-semibold mb-3">OUR SERVICES</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
              Four service pillars built for complex projects
            </h1>
            <p className="text-gray-300 max-w-2xl">
              IYAENE Nigeria Limited combines engineering, environmental, transport and modeling
              capability so you can coordinate one accountable partner instead of four. Choose a
              service below to request a scoped quote.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <ScrollReveal>
          <p className="text-gray-500 max-w-2xl mb-6">
            Every engagement starts with understanding your scope, site conditions and regulatory
            obligations. From there we assemble the right mix of disciplines and deliver against
            a clear plan.
          </p>
          <div className="flex flex-wrap gap-2">
            {clientTypes.map((c) => (
              <span key={c} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">{c}</span>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20 space-y-16">
        {services.map((s, i) => (
          <ScrollReveal key={s.number}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative">
                <img src={s.image} alt={s.title} className="rounded-lg w-full h-85 object-cover" />
                <span className="absolute top-4 left-4 bg-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  {s.tag}
                </span>
              </div>
              <div>
                <span className="text-5xl font-bold text-gray-200">{s.number}</span>
                <h2 className="text-2xl font-bold mb-2 mt-2">{s.title}</h2>
                <p className="text-gray-500 mb-5">{s.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {s.items.map((item) => (
                    <p key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-red-800 shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
                <Link
                  to={`/request-a-quote?service=${s.title.toLowerCase()}`}
                  className="inline-flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-sm font-medium px-5 py-2.5 rounded-md"
                >
                  <FileText className="w-4 h-4" /> Request {s.title} support
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-2">Not sure which service you need?</h2>
            <p className="text-gray-500 max-w-lg">
              Describe the project in your own words and our team will advise on the right scope
              and disciplines.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-red-800 hover:bg-red-950 text-white font-medium px-6 py-3 rounded-md w-fit"
            >
              <MessageCircle className="w-4 h-4" /> Describe your project
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-gray-800/80 text-gray-200 text-xs px-3 py-1.5 rounded-full mb-4">
              Response within 2 business days
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 max-w-lg">Let's scope your next project</h2>
            <p className="text-gray-400 max-w-lg">
              Send us the details and we'll come back with a clear approach, timeline and costed
              proposal.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link to="/request-a-quote" className="inline-flex items-center justify-center gap-2 bg-red-800 hover:bg-red-950 text-white font-medium px-6 py-3 rounded-md">
                <FileText className="w-4 h-4" /> Request a Quote
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 text-white font-medium px-6 py-3 rounded-md">
                <MapPin className="w-4 h-4" /> Talk to Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}