import { httpClient } from "@/Services/HttpClient.tsx";

export const AddCardService = {
  async add(user_id: number, card_id: number) {
      return httpClient.post("/collection/add", { card_id: card_id, user_id: user_id})
  }
};
