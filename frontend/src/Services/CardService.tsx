import {httpClient} from "@/Services/HttpClient.tsx";

export const CardService = {
  async getCards() {
    return httpClient.get("/cards");
  }
};
