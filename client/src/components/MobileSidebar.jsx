import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  return (
    <>
      <Sheet> 
        <SheetTrigger>
          <Button className="md:hidden" variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 text-white">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
}
