import { Link } from "react-router-dom";
import { Droplet, Car as CarIcon, TrendingUp, FileText, MapPin } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ScrollReveal from "../../components/common/ScrollReveal";

const members = [
  {
    initials: "AO",
    credentials: "BSc, MSc,Ph.D, HND, OND, MDA, FNSE, FNIHTE, ",
    name: "Dr. Abraham Oba",
    role: "Managing Director & Principal Consultant",
    bio: [
      "Dr. Abraham Oba is a versatile engineering and environmental professional whose career spans world-class construction and consulting engagements with multinational organisations. His work has taken him across highway, transportation, engineering and environmental modelling — giving IYAENE a rare breadth of technical leadership under one roof.",
      "Alongside his consulting practice he has maintained an active academic career, teaching engineering at outstanding institutions and mentoring the next generation of Nigerian engineers. That blend of theory and field experience shapes how every IYAENE project is scoped and delivered.",
      "He is the developer of the Gauss-Seidel Interactive Technique (GSIT), an iterative analysis method applied in both pollution monitoring and traffic modelling — a home-grown tool that sits at the centre of the firm's analytical capability. His engineering capabilities are derived from years in construction, consulting etc.",
    ],
    expertise: ["Environmental compliance & monitoring", "Highway & transportation modelling", "Civil engineering consulting", "Academic & technical training"],
    memberships: ["Fellow, Nigerian Society of Engineers (FNSE)", "Fellow, Nigerian Institute of Nigerian Highway and Transportaion Engineers (FNIHTE)", "Member, MDA"],
  },
  {
    initials: "CA",
    credentials: "B.ENG, MNSE",
    name: "Engr. Clement Atamakhai",
    role: "Head, Engineering & Projects",
    bio: [
      "Engr. Clement Atamakhai holds a degree in Civil Engineering from the University of Benin, Nigeria, and brings extensive oil-industry experience to the firm — overseeing and constructing civil engineering support projects on live operational sites.",
      "He has consulted for state and federal government institutions, applying his engineering expertise to public-sector infrastructure needs where accountability and compliance are non-negotiable.",
      "At IYAENE, Clement leads project delivery from mobilisation to handover, with a focus on safe, on-schedule execution in the demanding terrain of the Niger Delta.",
    ],
    expertise: ["Civil engineering support works", "Oil & gas infrastructure projects", "Construction supervision & QA", "Government & public-sector consulting"],
    memberships: ["Member, Nigerian Society of Engineers (MNSE)", "B.Eng, University of Benin"],
  },
];

const gsitPoints = [
  { icon: Droplet, title: "Pollution monitoring", description: "Structured, iterative analysis of pollution data to surface environmental risk early." },
  { icon: CarIcon, title: "Traffic modelling", description: "Applying the same technique to movement and transport systems for road planning." },
  { icon: TrendingUp, title: "Decision support", description: "Data-driven analysis that supports better choices at the planning stage." },
];

export default function Team() {
  return (
    <>
      <Header />

      <section className="bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/team-hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
          <ScrollReveal>
            <p className="text-red-800 text-sm font-semibold mb-3">OUR TEAM / PARTNERS</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
              Engineers with the credentials to back it up
            </h1>
            <p className="text-gray-300 max-w-2xl">
              IYAENE is led by two nationally recognised professionals whose memberships,
              fellowships and field experience reflect real technical standing, not marketing
              claims.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-16">
        {members.map((m, i) => (
          <ScrollReveal key={m.name}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <img src={`/team-${m.initials.toLowerCase()}.jpg`} alt={m.name} className="rounded-lg w-full h-105 object-cover" />
              <div>
                <span className="inline-block bg-orange-100 text-red-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  {m.credentials}
                </span>
                <h2 className="text-2xl font-bold mb-1">{m.name}</h2>
                <p className="text-blue-950 font-medium mb-4">{m.role}</p>
                {m.bio.map((p, idx) => (
                  <p key={idx} className="text-sm text-gray-700 mb-3">{p}</p>
                ))}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-2">AREAS OF EXPERTISE</p>
                    <ul className="space-y-1.5">
                      {m.expertise.map((e) => (
                        <li key={e} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-red-800 mt-0.5">✓</span> {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-2">MEMBERSHIPS & QUALIFICATIONS</p>
                    <ul className="space-y-1.5">
                      {m.memberships.map((e) => (
                        <li key={e} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-blue-950 mt-0.5">🎓</span> {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <p className="text-red-800 text-sm font-semibold mb-2">IN-HOUSE INNOVATION</p>
            <h2 className="text-3xl font-bold mb-4">The Gauss-Seidel Interactive Technique (GSIT)</h2>
            <p className="text-gray-700 mb-6">
              Developed by Dr. Abraham Oba, GSIT is a modelling method that has become a
              practical tool across IYAENE's work — giving clients access to analysis that
              supports better decisions before capital is committed.
            </p>
            <div className="space-y-4">
              {gsitPoints.map((p) => (
                <div key={p.title} className="flex gap-3">
                  <div className="w-9 h-9 bg-blue-100 text-blue-950 rounded-md flex items-center justify-center shrink-0">
                    <p.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{p.title}</p>
                    <p className="text-sm text-gray-700">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <img src="/gsit.jpg" alt="GSIT analysis" className="rounded-lg w-full h-105 object-cover" />
          </ScrollReveal>
        </div>
      </section>

      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 max-w-lg">Work directly with our leadership team</h2>
            <p className="text-gray-400 max-w-lg">
              Every IYAENE engagement is overseen by senior professionals. Tell us about your
              project and we'll bring the right expertise to it.
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