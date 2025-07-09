export function getStatutLabel(statut: string): string {
  return (
    {
      ouvert: "Ouvert",
      en_cours: "En cours",
      resolu: "Résolu",
      ferme: "Fermé",
    }[statut] ?? statut
  );
}

export function getPrioriteLabel(priorite: string): string {
  return (
    {
      basse: "Basse",
      moyenne: "Moyenne",
      haute: "Haute",
    }[priorite] ?? priorite
  );
}

export function getStatutStyle(statut: string) {
  switch (statut) {
    case "ouvert":
      return "bg-green-100 text-green-800";
    case "en_cours":
      return "bg-yellow-100 text-yellow-800";
    case "resolu":
      return "bg-blue-100 text-blue-800";
    case "ferme":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getPrioriteStyle(priorite: string) {
  switch (priorite) {
    case "basse":
      return "bg-blue-100 text-blue-800";
    case "moyenne":
      return "bg-yellow-100 text-yellow-800";
    case "haute":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
