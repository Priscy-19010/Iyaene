import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Mail } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ScrollReveal from "../../components/common/ScrollReveal";
import { CometSpinner } from "@/components/ring";
import { projectService } from "../../services/projectService";

const disciplines = ["All work", "Engineering", "Environment", "Transport", "Modeling"];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All work");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService
      .getPublished()
      .then((result) => setProjects(result.projects || []))
      .catch((err) => console.error("Failed to load projects:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All work" ? projects : projects.filter((p) => p.discipline === filter);

  return (
    <>
      <Header />

      <section className="bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/projects-hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
          <ScrollReveal>
            <p className="text-red-800 text-sm font-semibold mb-3">PROJECTS / PORTFOLIO</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
              Work that stands up in the field
            </h1>
            <p className="text-gray-300 max-w-2xl">
              A selection of the engineering, environmental, transport and modelling engagements
              IYAENE Nigeria Limited has supported across the Niger Delta and beyond.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-bold text-lg">Browse by discipline</h2>
              <p className="text-sm text-gray-500">Filter the portfolio to see how our four pillars come together on real engagements.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {disciplines.map((d) => (
                <button
                  key={d}
                  onClick={() => setFilter(d)}
                  className={`text-sm font-medium px-4 py-2 rounded-full ${
                    filter === d ? "bg-blue-950 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-24">
            <CometSpinner className="w-8 h-8 text-blue-500" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-24">No projects in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ScrollReveal key={p._id} delay={(i % 6) * 100}>
                <div className="border border-gray-100 rounded-lg overflow-hidden h-full">
                  <div className="relative">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-48 object-cover" />
                    <span className="absolute top-3 left-3 bg-gray-950/80 text-white text-xs px-3 py-1 rounded-md">
                      {p.discipline}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.year}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{p.summary}</p>
                    {p.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {p.tags.map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-2">Full project references available on request</h2>
            <p className="text-gray-500 max-w-lg">
              Some client work is confidential. Get in touch and we can share references
              relevant to your sector under NDA.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-red-800 hover:bg-red-950 text-white font-medium px-6 py-3 rounded-md w-fit"
            >
              <Mail className="w-4 h-4" /> Request references
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 max-w-lg">Your project could be next</h2>
            <p className="text-gray-400 max-w-lg">
              Send us the scope and timeline. Our engineers will review it and come back with a
              clear, costed approach.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link to="/request-a-quote" className="bg-red-800 hover:bg-red-950 text-white font-medium px-6 py-3 rounded-md text-center">
                Request a Quote
              </Link>
              <Link to="/contact" className="border border-gray-600 hover:border-gray-400 text-white font-medium px-6 py-3 rounded-md text-center">
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