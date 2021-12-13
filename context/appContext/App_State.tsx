import React from "react";
import { AppProps, AppState } from "./App_Types";
import { AppContext } from "./AppContext";
import { NetInfoChangeHandler } from "@react-native-community/netinfo";
import listenerForNetworkChange from "../../services/networkChecker";
import { Transaction } from "../../schema/Transactions";
import Auth from "../../controllers/auth";
import SqlIte from "../../services/sqlite";
import { StoreOpperations } from "../../controllers/store";


class AppContextProvider extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    // const { db, App, getDocs } = initializeApp();

    this.state = {
      networkAvailable: false,
      transactions: [],
      pendingTransaction: []
    };
  }

  uploadPending=()=>{
    if (this.state.pendingTransaction.length > 0) {
      var sqlIte: SqlIte = new SqlIte();

      var store: StoreOpperations = new StoreOpperations();
      this.state.pendingTransaction.forEach(async (t) => {
        await store.makeTransferTransaction(t).then(async (r) => {
          await sqlIte.DeleteTransaction(r).then(r => {
            this.setState(prev => ({ ...prev, pendingTransaction: [...r] }))

          });
        })
      })
    }
  }

  handleConnictivityChange = (netStat: any) => {
    if (netStat.isConnected) {
      this.setState(prev => ({ ...prev, networkAvailable: true }));
      alert("online")
      this.uploadPending();
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

  loadLocalTransactions = async () => {
    // load all transactions form sqlite
    var transaction: Array<Transaction> = await new SqlIte().loadAllTransaction();
    console.log(transaction)
    this.setState(prev => ({ ...prev, pendingTransaction: [...transaction] }))
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

