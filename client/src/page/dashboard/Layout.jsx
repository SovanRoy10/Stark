import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const Layout = () => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 md:w-72">
        <Sidebar/>
      </div>
      <main className="md:pl-72">
        <Navbar/>
        <Outlet />
      </main>
    </div>
  );
};
