import { Link, useNavigate } from "@tanstack/react-router";
import MobileNav from "./mobileNav";
import Nav from "./nav";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/utils";

const Header = () => {
  const { loginData, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!loginData;

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className=" h-[80px] px-4 sm:px-0 container mx-auto bg-app-surface text-app-text flex items-center justify-between">
      {/* logo */}
      <Link to={"/"}>
        <h1 className="text-4xl font-semibold">
          Website<span className="text-app-accent">.</span>
        </h1>
      </Link>

      {/* desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        <Nav />

        {!isLoggedIn ? (
          <div>
            <Link to={"/login"}>
              <button
                aria-label="Login"
                className="px-5 hover:cursor-pointer py-2 rounded-lg font-semibold bg-app-primary text-white hover:bg-app-accent transition-colors shadow-sm border border-app-primary hover:border-app-accent"
              >
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button
                aria-label="Signup"
                className="px-5 hover:cursor-pointer py-2 rounded-lg font-semibold bg-app-surface text-app-primary border border-app-primary hover:bg-app-primary hover:text-white hover:border-app-accent transition-colors shadow-sm ml-2"
              >
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <Button aria-label="Logout" onClick={handleLogout}>
              Logout
            </Button>
          </Link>
        )}
      </div>

      {/* mobile nav */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </header>
  );
};
export default Header;
