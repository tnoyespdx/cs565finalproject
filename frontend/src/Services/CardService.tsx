import {httpClient} from "@/Services/HttpClient.tsx";

export const CardService = {
  async getCards() {
    return httpClient.get("/cards");
  },
  
  async getACard(card_id: number) {
    return httpClient.search("/cards", {card_id});
  },
  
};
