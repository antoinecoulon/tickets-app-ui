"use client";

import Header from "@/components/Header";
import HydrationGate from "@/components/HydrationGate";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const token = useUserStore((state) => state.token)

  const [checked, setChecked] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    // Evite le 'flicker' du premier render (on ne sait pas encore si user logged)
    if (token === null) {
      setChecked(true)
    } else if (token) {
      setChecked(true)
    }
  }, [token])

  useEffect(() => {    
    if (checked && token === null) {
      router.push("/login")
    } else {
      setChecked(true)  
    }
  }, [checked, token])

  if (!checked) {
    return (
      <Loader />
    );
  }
  
  return (
    <HydrationGate>
      <div className="flex h-screen bg-gray-100 text-gray-900">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-col flex-1">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </HydrationGate>
  );
}
