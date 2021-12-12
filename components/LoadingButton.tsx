// import  from "react";
import React, { useState } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { View, theme, Card } from 'galio-framework';
import { TouchableOpacity } from "react-native";
// import * as Permissions from 'expo-permissions';
import * as Progress from "react-native-progress";
import { COLORS } from "../constants/Theme";

const { width, height, fontScale } = Dimensions.get("screen");

type LoadingButtonProps = {
  title: string;
  style?: object;
  onClick: () => Promise<void> | void;
};
export default function LoadingButton(props: LoadingButtonProps) {
  const { onClick, title, style } = props;
  const [loading, setLoaing] = useState(false);
  return (
    <SafeAreaView style={{ ...style }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={async () => {
          setLoaing(true);
          await onClick()?.then(() => {
            setLoaing(false);
          });
        }}
      >
        <View style={styles.main}>
          <View style={styles.titleContaier}>
            <Text style={styles.titleText}
            >{title}</Text>
          </View>
          <View style={styles.loadingStatus}>
            <View style={styles.circles}>
              {loading ? (
                <Progress.CircleSnail
                  size={20}
                  style={styles.progress}
                  color={"#fff"}
                  // progress={this.state.progress}
                  thickness={2}
                />
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: 345,
    height: 55,
    margin: 12,
    // padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.SEC,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  titleText: { color: "#fff", fontSize: 17 },
  progress: {
    // width: 50,
    // height: 50,
  },
  circles: {
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  titleContaier: {
    // borderWidth: 2,
    // borderColor: "red",
    // borderStyle: "solid"
  },
  loadingStatus: {
    position: "absolute",
    right: 25,
    // borderWidth: 2,
    // borderColor: "red",
    // borderStyle: "solid"
  },
  containerMain: {
    // height: height * .01,
    // borderWidth: 2,
    // borderColor: "red",
    // borderStyle: "solid"
  },
});
