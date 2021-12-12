// import { Block, theme } from "galio-framework";
import React from "react";
// import { List, Paragraph, Subheading } from "react-native-paper";
import {
  Dimensions, SafeAreaView, ScrollView,
  StyleSheet, TextInput, View
} from "react-native";
// import AboutTile from '../components/AboutComponent';
import BottomRignt from "../assets/ReactSvg/ButtomRightStyle";
import CustomTextField from "../components/CustomTextField";
import LoadingButton from "../components/LoadingButton";


const { width, height } = Dimensions.get("screen");

function TransactionView() {

  const fromRef = React.createRef<TextInput>();
  const toRef= React.createRef<TextInput>();
  const amountRef= React.createRef<TextInput>();
  const pinRef= React.createRef<TextInput>();

  const toValue=toRef.current?.state;
  const amountVal=amountRef.current?.state;
  const pinVal= pinRef.current?.state;
  
  // const payRef= React.createRef<TextInput>();

  const validate = (): boolean => {
    const toValue=toRef.current?.state;
    const amountVal=amountRef.current?.state;
    const pinVal= pinRef.current?.state;
     
    if(toValue==null){
      alert("To empty: please enter any value")
      return false;
    }else

    if(amountVal==null){
      alert("amount empty:please enter any value")
      return false;
    }else

    if(pinVal==null){
      alert("pin empty: please enter any value")
      return false;
    }else return true;
    return false;
  };



  return (
    // <NavigationContainer>
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.main}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
            zIndex: 1,
            // borderWidth: 2,
            // borderColor: "red",
          }}
        >
          <CustomTextField
            // ref={toRef}
            style={{ marginTop: 20 }}
            onChange={() => { }}
            title="To ref"
            keyboardType="email-address"
          />
          <CustomTextField
            // ref={amountRef}
            onChange={() => { }}
            title="Amount"
            keyboardType="visible-password"
            secureTextEntry={true}
          />
          <CustomTextField
            // ref={pinRef}
            onChange={() => { }}
            title="Pin"
            keyboardType="visible-password"
            secureTextEntry={true}
          />

          <LoadingButton
            // ref={payRef}
            style={{ marginTop: 20 }}
            title="Pay"
            onClick={() => { }}
          />
        </View>
        <View
          style={{ position: "absolute", bottom: 0, right: 0, zIndex: 0 }}
        >
          <BottomRignt />
        </View>
      </ScrollView>
    </SafeAreaView>
    // </NavigationContainer>

  );

}

const styles = StyleSheet.create({
  main: {
    marginVertical: 50,
    height: "100%",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 42,
  },
});

export default TransactionView;
