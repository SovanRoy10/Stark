import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export default function LandingNavbar() {
    const { isSignedIn,isLoaded } = useUser();
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <img src="/stark.jpg" alt="stark" className="rounded-full" />
        </div>
        <h1 className="text-white font-bold text-2xl">Stark AI</h1>
      </Link>

      <div className="flex items-center gap-x-2">
        <Link to={isSignedIn ? "/dashboard":"/sign-in"}>
        <Button variant="outline" className="rounded-full">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
}
