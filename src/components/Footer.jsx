"use client";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const pages = [
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

const Footer = () => {
  return (
    <footer className="p-3">
      <div className="w-full max-w-7xl mx-auto rounded-xl border border-border bg-linear-to-br from-white via-slate-100 to-slate-50 px-5 pt-7 md:pt-14 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col-01 */}
        <Image
          src={"/logo-2.png"}
          alt="Happy Tails logo"
          width={300}
          height={300}
          className="w-50"
        />

        {/* Col-04 */}
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-secondary">About Us</span>
          <p className="text-sm tracking-wide leading-5">
            Every pet deserves a loving home. Explore, connect, and take a step
            toward giving a shelter animal a forever family through adoption.
          </p>
        </div>

        {/* Col-03 */}
        <div className="flex flex-col gap-2.5">
          <span className="font-semibold text-secondary">Pages</span>
          {pages?.map((page, index) => (
            <Link
              className="text-sm font-normal"
              key={`${page?.path}_${index}`}
              href={page?.path}
            >
              {page?.label}
            </Link>
          ))}
        </div>

        {/* Col-04 */}
        <div className="flex flex-col gap-2.5">
          <span className="font-semibold text-secondary">Our Socials</span>
          <Link
            className="text-sm font-normal flex items-center gap-1"
            href={"/"}
          >
            <FacebookLogoIcon size={20} /> Facebook
          </Link>
          <Link
            className="text-sm font-normal flex items-center gap-1"
            href={"/"}
          >
            <InstagramLogoIcon size={20} /> Instagram
          </Link>
          <Link
            className="text-sm font-normal flex items-center gap-1"
            href={"/"}
          >
            <TwitterLogoIcon size={20} /> Twitter
          </Link>
          <Link
            className="text-sm font-normal flex items-center gap-1"
            href={"/"}
          >
            <YoutubeLogoIcon size={20} /> YouTube
          </Link>
        </div>

        <p className="block text-center sm:col-span-2 lg:col-span-4 py-2 px-3 font-light text-sm">
          Copyright 2026 &copy; Shah Samin Yasar
        </p>
      </div>
    </footer>
  );
};
export default Footer;
