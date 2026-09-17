import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { quoteService } from "../../services/quoteService";
import { messageService } from "../../services/messageService";
import { projectService } from "../../services/projectService";
import StatusBadge from "../../components/admin/StatusBadge";

export default function Dashboard() {
  const [stats, setStats] = useState({
    newQuotes: 0,
    newMessages: 0,
    publishedProjects: 0,
    quotesThisMonth: 0,
  });
  const [latestQuotes, setLatestQuotes] = useState([]);
  const [latestMessages, setLatestMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [quotesResult, messagesResult, projectsResult] = await Promise.all([
          quoteService.getAll(),
          messageService.getAll(),
          projectService.getAll(),
        ]);

        const allQuotes = quotesResult.quoteRequests || [];
        const allMessages = messagesResult.messages || [];
        const allProjects = projectsResult.projects || [];

        const now = new Date();
        const quotesThisMonth = allQuotes.filter((q) => {
          const created = new Date(q.createdAt);
          return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
        }).length;

        setStats({
          newQuotes: allQuotes.filter((q) => q.status === "new").length,
          newMessages: allMessages.filter((m) => m.status === "new").length,
          publishedProjects: allProjects.filter((p) => p.published).length,
          quotesThisMonth,
        });

        setLatestQuotes(allQuotes.slice(0, 5));
        setLatestMessages(allMessages.slice(0, 5));
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-6">A live snapshot of every enquiry coming through the website.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-orange-500 text-white rounded-lg p-5">
          <p className="text-sm opacity-90">Quote Requests</p>
          <p className="text-3xl font-bold mt-2">{stats.newQuotes}</p>
          <p className="text-xs opacity-80 mt-1">{stats.newQuotes} awaiting first review</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500">Contact Messages</p>
          <p className="text-3xl font-bold mt-2">{stats.newMessages}</p>
          <p className="text-xs text-gray-400 mt-1">{stats.newMessages} unread</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500">Portfolio Projects</p>
          <p className="text-3xl font-bold mt-2">{stats.publishedProjects}</p>
          <p className="text-xs text-gray-400 mt-1">{stats.publishedProjects} published</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-3xl font-bold mt-2">{stats.quotesThisMonth}</p>
          <p className="text-xs text-gray-400 mt-1">New quote requests this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Latest quote requests</h2>
            <Link to="/admin/quote-requests" className="text-sm text-blue-700">View all</Link>
          </div>
          {latestQuotes.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No quote requests yet. Enquiries submitted through the website quote form will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {latestQuotes.map((q) => (
                <li key={q._id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{q.name}</p>
                    <p className="text-xs text-gray-400">{q.company || q.email}</p>
                  </div>
                  <StatusBadge status={q.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Latest messages</h2>
            <Link to="/admin/messages" className="text-sm text-blue-700">View all</Link>
          </div>
          {latestMessages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No messages yet. Contact form submissions will show up here.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {latestMessages.map((m) => (
                <li key={m._id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.email}</p>
                  </div>
                  <StatusBadge status={m.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h2 className="font-semibold mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/admin/projects/new" className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <p className="text-sm font-medium">Add a project</p>
            <p className="text-xs text-gray-400 mt-1">Publish new work to the live portfolio.</p>
          </Link>
          <Link to="/admin/quote-requests" className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <p className="text-sm font-medium">Review quotes</p>
            <p className="text-xs text-gray-400 mt-1">Work through new enquiries and update status.</p>
          </Link>
          <Link to="/admin/messages" className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <p className="text-sm font-medium">Read messages</p>
            <p className="text-xs text-gray-400 mt-1">Respond to contact form submissions.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}