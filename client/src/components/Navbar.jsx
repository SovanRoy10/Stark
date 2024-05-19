import MobileSidebar from "./MobileSidebar";


export default function Navbar() {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar/>

      {/* add login button */}
      {/* <div className="flex w-full justify-end">
       
      </div> */}
    </div>
  );
}
