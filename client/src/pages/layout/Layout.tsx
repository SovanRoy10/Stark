import SideBar from "@/components/SideBar";
import MobileNav from "@/components/MobileNav";

export default function Layout() {
  return (
    <main className="root">
      <SideBar />
      <MobileNav/>

      <div className="root-container">
        <div className="wrapper"></div>
      </div>
    </main>
  );
}
