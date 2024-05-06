import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { navLinks } from "../../constants/data";
import { useLocation } from "react-router-dom";

export default function MobileNav() {
  const location = useLocation();
  return (
    <header className="header">
      <Link to="/" className="flex items-center gap-2 md:py-2">
        <img
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>
      <nav className="flex gap-2">
        {/* if logged in */}

        <Sheet>
          <SheetTrigger>
            <img
              src="/assets/icons/menu.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="sheet-content sm:w-64">
            <>
              <img
                src="/assets/images/logo-text.svg"
                alt="logo"
                width={152}
                height={23}
              />

              <ul className="header-nav_elements">
                {navLinks.map((link) => {
                  const isActive = link.route === location.pathname;

                  return (
                    <li
                      className={`${
                        isActive && "bg-blue-500 w-full rounded-2xl text-white"
                      } p-18 flex whitespace-nowrap text-dark-700`}
                      key={link.route}
                    >
                      <Link className="sidebar-link" to={link.route}>
                        <img
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          </SheetContent>
        </Sheet>

        {/* if logged out */}

        <Button asChild className="button bg-cover">
          <Link to="/sign-in">Login</Link>
        </Button>
      </nav>
    </header>
  );
}
