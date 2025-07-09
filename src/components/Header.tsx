"use client"

import { useUserStore } from "@/store/userStore";
import dayjs from "dayjs";

type Props = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ setSidebarOpen }: Props) {
  const username = useUserStore((state) => state.username)
  
  
  const greetings = () => {
    const now = dayjs()
    const hour = now.hour()

    if (hour > 7) {
      return `Bonjour, ${username} !`
    } else if (hour > 18) {
      return `Bonsoir, ${username} !`
    }
  }
  
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center px-6 justify-between">
      <div className="text-sm md:text-lg font-semibold">Tableau de bord</div>
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden p-2"
      >
        ☰
      </button>
      <div className="text-sm md:text-base">{greetings()}</div>
    </header>
  );
}
