import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectService } from "../../services/projectService";
import DataTable from "../../components/admin/DataTable";
import { CometSpinner } from "@/components/ring";

const columns = [
  { key: "title", label: "Title" },
  { key: "discipline", label: "Discipline" },
  { key: "year", label: "Year" },
  { key: "location", label: "Location" },
  {
    key: "published",
    label: "Published",
    render: (row) => (
      <span className={row.published ? "text-green-600" : "text-gray-400"}>
        {row.published ? "Yes" : "No"}
      </span>
    ),
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const result = await projectService.getAll();
      setProjects(result.projects || []);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await projectService.remove(id);
      loadProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          to="/admin/project/new"
          className="bg-red-800 hover:bg-red-950 text-white text-sm font-medium px-4 py-2 rounded-md"
        >
          + New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CometSpinner className="w-6 h-6 text-blue-500" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          rows={projects}
          renderActions={(row) => (
            <div className="flex gap-3">
              <Link to={`/admin/project/${row._id}/edit`} className="text-blue-950 text-xs font-medium">
                Edit
              </Link>
              <button onClick={() => handleDelete(row._id)} className="text-red-600 text-xs font-medium">
                Delete
              </button>
            </div>
          )}
        />
      )}
    </div>
  );
}