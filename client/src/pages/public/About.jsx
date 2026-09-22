import { Link } from "react-router-dom";
import { ShieldCheck, Target, Eye, Users, Zap, FileText, MapPin } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ScrollReveal from "../../components/common/ScrollReveal";

const values = [
  { icon: ShieldCheck, title: "Safety first", description: "Every engagement begins and ends with HSE discipline — no shortcut is worth a life." },
  { icon: Target, title: "Technical rigour", description: "Analysis before assumption. We model, test and verify before capital is committed." },
  { icon: Users, title: "Community respect", description: "We work with local communities and content, not around them." },
  { icon: Eye, title: "Integrity", description: "Honest scopes, honest reporting, and compliance that stands up to audit." },
];

const timeline = [
  { label: "FOUNDED", title: "IYAENE Nigeria Limited registered", description: "Incorporated with the Corporate Affairs Commission as RC 937834, founded on engineering and environmental expertise." },
  { label: "GROWTH", title: "Oil & gas support works", description: "Civil engineering support projects delivered on live operational sites for the oil and gas sector." },
  { label: "PUBLIC SECTOR", title: "Government consulting", description: "Technical consulting engagements for state and federal government institutions on infrastructure needs." },
  { label: "RESEARCH", title: "GSIT developed & applied", description: "The Gauss-Seidel Interactive Technique becomes a practical tool across pollution monitoring and traffic modelling." },
  { label: "TODAY", title: "Four integrated pillars", description: "Engineering, Environment, Transport and Modeling offered as one coordinated, accountable service." },
];

export default function About() {
  return (
    <>
      <Header />

      <section className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <ScrollReveal>
            <p className="text-orange-500 text-sm font-semibold mb-3">ABOUT US</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
              An engineering partner rooted in the Niger Delta
            </h1>
            <p className="text-gray-300 max-w-2xl">
              IYAENE Nigeria Limited (RC 937834) brings engineering, environmental, transport and
              modelling expertise together under one accountable roof in Port Harcourt, Rivers
              State.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <img src="/why-iyaene.jpg" alt="IYAENE engineers on site" className="rounded-lg w-full h-[420px] object-cover" />
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-orange-500 text-sm font-semibold mb-2">OUR STORY</p>
          <h2 className="text-3xl font-bold mb-4">Built in the Niger Delta, for the Niger Delta</h2>
          <p className="text-gray-500 mb-4">
            IYAENE Nigeria Limited is a registered engineering, construction and environment
            company operating from Port Harcourt, Rivers State. We were established to bring
            genuine technical depth to projects that demand it — from oil & gas support works to
            public infrastructure and environmental compliance.
          </p>
          <p className="text-gray-500 mb-4">
            The firm grew out of a simple observation: projects in this region don't fail for
            lack of ambition, they fail for lack of local knowledge backed by proper engineering
            discipline. We set out to be the partner that offers both — grounded in the terrain,
            communities and regulations of the Niger Delta, and rigorous about the technical
            work.
          </p>
          <p className="text-gray-500 mb-8">
            Today our four service pillars — Engineering, Environment, Transport and Modeling —
            let clients coordinate one accountable partner instead of four, with a single
            standard of quality running through every stage.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-2xl font-bold text-orange-500">RC 937834</p>
              <p className="text-xs text-gray-400">Corporate Affairs Commission</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-500">4 Pillars</p>
              <p className="text-xs text-gray-400">Integrated disciplines</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-500">Port Harcourt</p>
              <p className="text-xs text-gray-400">Head office base</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <p className="text-orange-500 text-sm font-semibold mb-2">WHAT DRIVES US</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 max-w-2xl">
              Mission, vision and the values we don't trade away
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ScrollReveal>
              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-md flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-gray-400 mb-1">MISSION</p>
                <h3 className="font-semibold text-lg mb-2">Deliver engineering that holds up under scrutiny</h3>
                <p className="text-sm text-gray-500">
                  To provide engineering, environmental and technical services that meet
                  international standards while remaining grounded in the realities of the Niger
                  Delta — delivered safely, on schedule and within regulation.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-gray-400 mb-1">VISION</p>
                <h3 className="font-semibold text-lg mb-2">The region's most trusted technical partner</h3>
                <p className="text-sm text-gray-500">
                  To be the engineering and environmental partner of choice for oil & gas
                  operators, government agencies and developers who need local expertise they can
                  genuinely rely on.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 100}>
                <div className="bg-white rounded-lg p-5 border border-gray-100 h-full">
                  <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center mb-3">
                    <v.icon className="w-4 h-4 text-gray-700" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{v.title}</h4>
                  <p className="text-xs text-gray-500">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <ScrollReveal>
          <p className="text-orange-500 text-sm font-semibold mb-2">OUR JOURNEY</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 max-w-2xl">
            From a registered company to a full-service practice
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {timeline.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 100}>
              <div className="border-t-4 border-orange-500 pt-4">
                <p className="text-xs font-semibold text-orange-500 mb-1">{item.label}</p>
                <h4 className="font-semibold text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <ScrollReveal>
          <div className="bg-gray-950 text-white rounded-lg p-8 md:p-12">
            <p className="text-orange-500 text-sm font-semibold mb-2">LEADERSHIP</p>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 max-w-lg">
                  The people who stand behind every project
                </h2>
                <p className="text-gray-400 max-w-lg">
                  Two nationally recognised professionals lead IYAENE — one shaping the
                  analytical methods, the other driving delivery on the ground.
                </p>
              </div>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 border border-gray-600 hover:border-gray-400 text-white font-medium px-5 py-2.5 rounded-md w-fit"
              >
                Meet the full team →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center font-bold mb-3">AO</div>
                <p className="font-semibold">Dr. Abraham Oba</p>
                <p className="text-xs text-orange-400 mb-2">Ph.D, FNSE, FNITHE, MDA</p>
                <p className="text-xs text-gray-500 font-semibold mb-1">MANAGING DIRECTOR & PRINCIPAL CONSULTANT</p>
                <p className="text-sm text-gray-400">Environmental engineering, transport modelling & technical leadership</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center font-bold mb-3">CA</div>
                <p className="font-semibold">Engr. Clement Atamakhai</p>
                <p className="text-xs text-orange-400 mb-2">B.Eng, MNSE</p>
                <p className="text-xs text-gray-500 font-semibold mb-1">HEAD, ENGINEERING & PROJECTS</p>
                <p className="text-sm text-gray-400">Civil engineering delivery, oil & gas support projects</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-gray-800/80 text-gray-200 text-xs px-3 py-1.5 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5" />
              Response within 2 business days
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 max-w-lg">
              Want to work with a team that knows this terrain?
            </h2>
            <p className="text-gray-400 max-w-lg">
              Tell us about your project and we'll show you how our engineering, environmental,
              transport and modelling capabilities fit together.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link to="/request-a-quote" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md">
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