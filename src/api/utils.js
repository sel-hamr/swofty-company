import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { payload } from "./constant";

function tokenValid(token = {}) {
  const now = Date.now() / 1000;
  const expiry = token.created_at + token.expires_in;
  return now < expiry;
}

const getUserFromApi = async () => {
  const _client = await axios.post(
    "https://api.intra.42.fr/oauth/token",
    payload
  );
  storeDataToLocalStorage(_client.data);
  return _client.data;
};

const getDataFromLocalStorage = async () => {
  try {
    const value = await AsyncStorage.getItem("@oauth");

    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    console.log(e, "e");
  }
};
const storeDataToLocalStorage = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@oauth", jsonValue);
  } catch (e) {
    console.log(e, "e");
  }
};
export const getCreadteClient = async () => {
  const client = await getDataFromLocalStorage();
  if (client) {
    if (tokenValid()) return client;
    else {
      const NewClient = await getUserFromApi();
      return NewClient;
    }
  } else {
    const NewClient = await getUserFromApi();
    return NewClient;
  }
};
