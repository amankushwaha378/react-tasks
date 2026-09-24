import { NavLink } from "react-router-dom";
function MultiTab({ tabs = [], className = "", basePath ="" }) {
  return (
    <nav
      className={` flex gap-1 sm:gap-2 overflow-x-auto border-b border-gray-300 ${className} `}
    >
      
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={`${basePath}/${tab.path}`}
          className={({ isActive }) =>
            `shrink-0 whitespace-nowrap px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base ${isActive ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"} `
          }
        >
          
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
export default MultiTab;
