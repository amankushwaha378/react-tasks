import { useState } from "react";
import useAxios from "../hooks/useAxios";

function Task77() {
  // Form state
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/users"
  );

  const [method, setMethod] = useState("GET");

  const [requestBody, setRequestBody] = useState("");

  // Actual request sent to the hook
  const [request, setRequest] = useState({
    url: "",
    options: {},
  });

  // Frontend validation error
  const [requestError, setRequestError] = useState("");

  // Axios
  const { data, loading, error } = useAxios(
    request.url,
    request.options
  );

  const apiExamples = [
    {
      label: "Get Users",
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
    },
    {
      label: "Get User",
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users/1",
    },
    {
      label: "Create Post",
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      body: {
        title: "Hello Axios",
        body: "Testing POST request",
        userId: 1,
      },
    },
    {
      label: "Update Post",
      method: "PUT",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      body: {
        id: 1,
        title: "Updated Title",
        body: "Updated content",
        userId: 1,
      },
    },
    {
      label: "Patch Post",
      method: "PATCH",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      body: {
        title: "Patched Title",
      },
    },
    {
      label: "Delete Post",
      method: "DELETE",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    },
  ];

  // Load a predefined example into the form
  const loadExample = (example) => {
    setMethod(example.method);
    setUrl(example.url);

    setRequestBody(
      example.body
        ? JSON.stringify(example.body, null, 2)
        : ""
    );

    setRequestError("");
  };

  // Send request
  const handleSubmit = (e) => {
    e.preventDefault();

    setRequestError("");

    // Validate URL
    if (!url.trim()) {
      setRequestError("URL is required.");
      return;
    }

    let parsedBody;

    // Validate body
    if (method !== "GET" && method !== "DELETE") {
      if (!requestBody.trim()) {
        setRequestError("Request body is required.");
        return;
      }

      try {
        parsedBody = JSON.parse(requestBody);
      } catch {
        setRequestError(
          "Invalid JSON. Please check your request body."
        );
        return;
      }
    }

    // Create options for Axios
    const options = {
      method,
      ...(parsedBody !== undefined && {
        data: parsedBody,
      }),
    };

    // This triggers useAxios

    setRequestError("");


    setRequest({
      url,
      options,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Axios Playground
          </h1>

          <p className="mt-2 text-gray-600">
            Test different HTTP methods using the custom useAxios hook.
          </p>
        </div>

        {/* Quick Examples */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-3 font-semibold text-gray-800">
            Quick Examples
          </h2>

          <div className="flex flex-wrap gap-2">
            {apiExamples.map((example) => (
              <button
                key={example.label}
                type="button"
                onClick={() => loadExample(example)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <div className="rounded-xl bg-white p-6 shadow">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Method + URL */}
            <div className="flex flex-col gap-3 sm:flex-row">

              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>

              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter API URL"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            {/* Request Body */}
            {method !== "GET" && method !== "DELETE" && (
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                placeholder={`{
  "title": "Hello Axios",
  "body": "Testing Axios",
  "userId": 1
}`}
                rows={8}
                className="w-full rounded-lg border border-gray-300 p-4 font-mono text-sm outline-none focus:border-blue-500"
              />
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>

          </form>
        </div>

        {/* Request Status */}
        <div className="mt-6 rounded-xl bg-white p-5 shadow">

          <div className="flex items-center justify-between">

            <h2 className="font-semibold text-gray-800">
              Request Status
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                loading
                  ? "bg-yellow-100 text-yellow-700"
                  : error
                  ? "bg-red-100 text-red-700"
                  : data
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {loading
                ? "LOADING"
                : error
                ? "ERROR"
                : data
                ? "SUCCESS"
                : "IDLE"}
            </span>

          </div>

        </div>

        {/* Validation Error */}
        {requestError && (
          <div className="mt-6 rounded-xl bg-yellow-50 p-5 text-yellow-800">

            <h2 className="mb-1 font-semibold">
              Invalid Request
            </h2>

            <p>{requestError}</p>

          </div>
        )}

        {/* Axios Error */}
        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-5 text-red-700">

            <h2 className="mb-2 font-semibold">
              Request Failed
            </h2>

            <p>{error.message}</p>

          </div>
        )}

        {/* Response */}
        {data && (
          <div className="mt-6 rounded-xl bg-gray-900 p-5 text-white">

            <h2 className="mb-3 text-lg font-semibold">
              Response
            </h2>

            <pre className="max-h-[500px] overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>

          </div>
        )}

      </div>
    </div>
  );
}

export default Task77;