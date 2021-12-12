// import  from "react";
import React from "react";
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text, TouchableOpacity, View
} from "react-native";
import { COLORS } from "../constants/Theme";
import { applyAlpha } from "../utils";

const { width, height, fontScale } = Dimensions.get("screen");

type LoadingButtonProps = {
  title: string;
  style?: object;
  onClick: () => void;
};
export default function SignupBtn(props: LoadingButtonProps) {
  const { onClick, title, style } = props;
  return (
    <SafeAreaView style={{ ...style }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={async () => {
          onClick();
        }}
      >
        <View style={styles.main}>
          <View style={styles.titleContaier}>
            <Text style={styles.titleText}>{title}</Text>
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
    borderRadius: 5,
    borderColor:COLORS.PRI,
    borderWidth:1,
    backgroundColor:applyAlpha(COLORS.PRI, 0.1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   },
  titleText: { color: COLORS.PRI, fontSize: 17 },
  titleContaier: {},
});
