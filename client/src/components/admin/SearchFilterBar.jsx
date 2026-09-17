export default function SearchFilterBar({ search, onSearchChange, status, onStatusChange }) {
  return (
    <div className="flex gap-3 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value="">All statuses</option>
        <option value="new">New</option>
        <option value="in_progress">In Progress</option>
        <option value="responded">Responded</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  );
}