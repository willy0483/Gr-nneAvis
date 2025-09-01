import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useAuth } from "@/lib/utils";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { loginData, logout } = useAuth();
  const isLoggedIn = !!loginData;

  const links = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "products",
      path: "/products",
    },
    {
      name: "resume",
      path: "/resume",
    },
    {
      name: "work",
      path: "/work",
    },
    {
      name: "contact",
      path: "/contact",
    },
  ];
  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
    toast.success("You have been logged out.", {
      id: "logout",
    });
  };

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col h-full"
        aria-describedby={undefined}
      >
        <SheetTitle className="hidden">Navbar</SheetTitle>

        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8 mx-10 mt-40">
          {links.map((link, index) => {
            const isActive = link.path === pathname;
            return (
              <Link
                to={link.path}
                key={index}
                className={`${isActive ? "text-app-primary border-b-2 border-app-primary" : ""} hover:text-app-primary transition-colors duration-150`}
              >
                {link.name}
              </Link>
            );
          })}

          {isLoggedIn ? (
            <Button
              aria-label="Logout"
              onClick={handleLogout}
              className="hover:text-app-primary transition-colors duration-150"
            >
              Logout
            </Button>
          ) : (
            <Link
              to="/login"
              className={`${pathname === "/login" ? "text-app-primary border-b-2 border-app-primary" : ""} hover:cursor-pointer hover:text-app-primary transition-colors duration-150`}
            >
              Login
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
export default Nav;
