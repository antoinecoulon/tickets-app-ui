"use client";

import Loader from "@/components/Loader";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function AdminStatsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/admin/stats/").then((response) => setStats(response.data));
  }, []);

  if (!stats) return <Loader />

  return (
    <div className="p-4">
      <h2>Tableau de bord administrateur</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Total des tickets" value={stats.tickets_total} />
        <Card title="Total des agents" value={stats.agents_total} />
        <Card title="Total des clients" value={stats.clients_total} />
        <Card title="Entreprises" value={stats.entreprises_total} />
        {Object.entries(stats.tickets_by_statut).map(([statut, stat]) => (
          <Card
            key={statut}
            title={`Tickets ${statut.replace("_", " ")}`}
            value={stat as number}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
