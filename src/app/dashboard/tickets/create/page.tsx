"use client";

import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type TicketFormInputs = {
  titre: string;
  description: string;
  priorite: "basse" | "moyenne" | "haute";
};

export default function CreateTicketPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormInputs>();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: TicketFormInputs) => {
    setSubmitError(null);
    try {
      const response = await api.post("/tickets/", data);
      toast.success("Ticket créé avec succès", {
        duration: 3000,
        icon: "✅",
      });
      router.push("/dashboard/tickets");
    } catch (err: any) {
      console.error("Erreur lors de la création d'un ticket:", err);
      setSubmitError(
        "Erreur lors de la création d'un ticket, veuillez réessayer."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Créer un ticket</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Titre</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            {...register("titre", { required: "Le titre est requis" })}
          />
          {errors.titre && (
            <p className="text-red-600 text-sm">{errors.titre.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded p-2"
            {...register("description", {
              required: "La description est requise",
            })}
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Priorité</label>
          <select
            className="w-full border rounded p-2"
            {...register("priorite", { required: true })}
          >
            <option value="">-- Sélectionner --</option>
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
          </select>
          {errors.priorite && (
            <p className="text-red-600 text-sm">La priorité est requise</p>
          )}
        </div>

        {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Création en cours..." : "Créer le ticket"}
        </button>
      </form>
    </div>
  );
}
