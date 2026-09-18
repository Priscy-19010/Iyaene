import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-700 rounded-md flex items-center justify-center text-white font-bold text-sm">
            IY
          </div>
          <div className="leading-tight">
            <p className="font-bold text-sm">IYAENE</p>
            <p className="text-xs text-gray-400">Engineering · Environment</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-orange-500" : "text-gray-700 hover:text-orange-500"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/request-a-quote"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            Request a Quote
          </Link>
        </div>

        <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2" aria-label="Open menu">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="bg-white w-64 h-full ml-auto flex flex-col p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setMenuOpen(false)} className="self-end mb-6" aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium border-b border-gray-100 ${isActive ? "text-orange-500" : "text-gray-700"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/request-a-quote"
              onClick={() => setMenuOpen(false)}
              className="mt-6 bg-orange-500 text-white text-center text-sm font-medium px-4 py-2.5 rounded-md"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}