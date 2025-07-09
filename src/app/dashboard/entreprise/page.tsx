"use client"

import Loader from "@/components/Loader";
import api from "@/lib/axios";
import { Entreprise } from "@/types/Entreprise";
import { useEffect, useState } from "react";

export default function EntreprisePage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [entreprise, setEntreprise] = useState<Entreprise | null>(null)

    useEffect(() => {
        const fetchEntreprise = async () => {
            try {     
                const { data } = await api.get("/entreprise/")
                setEntreprise(data)
            } catch (err) {
                console.error("Erreur lors du chargement des entreprises: ", err)
            } finally {
                setLoading(false)
            }
        }

        fetchEntreprise()
    }, [])

    return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Mon entreprise</h2>

      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>{entreprise?.nom}</h2>
          <p className="text-sm text-gray-500">Plus d'informations à venir...</p>
        </>
      )}
    </div>
  );
}