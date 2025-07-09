"use client";

import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardHome() {
  const router = useRouter();
  const userRole = useUserStore((state) => state.role)

  useEffect(() => {
    if (userRole === "admin") {
      router.replace("/dashboard/admin/stats")
    } else {
      router.replace("/dashboard/tickets");
    }
  }, []);

  return null;
}
