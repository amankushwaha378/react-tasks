import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  // Artificial delay so Suspense is easy to observe
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return response.json();
};

function Users() {
  const { data: users } = useSuspenseQuery({
    queryKey: ["suspense-users"],
    queryFn: fetchUsers,
  });

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="rounded-md border border-gray-200 bg-gray-50 p-4"
        >
          <h3 className="font-medium text-gray-900">
            {user.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {user.email}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {user.phone}
          </p>
        </div>
      ))}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

        <p className="text-sm font-medium text-blue-700">
          Loading users...
        </p>
      </div>
    </div>
  );
}

function SuspenseExample() {
  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          React Query + Suspense
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Let React Suspense handle the loading state while
          React Query fetches data.
        </p>
      </div>

      

      {/* Users */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Users
        </h2>

        <Suspense fallback={<LoadingFallback />}>
          <Users />
        </Suspense>
      </section>
    </div>
  );
}

export default SuspenseExample;