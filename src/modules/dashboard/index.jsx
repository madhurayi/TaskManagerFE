import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="flex dashboard max-h-screen overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex w-full max-h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
