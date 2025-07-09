"use client"

import api from "@/lib/axios";
import { Message } from "@/types/Message";
import { useEffect, useState } from "react";
import MessagesTable from "./MessagesTable";
import Loader from "@/components/Loader";

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true)

            try {
                const params = new URLSearchParams();
                params.append("page", String(page));
                
                const { data } = await api.get(`/admin/messages/?${params.toString()}`)
                
                setMessages(data.results)
                setTotalPages(Math.ceil(data.count / 10))
            } catch (err) {
                console.error("Erreur lors du chargement des messages: ", err)
            } finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [page])

    return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Liste des messages</h2>

      {loading ? (
        <Loader />
      ) : (
        <>
          <MessagesTable data={messages} />

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