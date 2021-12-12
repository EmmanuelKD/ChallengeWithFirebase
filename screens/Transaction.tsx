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
import { StoreOpperations } from "../controllers/store";
import { Transaction, TransactionStatus } from "../schema/Transactions";
import { v4 as uuid } from 'uuid';
import { AuthContext } from "../context/authcontext/Auth_Context";
import { User } from "../schema/User";
import { AppContext } from "../context/appContext/AppContext";


const { width, height } = Dimensions.get("screen");

function TransactionView({ navigation }) {
  const authContext = React.useContext(AuthContext);
  const appContext = React.useContext(AppContext);

  const store: StoreOpperations = new StoreOpperations()

  const [to, enterToRef] = React.useState<string | null>(null)
  const [amount, enterAmount] = React.useState<string | null>(null)
  const [pin, enterPin] = React.useState<string | null>(null)



  // const payRef= React.createRef<TextInput>();

  const validate = (): boolean => {


    if (to == null) {
      alert("To empty: please enter any value")
      return false;
    } else

      if (amount == null) {
        alert("amount empty:please enter any value")
        return false;
      } else

        if (pin == null) {
          alert("pin empty: please enter any value")
          return false;
        } else return true;
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
            onChange={(val) => {
              enterToRef(val)
            }}
            title="To ref"
            keyboardType="email-address"
          />
          <CustomTextField
            // ref={amountRef}
            onChange={(val) => {
              enterAmount(val)
            }}
            title="Amount"
            keyboardType="visible-password"
            secureTextEntry={true}
          />
          <CustomTextField
            // ref={pinRef}
            onChange={(val) => {
              enterPin(val)
            }}
            title="Pin"
            keyboardType="visible-password"
            secureTextEntry={true}
          />

          <LoadingButton
            // ref={payRef}
            style={{ marginTop: 20 }}
            title="Pay"
            onClick={async () => {

              if (validate()) {
                const transaction = Transaction.fromObject({
                  id: "uuid()",
                  referenceId: "uuid()",
                  amount: amount,
                  created_at: new Date(),
                  updated_at: new Date(),
                  deleted_at: null,
                  from: authContext.user?.id,
                  to: "uuid()",
                  status: TransactionStatus.complete
                });

                await store.makeTransferTransaction(transaction).then((r) => {
                  transaction.id=r;
                  appContext.updateTransactions(transaction);
                  navigation.navigate("Dashboard")
                }).catch((e) => {
                  alert(e);
                })
              }

            }}
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
