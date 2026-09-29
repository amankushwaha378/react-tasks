import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function ReactQueryBasics() {
  const [userId, setUserId] = useState(1);
  const [pollingEnabled, setPollingEnabled] = useState(false);

  const userQuery = useQuery({
    queryKey: ["user", userId],

    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return response.json();
    },

    staleTime: 5_000,
    gcTime: 10_000,

    // Refetch when browser window gets focus
    refetchOnWindowFocus: true,

    // Poll every 5 seconds when enabled
    refetchInterval: pollingEnabled ? 5000 : false,
  });

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          React Query Playground
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Exploring queries, refetching and polling
        </p>
      </div>

      {/* Query Keys */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Query Keys
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Changing the user ID creates a different query.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((id) => (
            <button
              key={id}
              onClick={() => setUserId(id)}
              className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                userId === id
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              User {id}
            </button>
          ))}

          {/* Manual Refetch */}
          <button
            onClick={() => userQuery.refetch()}
            disabled={userQuery.isFetching}
            className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {userQuery.isFetching ? "Fetching..." : "Refetch Now"}
          </button>
        </div>
      </section>

      {/* Refetching & Polling */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Refetching & Polling
        </h2>

        <div className="mt-4 space-y-4">
          {/* Manual Refetch */}
          <div className="flex items-center justify-between rounded-md bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-800">
                Manual Refetch
              </p>

              <p className="text-sm text-gray-500">
                Fetch the latest data immediately.
              </p>
            </div>

            <button
              onClick={() => userQuery.refetch()}
              className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Refetch
            </button>
          </div>

          {/* Polling */}
          <div className="flex items-center justify-between rounded-md bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-800">
                Polling
              </p>

              <p className="text-sm text-gray-500">
                Automatically refetch every 5 seconds.
              </p>
            </div>

            <button
              onClick={() => setPollingEnabled((prev) => !prev)}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                pollingEnabled
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {pollingEnabled ? "Stop Polling" : "Start Polling"}
            </button>
          </div>

          {/* Window Focus */}
          <div className="flex items-center justify-between rounded-md bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-800">
                Window Focus Refetch
              </p>

              <p className="text-sm text-gray-500">
                Refetch when you return to this browser tab.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Enabled
            </span>
          </div>
        </div>
      </section>

      {/* Query Status */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Query Status
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">User ID</p>
            <p className="mt-1 font-semibold text-gray-900">
              {userId}
            </p>
          </div>

          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Pending</p>
            <p className="mt-1 font-semibold text-gray-900">
              {userQuery.isPending ? "Yes" : "No"}
            </p>
          </div>

          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Fetching</p>
            <p className="mt-1 font-semibold text-gray-900">
              {userQuery.isFetching ? "Yes" : "No"}
            </p>
          </div>

          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Polling</p>
            <p className="mt-1 font-semibold text-gray-900">
              {pollingEnabled ? "Active" : "Inactive"}
            </p>
          </div>
        </div>

        {userQuery.isFetching && (
          <div className="mt-4 rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-700">
            🔄 Fetching latest data...
          </div>
        )}
      </section>

      {/* Error */}
      {userQuery.isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="font-medium text-red-700">
            Something went wrong
          </p>

          <p className="mt-1 text-sm text-red-600">
            {userQuery.error.message}
          </p>
        </div>
      )}

      {/* User Data */}
      {userQuery.isSuccess && (
        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                User Details
              </p>

              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                {userQuery.data.name}
              </h2>
            </div>

            {userQuery.isFetching && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                Updating...
              </span>
            )}
          </div>

          <div className="mt-5 space-y-3">
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Email
              </p>

              <p className="text-sm text-gray-700">
                {userQuery.data.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Phone
              </p>

              <p className="text-sm text-gray-700">
                {userQuery.data.phone}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Website
              </p>

              <p className="text-sm text-gray-700">
                {userQuery.data.website}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Configuration */}
      <section className="rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-sm font-semibold text-gray-700">
          Query Configuration
        </h2>

        <div className="mt-3 space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">staleTime:</span> 5 seconds
          </p>

          <p>
            <span className="font-medium">gcTime:</span> 10 seconds
          </p>

          <p>
            <span className="font-medium">
              refetchOnWindowFocus:
            </span>{" "}
            true
          </p>

          <p>
            <span className="font-medium">refetchInterval:</span>{" "}
            {pollingEnabled ? "5 seconds" : "disabled"}
          </p>

          <p>
            <span className="font-medium">queryKey:</span>{" "}
            ["user", {userId}]
          </p>
        </div>
      </section>
    </div>
  );
}

export default ReactQueryBasics;