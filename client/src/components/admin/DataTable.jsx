export default function DataTable({ columns, rows, renderActions }) {
  if (!rows.length) {
    return <p className="text-sm text-gray-500 py-8 text-center">No records found.</p>;
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-3">
        {rows.map((row) => (
          <div key={row._id} className="border border-gray-200 rounded-lg p-4 space-y-2 bg-white">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between gap-3 text-sm">
                <span className="text-gray-500 shrink-0">{col.label}</span>
                <span className="text-right break-words">
                  {col.render ? col.render(row) : row[col.key]}
                </span>
              </div>
            ))}
            {renderActions && (
              <div className="pt-2 border-t border-gray-100 flex justify-end">
                {renderActions(row)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-medium whitespace-nowrap">
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
    </>
  );
}