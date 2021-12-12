// import { Block, theme } from "galio-framework";
import React from "react";
// import { List, Paragraph, Subheading } from "react-native-paper";
import {
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  SafeAreaView,
} from "react-native";
// import AboutTile from '../components/AboutComponent';

import CustomTextField from "../components/CustomTextField";
import LoginBG from "../assets/ReactSvg/LoginBg";
import LoadingButton from "../components/LoadingButton";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "../controllers/auth";
import { User } from "../schema/User";
import { AuthContext } from "../context/authcontext/Auth_Context";
const { width, height } = Dimensions.get("screen");

function Signup() {
  const authContext = React.useContext(AuthContext);

  const [email, setEmail] = React.useState<string | null>(null)
  const [password, setPassword] = React.useState<string | null>(null)
  const [confirmPassword, setConfirmPassword] = React.useState<string | null>(null)
  const [name, setName] = React.useState<string | null>(null)

  const auth: Auth = new Auth()


  function validate() {
    if (name === "") {
      alert("name empty: please enter name")
      return false;
    } else
      if (email === "") {
        alert("name emali: please enter email")
        return false;
      } else
        if (name === "") {
          alert("name password: please enter password")
          return false;
        } else
          if (password !== confirmPassword) {
            alert("passwords not the same")
            return false;
          }
    return true;

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
            // borderWidth: 2,
            // borderColor: "red",
          }}
        >
          <CustomTextField
            style={{ marginTop: 20 }}
            onChange={(val: string) => {
              // setName(val);

            }}
            title="UsersName"
            keyboardType="default"
          />
          <CustomTextField
            onChange={(val: string) => {
              setEmail(val)

            }}
            title="Email"
            keyboardType="email-address"
            secureTextEntry={true}
          />
          <CustomTextField
            onChange={(val: string) => {
              setPassword(val)

            }}
            title="Password"
            keyboardType="number-pad"
            secureTextEntry={true}
          />
          <CustomTextField
            onChange={(val: string) => {
              setConfirmPassword(val)

            }}
            title="Confirm Password"
            keyboardType="visible-password"
            secureTextEntry={true}
          />
          <LoadingButton
            style={{ marginTop: 20 }}
            title="Done"
            onClick={async () => {
              // alert("click "+email)
              if (validate()) {
                const _user = new User();
                _user.passwordConfirmation = confirmPassword;
                _user.email = email;
                _user.password = password;
                _user.name = name;
                return await auth.singUp(_user).then((r) => {

                  if (r?.user.uid !== undefined) {
                    authContext.setLoginState(true, User.fromObj({
                      id: r?.user.uid,
                      email: r?.user.email
                    }))
                  }

                }).catch((e) => {
                  alert(e)
                });
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
    // </NavigationContainer>

  );

}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "nowrap"
  },
  text: {
    fontSize: 42,
  },
});

export default Signup;
