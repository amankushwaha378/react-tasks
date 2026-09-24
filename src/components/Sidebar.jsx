import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar({
  links = [],
  className = "",
  title = "Sidebar",
  isCollapsed,
  setIsCollapsed,
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className=" fixed left-4 top-4 z-40 rounded-lg bg-gray-900 p-3 text-white md:hidden"
      >
        ☰
      </button>

      {/* Mobile overlay */}
      <div
        className={` fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${isMobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
            `}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside
        className={`     fixed left-0 top-0 z-50     h-screen w-64     bg-gray-900 text-white    transition-all duration-300    ease-in-out    overflow-auto
     ${isCollapsed ? "md:w-20" : "md:w-64"}
     ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
     md:translate-x-0
     ${className} `}
      >
        <div
          className={`flex h-16 items-center px-4 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && (
            <h1 className="whitespace-nowrap text-xl font-bold">{title}</h1>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden shrink-0 rounded-md px-4 py-3 hover:bg-gray-800 md:block"
          >
            {isCollapsed ? "→" : "←"}
          </button>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded-md p-2 hover:bg-gray-800 md:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="p-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `mb-2 flex items-center rounded-lg py-3 ${isCollapsed && !isMobileOpen ? "justify-center px-0" : "gap-3 px-4"} ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"}`
              }
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {" "}
                {link.icon}
              </span>

              {(!isCollapsed || isMobileOpen) && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
