const statusStyles = {
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  responded: "bg-green-100 text-green-700",
  closed: "bg-gray-200 text-gray-600",
};

const statusLabels = {
  new: "New",
  in_progress: "In Progress",
  responded: "Responded",
  closed: "Closed",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}