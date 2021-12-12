import React from "react";
import { AppProps, AppState } from "./App_Types";
import { AppContext } from "./AppContext";
import { NetInfoChangeHandler } from "@react-native-community/netinfo";
import listenerForNetworkChange from "../../services/networkChecker";
import { Transaction } from "../../schema/Transactions";


class AppContextProvider extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    // const { db, App, getDocs } = initializeApp();

    this.state = {
      networkAvailable: false,
      transactions: []
    };
  }

  handleConnictivityChange = (netStat: any) => {
    if (netStat.isConnected) {
      this.setState(prev => ({ ...prev, networkAvailable: true }));
      alert("online")
    } else {
      this.setState(prev => ({ ...prev, networkAvailable: false }))
      alert("offline")
    }

  }
  componentDidMount() {
    listenerForNetworkChange(this.handleConnictivityChange)
    this.loadLocalTransactions()
  }
  lodeStoreTransactions = (transaction) => {
    this.setState(prev => ({ ...prev, transactions: transaction }))
  }

  updateTransactions = (transaction: Transaction) => {
    var _transaction: Array<Transaction> = this.state.transactions;
    _transaction.push(transaction);
    this.setState(prev => ({ ...prev, transactions: [..._transaction] }))
  }

  loadLocalTransactions = () => {
    // load all transactions form sqlite
  }


  SignUp = async () => {

  }
  updateTransactionsById = (id: string, transaction: Transaction) => {


    var _transaction: Array<Transaction> = this.state.transactions;
    var tra: Transaction = _transaction.find(i => i.id === id)
    var ind: number = _transaction.indexOf(tra);

    _transaction.splice(ind, 1)

    alert(tra)
    _transaction.push(transaction);
    this.setState(prev => ({ ...prev, transactions: [..._transaction] }))
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          networkAvailable: this.state.networkAvailable,
          transactions: this.state.transactions,
          loadLocalTransactions: this.loadLocalTransactions,
          lodeStoreTransactions: this.lodeStoreTransactions,
          updateTransactions: this.updateTransactions
          , updateTransactionsById: this.updateTransactionsById,

        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppContextConsumer = AppContext.Consumer;
export { AppContextProvider, AppContextConsumer };

