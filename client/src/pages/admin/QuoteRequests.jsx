import { useEffect, useState } from "react";
import { quoteService } from "../../services/quoteService";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import { CometSpinner } from "@/components/ring";

const columns = [
  { key: "name", label: "Name" },
  { key: "company", label: "Company" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
];

export default function QuoteRequests() {
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const result = await quoteService.getAll({ status, search });
      setQuotes(result.quoteRequests || []);
    } catch (err) {
      console.error("Failed to load quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(loadQuotes, 300);
    return () => clearTimeout(timeout);
  }, [search, status]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await quoteService.updateStatus(id, newStatus);
      loadQuotes();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quote Requests</h1>
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CometSpinner className="w-6 h-6 text-blue-500" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          rows={quotes}
          renderActions={(row) => (
            <select
              value={row.status}
              onChange={(e) => handleStatusChange(row._id, e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-xs"
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>
          )}
        />
      )}
    </div>
  );
}