export default function DataTable({ columns, rows, renderActions }) {
  if (!rows.length) {
    return <p className="text-sm text-gray-500 py-8 text-center">No records found.</p>;
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 text-left">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">
                {col.label}
              </th>
            ))}
            {renderActions && <th className="px-4 py-3 font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-t border-gray-100 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-top">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {renderActions && <td className="px-4 py-3">{renderActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}