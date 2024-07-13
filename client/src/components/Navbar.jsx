import MobileSidebar from "./MobileSidebar";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className="flex items-center justify-between p-4">
      <MobileSidebar />

      <div className="flex items-center gap-4">
        {!isSignedIn && isLoaded && (
          <>
            <Link to="/sign-in">
              <Button className="px-4 py-2 text-white">Login</Button>
            </Link>
            <Link to="/sign-up">
              <Button className="px-4 py-2 ">Register</Button>
            </Link>
          </>
        )}

        {isSignedIn && <UserButton />}
      </div>
    </div>
  );
}
