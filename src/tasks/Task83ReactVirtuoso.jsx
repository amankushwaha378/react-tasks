import { VirtuosoGrid } from "react-virtuoso";

function Task83Virtuoso() {
  const users = Array.from({ length: 5000 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@gmail.com`,
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">


      {/* Grid */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-semibold text-gray-900">
            Virtualized User Grid
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Scroll vertically to render more users.
          </p>
        </div>

        <div className="h-[65vh] bg-gray-50">

          <VirtuosoGrid
            totalCount={users.length}

            listClassName="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

            itemClassName="min-w-0"

            itemContent={(index) => {
              const user = users[index];

              return (
                <div className="h-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

                  <div className="mb-4 flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                      {user.id}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-gray-400">
                        ID: {user.id}
                      </p>
                    </div>

                  </div>

                  <p className="truncate text-sm text-gray-500">
                    {user.email}
                  </p>

                </div>
              );
            }}
          />

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-5 py-3 text-sm text-gray-500">
          <span>
            Dataset: {users.length.toLocaleString()} users
          </span>

          <span>
            VirtuosoGrid
          </span>
        </div>

      </div>

    </div>
  );
}

export default Task83Virtuoso;