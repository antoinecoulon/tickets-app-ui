"use client";

import { useEffect, useState } from "react";
import { userStore } from "@/store/userStore";

export default function HydrationGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Hack temporaire pour Zustand App Router
    const saved = localStorage.getItem("user-storage");
    if (saved) {
      userStore.getState().setHydrated();
    } else {
      console.log("Local storage not loaded yet");
    }
    setReady(true)
  }, []);

  const isHydrated = userStore.getState().isHydrated;

  if (!ready || !isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        Chargement...
      </div>
    );
  }

  return <>{children}</>;
}
