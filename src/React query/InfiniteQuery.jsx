import { useInfiniteQuery } from "@tanstack/react-query";

const POSTS_PER_PAGE = 5;

const fetchPosts = async ({ pageParam }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${POSTS_PER_PAGE}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

function InfiniteQuery() {
  const postsQuery = useInfiniteQuery({
    queryKey: ["infinite-posts"],

    queryFn: fetchPosts,

    // First request starts at page 1
    initialPageParam: 1,

    // Decide what the next page should be
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length < POSTS_PER_PAGE) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    maxPages: 3,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = postsQuery;

  const posts = data?.pages.flat() ?? [];

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Infinite Query</h1>

        <p className="mt-1 text-sm text-gray-500">
          Load additional pages using TanStack Query's useInfiniteQuery.
        </p>
      </div>

      {/* Query Information */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Query Information
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Pages Loaded</p>

            <p className="mt-1 font-semibold text-gray-900">
              {data?.pages.length ?? 0}
            </p>
          </div>

          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Posts Loaded</p>

            <p className="mt-1 font-semibold text-gray-900">{posts.length}</p>
          </div>

          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Fetching</p>

            <p className="mt-1 font-semibold text-gray-900">
              {postsQuery.isFetching ? "Yes" : "No"}
            </p>
          </div>

          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">More Pages</p>

            <p className="mt-1 font-semibold text-gray-900">
              {hasNextPage ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Posts</h2>

          {postsQuery.isFetching && (
            <span className="text-xs text-blue-600">Fetching...</span>
          )}
        </div>

        {postsQuery.isPending && (
          <p className="mt-4 text-sm text-gray-500">Loading posts...</p>
        )}

        {postsQuery.isError && (
          <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-600">
            {postsQuery.error.message}
          </div>
        )}

        <div className="mt-4 space-y-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-md border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium capitalize text-gray-900">
                  {post.title}
                </h3>

                <span className="shrink-0 text-xs text-gray-400">
                  #{post.id}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">{post.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Load More */}
      <div className="flex justify-center">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
              ? "Load More"
              : "No More Posts"}
        </button>
      </div>

      {/* Infinite Query Explanation */}
      <section className="rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-sm font-semibold text-gray-700">
          Infinite Query State
        </h2>

        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <p>
            <strong>Pages:</strong> {data?.pages.length ?? 0}
          </p>

          <p>
            <strong>Page Params:</strong>{" "}
            {JSON.stringify(data?.pageParams ?? [])}
          </p>

          <p>
            <strong>Has Next Page:</strong> {hasNextPage ? "true" : "false"}
          </p>
        </div>
      </section>
    </div>
  );
}

export default InfiniteQuery;
