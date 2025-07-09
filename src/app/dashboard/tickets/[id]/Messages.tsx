"use client"

import api from "@/lib/axios";
import { Message } from "@/types/Message";
import { SetStateAction, useState } from "react";
import dayjs from "dayjs";

type Props = {
    id: number
    messages: Message[]
    setMessages: React.Dispatch<SetStateAction<Message[]>>
}

export default function Messages({ messages, setMessages, id }: Props) {
    const [contenu, setContenu] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!contenu.trim()) return

        try {
            const response = await api.post(`/tickets/${id}/messages/`, { contenu })
            setMessages((prevMessages) => [...prevMessages, response.data])
            setContenu("")
        } catch (err) {
            console.error("Erreur lors de la création du message: ", err)
        }
    }

    return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Messages du ticket #{id}</h2>

        {messages.length > 0 &&
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="p-2 border rounded bg-white">
            <div className="text-sm text-gray-600">{m.auteur.username} - {dayjs(m.createdAt).format("DD/MM/YYYY à HH:MM")}</div>
            <div>{m.contenu}</div>
          </div>
        ))}
      </div>
}
      <form onSubmit={handleSubmit} className="mt-6 space-y-2">
        <textarea
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          placeholder="Votre message..."
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Envoyer
        </button>
      </form>
    </div>
  );
}