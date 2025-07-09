"use client";

import dynamic from "next/dynamic";

const TicketPage = dynamic(() => import("./TicketsPage"), { ssr: false })

export default function TicketWrapper() {
    return <TicketPage />
}