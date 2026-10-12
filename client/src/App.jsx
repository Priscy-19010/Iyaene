import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import Home from "./pages/public/Home";
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import QuoteRequests from "./pages/admin/QuoteRequests";
import Messages from "./pages/admin/Messages";
import Project from "./pages/admin/Projects";
import ProjectForm from "./pages/admin/ProjectForm";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Projects from "./pages/public/Projects";
import Team from "./pages/public/Team";
import Contact from "./pages/public/Contact";
import RequestQuote from "./pages/public/RequestQuote";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
<Route path="/request-a-quote" element={<RequestQuote />} />

// Admin routes
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quote-requests" element={<QuoteRequests />} />
          <Route path="messages" element={<Messages />} />
          <Route path="project" element={<Project />} />
          <Route path="project/new" element={<ProjectForm />} />
          <Route path="project/:id/edit" element={<ProjectForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}