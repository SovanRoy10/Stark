import {
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  ArrowRight,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];

export default function Dashboard() {
  return (
    <>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => {
          return (
            <Card
              key={tool.href}
              className="p-4 border-black/5 hover:shadow-md transition cursor-pointer"
            >
              <Link to={tool.href} className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className={`p-2 w-fit rounded-md ${tool.bgColor}`}>
                    <tool.icon className={`w-8 h-8 ${tool.color}`} />
                  </div>
                  <div className="font-semibold">{tool.label}</div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Card>
          );
        })}
      </div>
    </>
  );
}
