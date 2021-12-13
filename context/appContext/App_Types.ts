import { Transaction } from "../../schema/Transactions"

export type AppProps={


}
export type AppContextType={
    networkAvailable:Boolean
    transactions:Array<Transaction>
    loadLocalTransactions:()=>void
    lodeStoreTransactions:(tran:Array<Transaction>)=>void
    updateTransactions :(transaction: Transaction) => void
    updateTransactionsById :(is:string,transaction: Transaction) => void
 
 }

export type AppState={
    transactions:Array<Transaction>
    networkAvailable:Boolean
    pendingTransaction: Array<Transaction>
}