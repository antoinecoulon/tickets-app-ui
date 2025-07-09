"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

type NavItems = {
  name: string;
  path: string;
};

type Props = {
  sidebarOpen: boolean, 
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ sidebarOpen, setSidebarOpen}: Props) {
  const pathname = usePathname();
  const userRole = useUserStore((state) => state.role);
  const [navItems, setNavItems] = useState<NavItems[]>([]);

  useEffect(() => {
    if (userRole === "admin") {
      setNavItems([
        { name: "Tickets", path: "/dashboard/tickets" },
        { name: "Messages", path: "/dashboard/admin/messages" },
        { name: "Utilisateurs", path: "/dashboard/admin/utilisateurs" },
        { name: "Entreprises", path: "/dashboard/admin/entreprises" },
        { name: "Statistiques", path: "/dashboard/admin/stats" },
      ]);
    } else {
      setNavItems([
        { name: "Tickets", path: "/dashboard/tickets" },
        { name: "Entreprise", path: "/dashboard/entreprise" },
      ]);
    }
  }, [userRole]);

  return (
    <>
      <aside className="hidden md:flex flex-col justify-between items-center py-2">
        <h1 className="font-bold">Tickets App</h1>
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-3 py-2 rounded hover:bg-gray-100 ${
                pathname.startsWith(item.path) ? "bg-gray-200 font-medium" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-opacity-50 md:hidden">
          <div className="w-64 bg-white h-full p-4">
            <h1 className="font-bold">Tickets App</h1>
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`px-3 py-2 rounded hover:bg-gray-100 ${
                    pathname.startsWith(item.path)
                      ? "bg-gray-200 font-medium"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <LogoutButton />
            <button onClick={() => setSidebarOpen(false)}>Fermer</button>
          </div>
        </div>
      )}
    </>
  );
}
