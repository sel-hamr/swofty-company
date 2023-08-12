import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session";
import { StyleSheet, View, Image } from "react-native";
import Image42 from "../assets/Image/42_Logo.png";
import { Button } from "react-native-paper";
import { storeDataToLocalStorage } from "../api/utils";
import { REACT_APP_CLIENT_ID,REACT_REDIRECT_APP } from '@env';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
  tokenEndpoint: "https://api.intra.42.fr/oauth/token",
};

export default function Login({ navigation }) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: REACT_APP_CLIENT_ID,
      redirectUri: REACT_REDIRECT_APP,
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      navigation.navigate("Home");
      storeDataToLocalStorage(code, "@code");
    }
  }, [response]);

  return (
    <View style={style.container}>
      <Image source={Image42} style={style.image} />
      <View>
        <Button
          icon="magnify-expand"
          mode="contained"
          onPress={() => promptAsync()}
          buttonColor="#1890ff"
          style={style.btnSearch}
          disabled={!request}
        >
          login with 42
        </Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  inputView: {
    width: 300,
  },
  btnSearch: {
    marginTop: 15,
  },
});
