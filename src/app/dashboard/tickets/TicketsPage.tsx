"use client";

import api from "@/lib/axios";
import { Ticket } from "@/types/Ticket";
import { useEffect, useState } from "react";
import TicketsTable from "./TicketsTable";
import Link from "next/link";
import Loader from "@/components/Loader";
import { useUserStore } from "@/store/userStore";

export default function TicketPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const userRole = useUserStore((s) => s.role);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.append("page", String(page));
        if (search) params.append("search", search);
        if (status) params.append("statut", status);

        const { data } = await api.get(`/tickets/?${params.toString()}`);
        setTickets(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (err: any) {
        console.error("Erreur tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [page, search, status]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Liste des tickets</h2>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher dans le titre ou la description..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border px-2 py-1 rounded w-full max-w-sm"
        />

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="">Tous les statuts</option>
          <option value="ouvert">Ouvert</option>
          <option value="ferme">Fermé</option>
          <option value="en_cours">En cours</option>
          <option value="resolu">Résolu</option>
        </select>
      </div>
      {userRole !== "agent" && (
        <Link href={"/dashboard/tickets/create"}>
          <button className="p-4 mb-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer">
            Nouveau ticket
          </button>
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : (
        <>
          <TicketsTable data={tickets} />

          <div className="flex justify-around gap-2 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="bg-gray-200 px-2 rounded"
            >
              Précédent
            </button>
            <span>
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="bg-gray-200 px-2 rounded"
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}
