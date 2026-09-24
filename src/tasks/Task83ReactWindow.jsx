import { useMemo } from "react";
import { Grid } from "react-window";

function Task83ReactWindow() {
  const rows = useMemo(
    () =>
      Array.from({ length: 500 }, (_, rowIndex) => ({
        id: rowIndex + 1,
        name: `User ${rowIndex + 1}`,
        email: `user${rowIndex + 1}@gmail.com`,
      })),
    []
  );

  const columns = useMemo(
    () =>
      Array.from({ length: 100 }, (_, columnIndex) => ({
        id: columnIndex + 1,
        name: `Column ${columnIndex + 1}`,
      })),
    []
  );

  const cellComponent = ({
    rowIndex,
    columnIndex,
    style,
    rows,
    columns,
  }) => {
    const row = rows[rowIndex];
    const column = columns[columnIndex];

    const isFirstColumn = columnIndex === 0;

    return (
      <div
        style={style}
        className="border-b border-r border-gray-200 bg-white px-4 py-3"
      >
        {isFirstColumn ? (
          <>
            <p className="truncate font-medium text-gray-900">
              {row.name}
            </p>

            <p className="truncate text-xs text-gray-500">
              {row.email}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700">
              {column.name}
            </p>

            <p className="text-xs text-gray-400">
              Row {row.id}
            </p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Grid */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-semibold text-gray-900">
            Virtualized Data Grid
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Scroll vertically and horizontally to explore the dataset.
          </p>
        </div>

        <div className="h-[75vh] w-full">
          <Grid
            rowCount={rows.length}
            columnCount={columns.length}
            rowHeight={60}
            columnWidth={180}
            style={{
              width: "100%",
              height: "100%",
            }}
            cellProps={{
              rows,
              columns,
            }}
            cellComponent={cellComponent}
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-gray-200 bg-white px-5 py-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Dataset: {rows.length} rows × {columns.length} columns
          </span>

          <span>
            Total cells:{" "}
            {(rows.length * columns.length).toLocaleString()}
          </span>
        </div>

      </div>
    </div>
  );
}

export default Task83ReactWindow;