import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const taskLinks = [
  {
    label: "Modal",
    path: "/task-1",
    icon: "1",
  },
  {
    label: "Sidebar",
    path: "/task-2",
    icon: "2",
  },
  {
    label: "Tailwind CSS",
    path: "/task-3",
    icon: "3",
  },
  {
    label: "MultiSelect",
    path: "/task-4",
    icon: "4",
  },
  {
    label: "Scroll",
    path: "/task-5",
    icon: "5",
  },
  {
    label: "Multi Tabs",
    path: "/task-6",
    icon: "6",
  },
  {
    label: "Data table",
    path: "/task-7",
    icon: "7",
  },
  {
    label: "Tags Input",
    path: "/task-8",
    icon: "8",
  },
  {
    label: "Custom Select",
    path: "/task-9",
    icon: "9",
  },
  {
    label: "Axios",
    path: "/task-77",
    icon: "77",
  },
  {
    label: "Sample App",
    path: "/task-80",
    icon: "80",
  },
  {
    label: "TanStack Virtual",
    path: "/task-83/tanstack",
    icon: "I",
  },
  {
    label: "React Window",
    path: "/task-83/react-window",
    icon: "II",
  },
  {
    label: "React Virtuoso",
    path: "/task-83/virtuoso",
    icon: "III",
  },
  {
    label: "Image Upload",
    path: "/task-84",
    icon: "84",
  },
  {
    label : "Zod",
    path : "/task-88",
    icon : "88"
  },
   {
    label : "Recharts",
    path : "/task-89",
    icon : "89"
  },
   {
    label : "Tanstack Table",
    path : "/task-90",
    icon : "90"
  },
  {
    label : "Lodash",
    path : "/task-92",
    icon : "92"
  },
   {
    label : "Tailwind merge & clsx",
    path : "/task-93",
    icon : "93"
  }
  ,{
    label : "React Select Playground",
    path : "/task-94",
    icon : "94"
  },
  {
    label : "Date Fns Playground",
    path : "/task-95",
    icon : "95"
  }
];

function TaskLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="min-h-screen">
      <Sidebar
        links={taskLinks}
        title="React Tasks"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <main
        className={`
                    min-h-screen
                  transition-[margin] duration-300
                    ${isCollapsed ? "md:ml-20" : "md:ml-64"}
                `}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default TaskLayout;
