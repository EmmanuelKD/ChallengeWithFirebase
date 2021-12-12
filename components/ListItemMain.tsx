import React from "react";
import {
  Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View
} from "react-native";
import { Transaction, TransactionStatus } from "../schema/Transactions";
import TransactionList from "./TransactionListItem";
import EmptyAniomation from "../assets/lemptyFilelottie"
import IStoreOpperation from "../controllers/IStoreOpperation";
import { StoreOpperations } from "../controllers/store";
 export default function ListItemMain() {
  const [transactions, setTransactions] = React.useState<Array<Transaction>>([]);

  const store = new StoreOpperations();

 

  if (transactions.length > 1)
    return (
      <SafeAreaView>
        <View style={styles.main}>
          <View>
            <Text style={{ fontSize: 20, margin: 2, fontWeight: "bold" }}>Transactions</Text>
          </View>
          <View style={styles.container}>
            <ScrollView>
              {transactions.map((val, ind) => {
                return (
                  <TransactionList
                    key={val.created_at.toString()}
                    onClick={() => { }}
                    amount={val?.amount}
                    id={val.id}
                    status={TransactionStatus.unknown}
                    toName={val.amount}
                  />
                );
              })}

              {/* <NavButton onClick={()=>{}}/> */}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  return <View style={{
    width: windowWidth, height: windowHeight * .6,
    display: "flex", justifyContent: "center", alignItems: "center"
    // ,backgroundColor:"red"
  }
  }>
    <EmptyAniomation />
  </View>
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({

  main: {
    // paddingVertical: 3,
  },
  container: {
    width: "100%",
    height: windowHeight * 0.55,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
   
  },
});
