import axios from "axios";

export const strapi = axios.create({
  baseURL: "process.env.STRAPI_API_URL",
});
