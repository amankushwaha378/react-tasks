import { useState } from "react";

function DataTable({
  columns = [],
  data = [],

  searchable = true,
  searchPlaceHolder = "Search...",

  sortable = true,

  pagination = true,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],

  selectable = false,
  selectedRows = [],
  onSelectionChange = () => {},

  loading = false,
  emptyMessage = "No data found",
  className = "",
}) {
  // =========================
  // STATE
  // =========================

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const [sortKey, setSortKey] = useState(null);

  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (key) => {
    if (!sortable) return;

    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  const filteredData = data.filter((row) => {
    if (!searchable || !search) {
      return true;
    }

    return columns.some((col) => {
      const value = row[col.key];

      return String(value).toLowerCase().includes(search.toLowerCase());
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortable || !sortKey) {
      return 0;
    }

    if (a[sortKey] < b[sortKey]) {
      return sortDirection === "asc" ? -1 : 1;
    }

    if (a[sortKey] > b[sortKey]) {
      return sortDirection === "asc" ? 1 : -1;
    }

    return 0;
  });

  const totalPages = pagination
    ? Math.ceil(sortedData.length / rowsPerPage)
    : 1;

  const startIndex = pagination ? (currentPage - 1) * rowsPerPage : 0;

  const paginatedData = pagination
    ? sortedData.slice(startIndex, startIndex + rowsPerPage)
    : sortedData;

  const emptyRows = pagination
    ? Math.max(rowsPerPage - paginatedData.length, 0)
    : 0;

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      onSelectionChange(selectedRows.filter((rowId) => rowId !== id));
    } else {
      onSelectionChange([...selectedRows, id]);
    }
  };

  const allSelected =
    selectable &&
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedRows.includes(row.id));

  const handleSelectAll = () => {
    if (allSelected) {
      // Remove current page rows
      onSelectionChange(
        selectedRows.filter((id) => !paginatedData.some((row) => row.id === id))
      );
    } else {
      // Add current page rows
      onSelectionChange([
        ...new Set([...selectedRows, ...paginatedData.map((row) => row.id)]),
      ]);
    }
  };

  if (loading) {
    return (
      <div className={`rounded-lg border p-10 text-center ${className}`}>
        Loading...
      </div>
    );
  }

  return (
    <div className={className}>
      {/* SEARCH */}

      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceHolder}
            className="w-full rounded-lg border px-4 py-2 sm:w-80"
          />
        </div>
      )}

      {pagination && (
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="pageSize">Rows per page:</label>

          <select
            id="pageSize"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-lg border px-3 py-2"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {selectable && (
                <th className="border-b px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}

              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`
                    border-b
                    px-4 py-3
                    text-left
                    text-sm
                    font-semibold
                    ${sortable ? "cursor-pointer" : ""}
                  `}
                >
                  {col.label}

                  {sortable && sortKey === col.key && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              <>
                {paginatedData.map((row) => (
                  <tr
                    key={row.id}
                    className={`
            border-b
            hover:bg-gray-50
            ${selectedRows.includes(row.id) ? "bg-blue-50" : ""}
          `}
                  >
                    {selectable && (
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleRowSelect(row.id)}
                        />
                      </td>
                    )}

                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-sm">
                        {col.render
                          ? col.render(row[col.key], row)
                          : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Empty rows */}
                {Array.from({ length: emptyRows }).map((_, index) => (
                  <tr key={`empty-${index}`} className="h-12">
                    {selectable && <td></td>}

                    {columns.map((col) => (
                      <td key={col.key}></td>
                    ))}
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`
                      rounded-lg
                      px-3
                      py-2
                      ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border"
                      }
                    `}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;
