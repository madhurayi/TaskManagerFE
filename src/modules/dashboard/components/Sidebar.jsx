import { NavLink } from "react-router-dom";
import { navOptions } from "../utils/navOptions";
import { HOME_PATH } from "../../routes/path";

export const Sidebar = () => {
  return (
    <div className="sidebar flex  bg-blue-950 w-full md:w-52  h-screen md:flex flex-col items-start ">
      <div className="title text-white px-2 py-3 bg-gray-800 w-full">
        Task Manager
      </div>
      <div className="flex flex-col text-white text-lg items-start  gap-4 px-3 py-4">
        {navOptions.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === HOME_PATH}
            className={({ isActive }) =>
              isActive
                ? "w-full bg-green-400 px-2 py-1 rounded-full"
                : "w-full px-2 py-1 hover:rounded-xl   "
            }
          >
            {item?.icon} {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
