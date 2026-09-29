import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import MultiTab from "../components/MultiTab";
import BasicQuery from "../React query/BasicQuery";
import OptimisticUpdates from "./OptimisticUpdates";
import Pagination from "./Pagination";
import InfiniteQuery from "./InfiniteQuery";
import Suspense from "./Suspense";
import Prefetch from "./Prefetch";
import StarWars from "./StarWars";
import ChatStreaming from "./ChatStreaming";

const tabs = [
  {
    label: "Basics",
    path: "basics",
  },
  {
    label: "Optimistic Updates",
    path: "optimistic-updates",
  },
  {
    label: "Pagination",
    path: "pagination",
  },
  ,
  {
    label: "Infinite Query",
    path: "infinite-query",
  },
  {
    label: "Suspense",
    path: "suspense",
  },
  {
    label: "Prefetch",
    path: "prefetch",
  },
  {
    label: "Star Wars",
    path: "star-wars",
  },
  {
  label: "Chat Streaming",
  path: "chat-streaming",
}
];

function ReactQueryLayout() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">React Query Playground</h1>

        <p className="text-gray-600">
          Explore and implement TanStack Query concepts and official examples.
        </p>
      </div>

      <MultiTab tabs={tabs} basePath="/task-91" />

      <div className="mt-6">
        <Routes>
          <Route index element={<Navigate to="basics" replace />} />
          <Route path="basics" element={<BasicQuery />} />
          <Route path="optimistic-updates" element={<OptimisticUpdates />} />
          <Route path="pagination" element={<Pagination />} />

          <Route path="infinite-query" element={<InfiniteQuery />} />
          <Route path="suspense" element={<Suspense />} />
          <Route path="prefetch" element={<Prefetch />} />
          <Route path="star-wars" element={<StarWars />} />
          <Route path="chat-streaming" element={<ChatStreaming />} />
        </Routes>
      </div>
    </div>
  );
}

export default ReactQueryLayout;
