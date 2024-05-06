import SideBar from "@/components/sidebar/SideBar";

export default function Layout() {
  return (
    <main className="root">
      <SideBar />
      {/* <MobileNav/> */}

      <div className="root-container">
        <div className="wrapper"></div>
      </div>
    </main>
  );
}
