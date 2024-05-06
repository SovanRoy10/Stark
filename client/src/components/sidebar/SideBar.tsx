import { Link } from "react-router-dom";
import { navLinks } from "../../../constants/data";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";

function SideBar() {
  const location = useLocation();
  // console.log(location)
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link to="/" className="sidebar-logo-link">
          <img
            src="/assets/images/logo-text.svg"
            alt="logo"
            className="w-[180px] h-[28px]"
          />
        </Link>
        {/* if logged in */}
        <nav className="sidebar-nav">
          <ul className="sidebar-nav_elements">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = link.route === location.pathname;
              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${
                    isActive ? "bg-blue-500 text-white" : "text-gray-700"
                  }`}
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

          <ul className="sidebar-nav_elements">
            {navLinks.slice(6).map((link) => {
              const isActive = link.route === location.pathname;
              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${
                    isActive ? "bg-blue-500 text-white" : "text-gray-700"
                  }`}
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
        </nav>

        {/* if logged out */}
        <Button asChild className="button bg-cover">
          <Link to="/sign-in">Login</Link>
        </Button>
      </div>
    </aside>
  );
}

export default SideBar;
