import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import QuoteRequests from "./pages/admin/QuoteRequests";
import Messages from "./pages/admin/Messages";
import Projects from "./pages/admin/Projects";
import ProjectForm from "./pages/admin/ProjectForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quote-requests" element={<QuoteRequests />} />
          <Route path="messages" element={<Messages />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}