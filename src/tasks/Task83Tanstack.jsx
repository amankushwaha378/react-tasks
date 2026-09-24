import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

function Task83Tanstack() {
  const parentRef = useRef(null);

  const rows = Array.from({ length: 500 }, (_, rowIndex) => ({
    id: rowIndex + 1,
    name: `User ${rowIndex + 1}`,
    email: `user${rowIndex + 1}@gmail.com`,
  }));

  const columns = Array.from({ length: 100 }, (_, columnIndex) => ({
    id: columnIndex + 1,
    name: `Column ${columnIndex + 1}`,
  }));

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 3,
    horizontal: true,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Grid Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* Grid Header */}
        <div className="border-b border-gray-200 px-5 py-4">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold text-gray-900">
                Virtualized Data Grid
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Scroll vertically and horizontally to explore the dataset.
              </p>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-xs text-gray-400">
                Currently rendered
              </p>

              <p className="font-semibold text-gray-700">
                {virtualRows.length} × {virtualColumns.length}
              </p>
            </div>

          </div>

        </div>

        {/* Grid */}
        <div
          ref={parentRef}
          className="h-[65vh] w-full overflow-auto bg-gray-50"
        >
          <div
            className="relative"
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: `${columnVirtualizer.getTotalSize()}px`,
            }}
          >

            {virtualRows.map((virtualRow) =>
              virtualColumns.map((virtualColumn) => {
                const row = rows[virtualRow.index];
                const column = columns[virtualColumn.index];

                const isFirstColumn =
                  virtualColumn.index === 0;

                return (
                  <div
                    key={`${virtualRow.key}-${virtualColumn.key}`}
                    className={`
                      absolute flex items-center
                      border-b border-r border-gray-200
                      px-4
                      ${
                        isFirstColumn
                          ? "bg-white"
                          : "bg-white"
                      }
                    `}
                    style={{
                      width: `${virtualColumn.size}px`,
                      height: `${virtualRow.size}px`,
                      transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                    }}
                  >

                    {isFirstColumn ? (
                      <div className="min-w-0">
                        <div className="truncate font-medium text-gray-900">
                          {row.name}
                        </div>

                        <div className="truncate text-xs text-gray-500">
                          {row.email}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full">

                        <div className="text-sm font-medium text-gray-700">
                          {column.name}
                        </div>

                        <div className="text-xs text-gray-400">
                          Row {row.id}
                        </div>

                      </div>
                    )}

                  </div>
                );
              })
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-gray-200 bg-white px-5 py-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">

          <span>
            Dataset: {rows.length} rows × {columns.length} columns
          </span>

          <span>
            Rendered: {virtualRows.length * virtualColumns.length} cells
          </span>

        </div>

      </div>

    </div>
  );
}

export default Task83Tanstack;