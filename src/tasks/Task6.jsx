import { Routes, Route, Navigate } from "react-router-dom";
import MultiTab from "../components/MultiTab";

function Home() {
  return <div className="p-5">Home Content</div>;
}

function Profile() {
  return <div className="p-5">Profile Content</div>;
}

function Settings() {
  return <div className="p-5">Settings Content</div>;
}

function Task6() {
  const tabs = [
    {
      label: "Home",
      path: "home",
      element: <Home />,
    },
    {
      label: "Profile",
      path: "profile",
      element: <Profile />,
    },
    {
      label: "Settings",
      path: "settings",
      element: <Settings />,
    },
  ];

  return (
    <div className="p-10">
      <MultiTab tabs={tabs} basePath="/task-6" />

      <Routes>
        {tabs.map((tab) => (
          <Route key={tab.path} path={tab.path} element={tab.element} />
        ))}

        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </div>
  );
}

export default Task6;
