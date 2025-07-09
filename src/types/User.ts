export type User = {
    username: string
    email: string
    role: "admin" | "agent" | "client"
    entreprise: {
        id: number
        nom: string
    }
}