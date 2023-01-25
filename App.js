import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import React from "react";
import Provider from "./src/context";
import Detail from "./src/screens/Detail";
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ title: "Blog" }} initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Stack.Screen
        name="detail"
        component={Detail}
        options={{ title: "detail" }}
      />
    </Stack.Navigator>
  );
}

function MyApp() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default App = () => {
  return (
    <Provider>
      <MyApp />
    </Provider>
  );
};
