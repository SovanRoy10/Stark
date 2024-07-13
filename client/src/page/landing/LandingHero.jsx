import TypewriterComponent from "typewriter-effect";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingHero() {
  const { isSignedIn, isLoaded } = useUser();
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Chat Bot",
                "Photo Generation",
                "Video Generation",
                "Music Generation",
                "Code Generation",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        <div className="text-sm md:text-xl font-light text-zinc-400">
          Create content using AI 10x faster
        </div>

        <div>
          <Link to={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button className="px-10 py-6 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto">
              Start Generating
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
