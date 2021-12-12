import React from "react";
import { Transaction } from "../../schema/Transactions";
import { AppContextType } from "./App_Types";
const AppContext = React.createContext<AppContextType>({
  networkAvailable: false,
  transactions: [],
  loadLocalTransactions: () => { },
  lodeStoreTransactions: (data) => { },
  updateTransactions :(transaction) => {},
  updateTransactionsById :(is:string,transaction: Transaction) => {}

});

export { AppContext };
