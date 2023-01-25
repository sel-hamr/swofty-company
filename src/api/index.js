import axios from "axios";
import { getCreadteClient } from "./utils";

let api = axios.create({
  baseURL: "https://api.intra.42.fr",
});

api.interceptors.request.use(async (request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  const user = await getCreadteClient();
  request.headers = {
    Authorization: `Bearer ${user.access_token}`,
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return request;
});

export default api;
