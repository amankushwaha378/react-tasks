import { useEffect, useRef, useState } from "react";
import {
  experimental_streamedQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

async function* streamChat({ question }) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
        stream: true,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch response");
  }

  if (!response.body) {
    throw new Error("Streaming is not supported");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, {
      stream: true,
    });

    const lines = buffer.split("\n");

    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (!trimmedLine) continue;

      if (!trimmedLine.startsWith("data:")) {
        continue;
      }

      const data = trimmedLine.replace("data:", "").trim();

      if (data === "[DONE]") {
        return;
      }

      try {
        const parsed = JSON.parse(data);

        const content =
          parsed.choices?.[0]?.delta?.content;

        if (content) {
          yield content;
        }
      } catch {
        // Ignore incomplete chunks
      }
    }
  }
}

function StreamingMessage({
  messageId,
  question,
  onComplete,
}) {
  const queryClient = useQueryClient();
  const savedRef = useRef(false);

  const { data = [], isFetching, error } = useQuery({
    queryKey: ["chat-stream", messageId],

    queryFn: experimental_streamedQuery({
      streamFn: () => streamChat({ question }),
    }),

    // This is an active one-time streaming operation.
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  useEffect(() => {
    if (
      !isFetching &&
      data.length > 0 &&
      !savedRef.current
    ) {
      savedRef.current = true;

      const finalAnswer = data.join("");

      // Move the completed answer into normal chat state.
      onComplete(messageId, finalAnswer);

      // Remove the query from React Query's cache.
      queryClient.removeQueries({
        queryKey: ["chat-stream", messageId],
      });
    }
  }, [
    data,
    isFetching,
    messageId,
    onComplete,
    queryClient,
  ]);

  return (
    <div className="space-y-4">
      {/* User message */}
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl bg-blue-600 px-4 py-3 text-white">
          {question}
        </div>
      </div>

      {/* Streaming AI message */}
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-3 text-gray-800">
          {error ? (
            <p className="text-red-600">
              {error.message}
            </p>
          ) : (
            <>
              <p className="whitespace-pre-wrap">
                {data.join("")}

                {isFetching && (
                  <span className="animate-pulse">
                    ▌
                  </span>
                )}
              </p>

              {isFetching && (
                <p className="mt-2 text-xs text-gray-400">
                  Generating...
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatStreaming() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streamingMessageId, setStreamingMessageId] =
    useState(null);

  const sendMessage = () => {
    const question = input.trim();

    if (!question || streamingMessageId) return;

    const id = crypto.randomUUID();

    setMessages((previous) => [
      ...previous,
      {
        id,
        question,
        answer: null,
        status: "streaming",
      },
    ]);

    setStreamingMessageId(id);
    setInput("");
  };

  const handleComplete = (messageId, answer) => {
    setMessages((previous) =>
      previous.map((message) =>
        message.id === messageId
          ? {
              ...message,
              answer,
              status: "complete",
            }
          : message
      )
    );

    setStreamingMessageId(null);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          AI Streaming Chat
        </h1>

        <p className="mt-2 text-gray-600">
          OpenRouter → SSE → ReadableStream → TanStack Query
        </p>
      </div>

      {/* Chat */}
      <div className="flex-1 space-y-6 overflow-y-auto">
        {messages.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            Ask the AI something...
          </div>
        )}

        {messages.map((message) => {
          /*
           * Only the currently streaming message
           * uses React Query.
           */
          if (message.status === "streaming") {
            return (
              <StreamingMessage
                key={message.id}
                messageId={message.id}
                question={message.question}
                onComplete={handleComplete}
              />
            );
          }

          /*
           * Completed messages are just normal
           * React state. No query exists anymore.
           */
          return (
            <div
              key={message.id}
              className="space-y-4"
            >
              {/* User */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-blue-600 px-4 py-3 text-white">
                  {message.question}
                </div>
              </div>

              {/* AI */}
              <div className="flex justify-start">
                <div className="max-w-[80%] whitespace-pre-wrap rounded-2xl bg-gray-100 px-4 py-3 text-gray-800">
                  {message.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="mt-6 flex gap-3 border-t pt-6">
        <textarea
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={
            streamingMessageId
              ? "Wait for the response..."
              : "Ask something..."
          }
          disabled={!!streamingMessageId}
          rows={1}
          className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
        />

        <button
          onClick={sendMessage}
          disabled={
            !input.trim() ||
            !!streamingMessageId
          }
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatStreaming;