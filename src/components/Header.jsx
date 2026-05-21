"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { ListIcon } from "@phosphor-icons/react";

const navLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "All Pets",
    path: "/all-pets",
  },
  {
    label: "My Requests",
    path: "/my-requests",
  },
  {
    label: "Add Pet",
    path: "/add-pet",
  },
];

const Navlink = ({ label, path, setMobileMenuOpen }) => {
  const pathname = usePathname();
  const isActive = pathname === path;
  const router = useRouter();

  return (
    <Button
      variant="link"
      onClick={() => {
        setMobileMenuOpen(false);
        router.push(path);
      }}
      className={`text-base font-medium hover:no-underline ${isActive ? "text-primary" : "text-secondary"} hover:text-primary`}
    >
      {label}
    </Button>
  );
};

const Header = () => {
  // States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="p-3 bg-transparent fixed top-0 left-0 w-full z-40">
        <div className="w-full max-w-7xl mx-auto h-20 px-5 md:px-7 py-3 flex items-center justify-between gap-5 rounded-full border border-border bg-linear-to-r from-white/5 via-white/20 to-white/5 backdrop-blur-xs">
          {/* Logo */}
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              width={300}
              height={120}
              alt="Happy Tails logo"
              priority
              className="w-50 md:w-60"
            />
          </Link>

          {/* Navlinks */}
          <nav
            className={`absolute left-0 p-5 rounded-lg border border-border w-full bg-white transition-all duration-200 ${mobileMenuOpen ? "top-[calc(100%+10px)] pointer-events-auto opacity-100" : "top-[calc(100%+50px)] pointer-events-none opacity-0"} z-40 md:relative md:bg-transparent md:opacity-100 md:pointer-events-auto md:p-0 md:rounded-none md:border-none md:top-auto md:left-auto md:w-fit`}
          >
            <ul className="flex flex-col md:flex-row items-center gap-6.5">
              {navLinks?.map((navlink, index) => (
                <li key={`${navlink?.path}_${index}`}>
                  <Navlink
                    label={navlink?.label}
                    path={navlink?.path}
                    setMobileMenuOpen={setMobileMenuOpen}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href={"/login"}>Login</Link>
            </Button>

            <Button
              variant="outline"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={"block md:hidden"}
            >
              <ListIcon />
            </Button>
          </div>
        </div>
      </header>

      <div
        className="fixed top-0 left-0 w-full h-full bg-transparent z-30"
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </>
  );
};
export default Header;
