import { NavLink, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { X } from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/quote-requests", label: "Quote Requests" },
  { to: "/admin/messages", label: "Messages" },
  { to: "/admin/project", label: "Projects" },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/admin/login");
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`w-64 h-screen bg-gray-950 text-white flex flex-col fixed left-0 top-0 z-50 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between gap-3 px-6 py-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-800 rounded-md flex items-center justify-center font-bold">
              IY
            </div>
            <div>
              <p className="font-bold leading-tight">IYAENE</p>
              <p className="text-xs text-gray-400">Engineering · Environment</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden p-1" aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-red-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mx-3 mb-3 px-4 py-2.5 rounded-md text-sm font-medium text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          Log out
        </button>

        <div className="px-6 py-4 border-t border-gray-800 text-xs text-gray-500">
          RC 937834 · #48 Old Aba Road, Port Harcourt
        </div>
      </aside>
    </>
  );
}