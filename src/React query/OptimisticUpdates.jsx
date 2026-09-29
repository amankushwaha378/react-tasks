import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

function OptimisticUpdates() {
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  // Fetch posts
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Create post
  const createPostMutation = useMutation({
    mutationFn: async (newPost) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      // Artificial delay so we can clearly see optimistic update
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return response.json();
    },

    // Runs BEFORE mutationFn
    onMutate: async (newPost) => {
      // Stop an ongoing posts request from overwriting
      // our optimistic update
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      // Save the current data
      const previousPosts = queryClient.getQueryData(["posts"]);

      // Optimistically update the cache
      queryClient.setQueryData(["posts"], (oldPosts = []) => [
        {
          id: `temp-${Date.now()}`,
          title: newPost.title,
          body: "Optimistic post",
          userId: 1,
          optimistic: true,
        },
        ...oldPosts,
      ]);

      // This value will be available in onError/onSettled
      return { previousPosts };
    },

    // Runs if mutation fails
    onError: (error, newPost, context) => {
      // Roll back to the previous data
      queryClient.setQueryData(
        ["posts"],
        context.previousPosts
      );
    },

    // Runs after success OR error
    onSettled: () => {
      // Get the real server data
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    createPostMutation.mutate({
      title,
      body: "Created from optimistic update example",
      userId: 1,
    });

    setTitle("");
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Optimistic Updates
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update the UI immediately before the server responds.
        </p>
      </div>

      {/* Create Post */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Create Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex gap-2"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={createPostMutation.isPending}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createPostMutation.isPending
              ? "Creating..."
              : "Create"}
          </button>
        </form>
      </section>

      {/* Mutation Status */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Mutation Status
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Status</p>

            <p className="mt-1 font-semibold capitalize text-gray-900">
              {createPostMutation.status}
            </p>
          </div>

          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Pending</p>

            <p className="mt-1 font-semibold text-gray-900">
              {createPostMutation.isPending ? "Yes" : "No"}
            </p>
          </div>

          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Posts</p>

            <p className="mt-1 font-semibold text-gray-900">
              {postsQuery.data?.length ?? 0}
            </p>
          </div>
        </div>

        {createPostMutation.isPending && (
          <div className="mt-4 rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-700">
            ✨ Post added optimistically. Waiting for server...
          </div>
        )}

        {createPostMutation.isError && (
          <div className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
            {createPostMutation.error.message}
          </div>
        )}
      </section>

      {/* Posts */}
      <section className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Posts
          </h2>

          {postsQuery.isFetching && (
            <span className="text-xs text-gray-500">
              Updating...
            </span>
          )}
        </div>

        {postsQuery.isPending && (
          <p className="mt-4 text-sm text-gray-500">
            Loading posts...
          </p>
        )}

        {postsQuery.isError && (
          <p className="mt-4 text-sm text-red-600">
            {postsQuery.error.message}
          </p>
        )}

        {postsQuery.isSuccess && (
          <div className="mt-4 space-y-3">
            {postsQuery.data.map((post) => (
              <div
                key={post.id}
                className={`rounded-md border p-4 ${
                  post.optimistic
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium text-gray-900">
                    {post.title}
                  </h3>

                  {post.optimistic && (
                    <span className="shrink-0 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      Optimistic
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default OptimisticUpdates;