import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const Switch = ({ setTabSelect, tabsSelect, listItem }) => {
  return (
    <View style={style.root}>
      {listItem.map((item, key) => (
        <TouchableOpacity
          onPress={() => setTabSelect(key)}
          key={key}
          style={tabsSelect === key ? style.itemActive : style.itemNoActive}
        >
          <Text
            style={
              tabsSelect === key ? { color: "white" } : { color: "#6793CC" }
            }
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const style = StyleSheet.create({
  root: {
    height: 35,
    width: "100%",
    backgroundColor: "#F9F9F9",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: "row",
    overflow: "hidden",
  },

  itemActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6793CC",
  },
  itemNoActive: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Switch;
