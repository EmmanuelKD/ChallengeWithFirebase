import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Theme";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


type RefreshIconButtonProps = {
  onClick: () => void;
};
export default function TransferButton(props: RefreshIconButtonProps) {
  return (
    <View style={styles.main}>
      <TouchableNativeFeedback
        style={{ position: "relative" }}
        onPress={() => {
          //   setRippleColor(randomHexColor());
          //   setRippleOverflow(!rippleOverflow);
        }}
        background={TouchableNativeFeedback.Ripple(COLORS.PRI, true, 40)}
      >
        <View style={styles.touchable}>
          <MaterialIcons
            name="send"
            size={40}
            color={"#fff"}
            style={styles.icon}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}


const width=100;
const styles = StyleSheet.create({
  main: {
     
    backgroundColor: COLORS.SEC,
    borderRadius: 100,
    position: "absolute",
    top: 0,
     zIndex: 1,
    
  },
  touchable: {
    borderRadius: 100,
     borderColor: "#fff",
    borderWidth: 5,
    padding: 10,
  },
  icon: {
    transform: [{ rotate: "-30deg" }],
  },
});
