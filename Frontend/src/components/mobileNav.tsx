import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { createCategoriesQueryOptions } from "@/queryOptions/createCategoryQueryOptions";
import { AlertOctagon, Mail, UserCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useAuth } from "@/lib/utils";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Nav = () => {
  const { data: categoryList } = useSuspenseQuery(
    createCategoriesQueryOptions()
  );
  const handleCategoryChange = (slug: string) => {
    navigate({ to: "/category/$category", params: { category: slug } });
  };

  const handleCreateAnnonce = () => {
    if (isLoggedIn) {
      navigate({ to: "/annonce" });
    } else {
      navigate({ to: "/login" });
    }
  };
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { loginData, logout } = useAuth();
  const isLoggedIn = !!loginData;

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
        <nav className="flex flex-col justify-center items-center gap-8 mx-10 mt-20">
          <Select onValueChange={handleCategoryChange} name="category">
            <SelectTrigger className="w-full rounded-lg border border-app-primary bg-white shadow-sm focus:ring-2 focus:ring-app-primary/50 transition-all">
              <SelectValue placeholder="vælg kategori" />
            </SelectTrigger>
            <SelectContent className="rounded-lg shadow-lg border border-app-primary bg-white">
              <SelectGroup>
                <SelectLabel>Kategori</SelectLabel>
                {categoryList.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            className="hover:cursor-pointer bg-app-primary text-white px-5 py-2 rounded-lg font-semibold shadow-sm border border-app-primary hover:bg-app-accent hover:border-app-accent transition-colors"
            onClick={handleCreateAnnonce}
          >
            Opret annonce
          </Button>

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

          {isLoggedIn && (
            <div className="flex gap-5 mt-4">
              <Link to="/">
                <Mail className="text-gray-500 w-8 h-8" />
              </Link>
              <Link to="/">
                <AlertOctagon className="text-gray-500 w-8 h-8" />
              </Link>
              <Link to="/konto/profile">
                <UserCircle className="text-gray-500 w-8 h-8" />
              </Link>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
export default Nav;
