import { Link } from "react-router-dom";
import { MapPin, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 bg-red-800 rounded-md flex items-center justify-center font-bold text-sm">
              IY
            </div>
            <p className="font-bold">IYAENE</p>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            Engineering, Construction and Environment. A registered Nigerian engineering and
            environmental services company delivering projects from Port Harcourt.
          </p>
          <p className="text-xs text-gray-500">RC 937834</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 mb-3">NAVIGATE</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/request-a-quote">Request a Quote</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 mb-3">SERVICES</p>
          <ul className="space-y-2 text-sm text-red-700">
            <li>Engineering</li>
            <li>Environment</li>
            <li>Transport</li>
            <li>Modeling</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 mb-3">CONTACT</p>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-red-700 shrink-0" />
              #48 Old Aba Road, Port Harcourt, Rivers State, Nigeria
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-700 shrink-0" />
              iyaenenigerialtd@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-700 shrink-0 " />
              <div>
                <p>Mon – Fri · 9:00am – 4:30pm</p>
                <p>Sat · 9:00am - 1:00pm</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
        <p>© 2026 IYAENE Nigeria Limited. All rights reserved.</p>
        <p>Engineering · Environment · Transport · Modeling</p>
      </div>
    </footer>
  );
}