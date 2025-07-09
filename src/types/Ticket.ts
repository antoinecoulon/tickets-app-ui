export type Ticket = {
    id: number
    titre: string
    description: string
    priorite: string
    statut: string
    client: {
        id: number
        username: string
        email: string
    }
    agent: {
        id: number
        username: string
        email: string
    }
    agent_id: number
    createdAt: string
}