"use client";

import { Link } from "@tanstack/react-router";

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

const Nav = () => {
  return (
    <nav className="flex gap-8  text-text">
      {links.map((link, index) => {
        return (
          <Link
            to={link.path}
            key={index}
            activeProps={{
              className: "text-app-primary",
            }}
            className={`capitalize font-medium transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
