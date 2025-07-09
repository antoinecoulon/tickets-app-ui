export type Message = {
  id: number;
  contenu: string;
  createdAt: string;
  auteur: {
    id: number;
    username: string;
  };
};
