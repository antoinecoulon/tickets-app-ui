"use client";

import api from "@/lib/axios";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (localStorage.getItem("user-storage")) {
      router.push("/dashboard");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const tokenResponse = await api.post("/auth/token/", {
        username,
        password,
      });

      const access = tokenResponse.data.access;
      const refresh = tokenResponse.data.refresh;

      const userResponse = await api.get("/auth/credentials/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      setUser(
        access,
        refresh,
        userResponse.data.role,
        userResponse.data.username,
        userResponse.data.entreprise
      );
      toast.success("Connecté avec succès", {
        duration: 3000,
        icon: "✅",
      });
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Identifiants incorrects");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Connexion</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
