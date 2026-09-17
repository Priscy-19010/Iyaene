import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectService } from "../../services/projectService";

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    discipline: "",
    year: "",
    location: "",
    displayOrder: "",
    summary: "",
    tags: "",
    imageUrl: "",
    published: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      projectService.getOne(id).then((result) => {
        const data = result.project;
        setForm({
          ...data,
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "",
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      let imageUrl = form.imageUrl;

      if (imageFile) {
        const uploadResult = await projectService.uploadImage(imageFile);
        imageUrl = uploadResult.imageUrl;
      }

      const payload = {
        ...form,
        imageUrl,
        year: Number(form.year),
        displayOrder: Number(form.displayOrder),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };

      if (isEdit) {
        await projectService.update(id, payload);
      } else {
        await projectService.create(payload);
      }

      navigate("/admin/projects");
    } catch (err) {
      setError(err.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit Project" : "New Project"}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Discipline</label>
            <input
              name="discipline"
              value={form.discipline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              name="year"
              type="number"
              value={form.year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Display Order</label>
            <input
              name="displayOrder"
              type="number"
              value={form.displayOrder}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Project Image</label>
          {form.imageUrl && !imageFile && (
            <img src={form.imageUrl} alt="" className="w-32 h-32 object-cover rounded-md mb-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={handleChange}
            id="published"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-md disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Project"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="border border-gray-300 px-5 py-2.5 rounded-md text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}