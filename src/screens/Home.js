import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import Image42 from "../assets/Image/42_Logo.png";
import api from "../api";
import useAsync from "../hooks/useAsync";
import { UserContext } from "../context";
export default function IndexScreens({ navigation }) {
  const [text, setText] = React.useState("");
  const [openDailog, setOpenDailog] = React.useState(false);
  const { setUser } = React.useContext(UserContext);
  const { run, status, data } = useAsync();
  const isPending = status === "pending";

  React.useEffect(() => {
    const isrejected = status === "rejected";
    const isresolved = status === "resolved";
    if (isresolved) {
      setUser(data);
      navigation.navigate("detail");
    }
    setOpenDailog(isrejected);
    return () => setText("");
  }, [status]);
  return (
    <Provider>
      <View style={style.container}>
        <Image source={Image42} style={style.image} />
        <View style={style.inputView}>
          <TextInput
            label="UserName"
            value={text}
            mode="outlined"
            activeOutlineColor="#1890ff"
            onChangeText={(text) => setText(text)}
          />
        </View>
        <View>
          <Button
            icon="magnify-expand"
            mode="contained"
            onPress={() => run(api.get(`/v2/users/${text}`))}
            buttonColor="#1890ff"
            style={style.btnSearch}
            loading={isPending}
          >
            search
          </Button>
        </View>
      </View>
      <View>
        <Portal>
          <Dialog
            visible={openDailog}
            onDismiss={() => {
              setOpenDailog(false);
            }}
          >
            <Dialog.Title>warning</Dialog.Title>
            <Dialog.Content>
              <Text>this user does not exist</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setOpenDailog(false)}>Okey</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
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
