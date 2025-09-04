import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createCategoriesQueryOptions } from "@/queryOptions/createCategoryQueryOptions";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/utils";
import { AlertOctagon, Mail, UserCircle } from "lucide-react";

const Nav = () => {
  const { data } = useSuspenseQuery(createCategoriesQueryOptions());
  const { loginData } = useAuth();

  const navigate = useNavigate();

  const handleClick = () => {
    if (loginData) {
      navigate({ to: "/annonce" });
    } else {
      navigate({ to: "/login" });
    }
  };

  return (
    <nav className="flex gap-4 md:gap-8 items-center text-text">
      <Select
        onValueChange={(slug) => {
          navigate({ to: "/category/$category", params: { category: slug } });
        }}
      >
        <SelectTrigger className="w-[180px] rounded-lg border border-app-primary bg-white shadow-sm focus:ring-2 focus:ring-app-primary/50 transition-all">
          <SelectValue placeholder="vælg kategori" />
        </SelectTrigger>
        <SelectContent className="rounded-lg shadow-lg border border-app-primary bg-white">
          <SelectGroup>
            {data.map((category) => (
              <SelectItem
                key={category.id}
                value={category.slug}
                className="hover:bg-app-primary/10 focus:bg-app-primary/20 px-3 py-2 rounded cursor-pointer transition-colors"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <button
        className="hover:cursor-pointer bg-app-primary text-white px-5 py-2 rounded-lg font-semibold shadow-sm border border-app-primary hover:bg-app-accent hover:border-app-accent transition-colors"
        onClick={handleClick}
      >
        Opret annonce
      </button>

      {loginData && (
        <div className="flex gap-5">
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
  );
};

export default Nav;
