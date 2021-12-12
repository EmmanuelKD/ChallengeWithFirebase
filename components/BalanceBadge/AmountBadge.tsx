import React from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import Badge from "../../assets/ReactSvg/Badge";
import RefreshButton from "./RefreshBalanceButton";
type AmountBadgeProps = {
  amountBalance?: string;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AmountBadge(props: AmountBadgeProps) {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.internalContainer}>
          <Text style={styles.text}> 500000</Text>
          <View style={{ position: "absolute", bottom: 18, right: 18 }}>
            <RefreshButton onClick={() => {}} />
          </View>
        </View>
        <Badge></Badge>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    position:"relative",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    paddingVertical:10, 
  },
  text: {
    color: "#fffF",
    fontSize: 32,
    fontWeight: "bold",

    // fontFamily: "Roborto",
  },
  internalContainer: {
    zIndex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  amount: {},
  container: {
    maxWidth: 350,
    width: windowHeight,
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
});
