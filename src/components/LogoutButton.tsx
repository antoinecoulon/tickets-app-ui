"use client"

import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter()
    const logout = useUserStore((state) => state.logout)

    const handleLogout = () => {
        logout()
        router.push("/login")
    }
    
    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 py-2 px-4 m-2 rounded text-gray-50 hover:bg-red-700 hover:cursor-pointer"
        >
            Se déconnecter
        </button>
    )
}