import { useState } from "react";
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

const POSTS_PER_PAGE = 5;

const fetchPosts = async (page) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

function Pagination() {
  const [page, setPage] = useState(1);

  const postsQuery = useQuery({
    queryKey: ["posts", page],

    queryFn: () => fetchPosts(page),

    // Keep the previous page visible while fetching the next page
    placeholderData: keepPreviousData,
  });

  const hasNextPage = postsQuery.data?.length === POSTS_PER_PAGE;
  const isPreviousData = postsQuery.isPlaceholderData;

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Pagination
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Fetching data page by page with React Query.
        </p>
      </div>

      {/* Query Information */}
      

      {/* Posts */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Posts
          </h2>

          {postsQuery.isFetching && (
            <span className="text-xs text-blue-600">
              Fetching page {page}...
            </span>
          )}
        </div>

        {postsQuery.isPending && (
          <div className="mt-4 rounded-md bg-gray-50 p-4 text-sm text-gray-500">
            Loading posts...
          </div>
        )}

        {postsQuery.isError && (
          <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-600">
            {postsQuery.error.message}
          </div>
        )}

        {postsQuery.data && (
          <div className="mt-4 space-y-3">
            {postsQuery.data.map((post) => (
              <article
                key={post.id}
                className={`rounded-md border p-4 transition-opacity ${
                  isPreviousData
                    ? "border-gray-200 opacity-60"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium text-gray-900">
                    {post.title}
                  </h3>

                  <span className="shrink-0 text-xs text-gray-400">
                    #{post.id}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {post.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Pagination Controls */}
      <section className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1 || postsQuery.isFetching}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous
        </button>

        <span className="text-sm font-medium text-gray-700">
          Page {page}
        </span>

        <button
          onClick={() => {
            if (!isPreviousData && hasNextPage) {
              setPage((old) => old + 1);
            }
          }}
          disabled={
            isPreviousData ||
            !hasNextPage ||
            postsQuery.isFetching
          }
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next →
        </button>
      </section>

      {/* Explanation */}
      <section className="rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-sm font-semibold text-gray-700">
          Current Query
        </h2>

        <pre className="mt-3 overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
{`queryKey: ["posts", ${page}]`}
        </pre>

        <p className="mt-3 text-sm text-gray-600">
          Changing the page changes the query key, so React Query
          treats each page as a separate cached query.
        </p>
      </section>
    </div>
  );
}

export default Pagination;