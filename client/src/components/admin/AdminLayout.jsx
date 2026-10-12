import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { tokenStore } from "../../services/api";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Not logged in: go to the login page instead of showing an empty dashboard
  if (!tokenStore.get()) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-h-screen md:ml-64">
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-gray-950 text-white px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-800 rounded-md flex items-center justify-center font-bold text-sm">
              IY
            </div>
            <p className="font-bold text-sm">IYAENE</p>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="bg-gray-50 min-h-screen p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}