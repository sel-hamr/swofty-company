import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import BoxInfo from "../components/BoxInfo";
import Switch from "../components/Switch";
import { UserContext } from "../context";

const Detail = ({ navigation }) => {
  const { user } = React.useContext(UserContext);
  const [tabsSelect, setTabSelect] = React.useState(0);
  const listItem = ["info", "projects", "skills"];
  const listInfo = [
    { value: user?.displayname || "", label: "Full name", id: 1 },
    { value: user?.phone || "", label: "phone", id: 2 },
    { value: user?.campus?.[0]?.name || "", label: "campus", id: 3 },
    { value: user?.email || "", label: "email", id: 4 },
    { value: `${user?.pool_month}-${user?.pool_year}`, label: "pool", id: 5 },
    { value: user?.wallet || "0", label: "wallet", id: 6 },
  ];
  const listProgect = user?.projects_users.filter(
    (item) => item.status === "finished"
  );
  const isInfo = tabsSelect === 0;
  const isProjects = tabsSelect === 1;
  const isSkills = tabsSelect === 2;
  return (
    <View style={style.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "90%",
          marginHorizontal: "auto",
        }}
      >
        <View style={style.container}>
          {user?.image?.link && (
            <Image
              style={style.imageProfile}
              source={{
                uri: user.image.link,
              }}
            />
          )}
          {user?.login && <Text style={style.labelLogin}>{user.login}</Text>}
          {user?.email && <Text style={style.labelEmail}>{user.email}</Text>}
        </View>
        <Switch
          setTabSelect={setTabSelect}
          tabsSelect={tabsSelect}
          listItem={listItem}
        />
        {isInfo &&
          listInfo.map((item, index) => (
            <BoxInfo value={item.value} label={item.label} key={index} />
          ))}
        {isProjects &&
          listProgect.map((item, index) => (
            <BoxInfo
              value={`score ${item?.final_mark ? item.final_mark : "0"}`}
              label={`${item.project.name} (${item.project.slug})`}
              status={item?.["validated?"] ? "s" : "f"}
              key={index}
            />
          ))}
        {isSkills &&
          user?.cursus_users?.map((cursus) => {
            return cursus.skills.map((list, index) => (
              <BoxInfo value={list.level} label={list.name} key={index} />
            ));
          })}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  imageProfile: {
    width: 150,
    height: 150,
    borderRadius: 15,
    backgroundColor: "#d0d0c0",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    width: "100%",
    margin: "auto",
    paddingTop: 10,
    paddingBottom: 10,
  },
  root: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
  labelLogin: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 8,
  },
  labelEmail: {
    fontSize: 15,
    color: "#6793CC",
    marginTop: 0,
  },
});
export default Detail;
