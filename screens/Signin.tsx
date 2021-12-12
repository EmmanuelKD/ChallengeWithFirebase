// import { Block, theme } from "galio-framework";
import React from "react";
// import { List, Paragraph, Subheading } from "react-native-paper";
import {
  Dimensions, SafeAreaView, ScrollView,
  StyleSheet, View
} from "react-native";
import LoginBG from "../assets/ReactSvg/LoginBg";
import CustomTextField from "../components/CustomTextField";
import LoadingButton from "../components/LoadingButton";
import SignupBtn from "../components/signupButton";
import Auth from "../controllers/auth";
const { width, height } = Dimensions.get("screen");
import { AuthContext } from "../context/authcontext/Auth_Context";
import { User } from "../schema/User";

function Signin({ navigation }: { navigation: any }) {

  const authContext = React.useContext(AuthContext);

  const auth: Auth = new Auth()

  const [email, setEmail] = React.useState<string | null>(null)
  const [password, setPassword] = React.useState<string | null>(null)
  function validate() {
    if (email === null) {
      alert("please enter email")
      return false;
    } else if (password === null) {
      alert("please enter Password")
      return false;
    } else return true;
  }
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
          <LoginBG />

          <CustomTextField

            style={{ marginTop: 10 }}
            onChange={(val: string) => {
              setEmail(val)
            }}
            title="Email"
            keyboardType="email-address"
          />
          <CustomTextField

            onChange={(val: string) => {
              setPassword(val)
            }}
            title="Password"
            keyboardType="visible-password"
            secureTextEntry={true}
          />
          <View style={styles.grow}></View>
          <LoadingButton
            style={{ marginTop: 10 }}
            title="Signin"
            onClick={async () => {
              if (validate()) {
                var emailVal = email as string
                var passwordVal = password as string
                return await auth.signin(emailVal, passwordVal).then((r) => {
                  if (r?.user.uid !== undefined) {
                    authContext.setLoginState(true, new User().fromObj({
                      id: r?.user.uid,
                      email: r?.user.email
                    }))
                  }

                });
              }
            }}
          />
          <SignupBtn title="Signup" onClick={() => {
            navigation.navigate("SignUp")
          }} />
        </View>
      </ScrollView>
    </SafeAreaView>
    // </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  grow: {
  },
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

export default Signin;
