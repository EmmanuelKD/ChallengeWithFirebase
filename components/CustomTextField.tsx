import { View, Text, KeyboardTypeOptions } from "react-native";

import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { COLORS } from "../constants/Theme";

type CustomTextFieldProps = {
  title: string;
  secureTextEntry?: boolean;
  style?: object;
  ref?: React.LegacyRef<TextInput> | undefined;
  keyboardType: KeyboardTypeOptions;
  onChange: (text:string) => void;

};
export default function CustomTextField(props: CustomTextFieldProps) {
  
  // const [hideTextval, obscureTet] = React.useState(true);
  const { title, style, keyboardType, secureTextEntry, ref ,onChange} = props;

  return (
    <SafeAreaView style={{ ...style }}>
      <View style={styles.main}>
        <Text style={{ color: COLORS.PRI, fontSize: 12 }}>{title}</Text>
        <TextInput
          ref={ref}
          style={styles.edittext}
           
          onChangeText={onChange}
          // value={text}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={`Enter ${title}`}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: 365,
    height: 81,
    color: COLORS.PRI,
    margin: 12,
    padding: 10,
  },
  edittext: {
    padding: 10,
    borderWidth: 1,
    height: "100%",
    borderRadius: 5,
    borderColor: COLORS.PRI,
  },
});
