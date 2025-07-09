"use client"

import api from "@/lib/axios";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import Loader from "@/components/Loader";

export default function MessagesPage() {
    const [users, setUsers] = useState<User[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)

            try {
                const params = new URLSearchParams();
                params.append("page", String(page));
                
                const { data } = await api.get(`/admin/users/?${params.toString()}`)
                
                setUsers(data.results)
                setTotalPages(Math.ceil(data.count / 10))
            } catch (err) {
                console.error("Erreur lors du chargement des utilisateurs: ", err)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [page])

    return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Liste des messages</h2>

      {loading ? (
        <Loader />
      ) : (
        <>
          <UsersTable data={users} />

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