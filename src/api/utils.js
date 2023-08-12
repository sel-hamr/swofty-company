import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_CLIENT_ID,REACT_APP_CLIENT_SEVRET ,REACT_REDIRECT_APP} from '@env';

function tokenValid(token = {}) {
  const now = Date.now() / 1000;
  const expiry = token.created_at + token.expires_in;
  return now < expiry;
}

const getUserFromApi = async () => {
  const data = await getDataFromLocalStorage("@code");
  console.log(data,'data')
  const payload = {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: REACT_APP_CLIENT_SEVRET,
    grant_type: "authorization_code",
    redirect_uri: REACT_REDIRECT_APP,
  };

  const _client = await axios.post("https://api.intra.42.fr/oauth/token", {
    ...payload,
    code: data,
  });
  console.log({ _client });
  storeDataToLocalStorage(_client.data, "@oauth");
  return _client.data;
};

export const getDataFromLocalStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    console.log(e, "e");
  }
};
export const storeDataToLocalStorage = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e, "e");
  }
};
export const getCreadteClient = async () => {
  const client = await getDataFromLocalStorage("@oauth");
  console.log(client, "client");
  if (client) {
    if (tokenValid(client)) {
      console.log("token");
      return client;
    } else {
      console.log("token2");
      const NewClient = await getUserFromApi();
      return NewClient;
    }
  } else {
    console.log("Ko");
    const NewClient = await getUserFromApi();
    return NewClient;
  }
};
