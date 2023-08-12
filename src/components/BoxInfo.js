import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
const BoxInfo = ({ label, value, status }) => {
  return (
    <View style={style.BoxInfo}>
      <Text style={style.labelName}>{label}</Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "row",
          marginTop: 5,
        }}
      >
        {value && <Text style={style.labelDescrition}>{value}</Text>}

        {status && (
          <View
            style={{
              ...style.boxStatus,
              backgroundColor: status === "s" ? "#ADE792" : "#DD5353",
            }}
          >
            <Text style={{ color: "white" }}>
              {status === "s" ? "success" : "fail"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  labelName: {
    fontSize: 14,
    marginTop: 0,
    fontWeight: "700",
  },
  labelDescrition: {
    fontSize: 15,
    color: "#6793CC",
    marginTop: 0,
    marginRight: "auto",
  },
  BoxInfo: {
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  boxStatus: {
    paddingVertical: 1,
    width: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    borderRadius: 6,
  },
});
export default BoxInfo;
