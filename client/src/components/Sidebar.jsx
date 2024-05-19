import { Link } from "react-router-dom";

import { LayoutDashboard, MessageSquare,ImageIcon,VideoIcon,Music,Code,Settings } from "lucide-react";
import { useLocation } from "react-router-dom";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const location = useLocation();
  // console.log(location.pathname.slice(1))
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-10 mr-4 flex items-center gap-4">
            <img src="/stark.jpg" alt="stark" className="rounded-full" />
            <h1 className="text-2xl font-bold">Stark</h1>
          </div>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => {
            return (
              <Link
                key={route.href}
                to={route.href}
                className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ${location.pathname === route.href ? 'bg-white/10 text-white' :'text-zinc-400'}`}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={`${route.color} w-5 h-5 mr-3`} />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
