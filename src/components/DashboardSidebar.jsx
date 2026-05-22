"use client";
import { Button } from "@/components/ui/button";
import { HandDepositIcon, PlusIcon, RowsIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  {
    label: "My Requests",
    path: "/my-requests",
    icon: <HandDepositIcon size={20} />,
  },
  {
    label: "Add Pet",
    path: "/add-pet",
    icon: <PlusIcon size={20} />,
  },
  {
    label: "My Listings",
    path: "/my-listings",
    icon: <RowsIcon size={20} />,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-fit sm:min-h-[calc(100vh-110px)] w-full sm:sticky sm:top-26 p-5 rounded-lg border bg-linear-to-br from-white via-slate-100 to-slate-50 flex flex-col gap-1 mb-7 sm:mb-0">
      {pages?.map((page, index) => (
        <Button
          key={`${page?.path}_${index}`}
          asChild
          variant={page.path === pathname ? "default" : "ghost"}
          className={"rounded-sm"}
        >
          <Link href={page?.path} className="justify-start">
            {page.icon} {page.label}
          </Link>
        </Button>
      ))}
    </aside>
  );
};
export default DashboardSidebar;
