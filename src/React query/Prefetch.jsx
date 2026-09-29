import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchUsers = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

const fetchUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  // Artificial delay so the prefetch effect is visible
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return response.json();
};

function Prefetch() {
  const queryClient = useQueryClient();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [prefetchingUserId, setPrefetchingUserId] = useState(null);

  const usersQuery = useQuery({
    queryKey: ["prefetch-users"],
    queryFn: fetchUsers,
  });

  const selectedUserQuery = useQuery({
    queryKey: ["prefetch-user", selectedUserId],
    queryFn: () => fetchUser(selectedUserId),
    enabled: !!selectedUserId,
  });

  const handlePrefetch = async (userId) => {
    setPrefetchingUserId(userId);

    await queryClient.prefetchQuery({
      queryKey: ["prefetch-user", userId],
      queryFn: () => fetchUser(userId),
    });

    setPrefetchingUserId(null);
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  if (usersQuery.isPending) {
    return <p>Loading users...</p>;
  }

  if (usersQuery.isError) {
    return <p>{usersQuery.error.message}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          React Query Prefetching
        </h1>

        <p className="mt-2 text-gray-600">
          Hover over a user to prefetch their details before opening
          them.
        </p>
      </div>

   
    

      {/* Users */}
      <div className="grid gap-4 md:grid-cols-2">
        {usersQuery.data.map((user) => {
          const isPrefetching =
            prefetchingUserId === user.id;

          const cachedUser = queryClient.getQueryData([
            "prefetch-user",
            user.id,
          ]);

          return (
            <div
              key={user.id}
              onMouseEnter={() => handlePrefetch(user.id)}
              onClick={() => handleSelectUser(user.id)}
              className="cursor-pointer rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    @{user.username}
                  </p>
                </div>

                {cachedUser ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Cached
                  </span>
                ) : isPrefetching ? (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                    Prefetching...
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                    Not Cached
                  </span>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </div>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleSelectUser(user.id);
                }}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected User */}
      {selectedUserId && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            User Details
          </h2>

          {selectedUserQuery.isPending && (
            <p className="mt-4 text-gray-500">
              Loading details...
            </p>
          )}

          {selectedUserQuery.isError && (
            <p className="mt-4 text-red-500">
              {selectedUserQuery.error.message}
            </p>
          )}

          {selectedUserQuery.data && (
            <div className="mt-4 space-y-2">
              <p>
                <strong>Name:</strong>{" "}
                {selectedUserQuery.data.name}
              </p>

              <p>
                <strong>Username:</strong>{" "}
                {selectedUserQuery.data.username}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedUserQuery.data.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedUserQuery.data.phone}
              </p>

              <p>
                <strong>Website:</strong>{" "}
                {selectedUserQuery.data.website}
              </p>
            </div>
          )}

          <div className="mt-5 border-t pt-4 text-sm text-gray-500">
            <p>
              Status: {selectedUserQuery.status}
            </p>

            <p>
              Fetch Status: {selectedUserQuery.fetchStatus}
            </p>
          </div>
        </div>
      )}

     
    </div>
  );
}

export default Prefetch;