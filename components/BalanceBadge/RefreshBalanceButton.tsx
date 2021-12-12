import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {COLORS} from "../../constants/Theme"
type RefreshIconButtonProps = {
  onClick: () => void;
};
export default function RefreshButton(props: RefreshIconButtonProps) {
  return (
    <View style={styles.main}>
      <TouchableNativeFeedback
      style={{position:"relative"}}
        onPress={() => {
          //   setRippleColor(randomHexColor());
          //   setRippleOverflow(!rippleOverflow);
        }}
        background={TouchableNativeFeedback.Ripple(COLORS.PRI, true,20)}
      >
        <View style={styles.touchable}>
          <MaterialIcons name="refresh" size={20} color={COLORS.PRI}/>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    borderRadius: 100,

  },
  touchable: {
    borderRadius: 100,
    backgroundColor: "#fff",
    padding: 10,
    zIndex:21,
  },
  icon: {},
});
