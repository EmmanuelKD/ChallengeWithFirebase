import { Use } from "react-native-svg";
import { Transaction } from "../schema/Transactions";
import { User } from "../schema/User";
import FirebaseServices from "../services/firebaseServices";
 import IDBservices from "../services/iDbServices";
  
export class StoreOpperations {
    store: IDBservices | null = null;
    
    StoreOpperations() {
        this.store = new FirebaseServices()
    }


    loadAllTransaction = async (usersId: string) => {
        return this.store?.loadAllTransaction(usersId);
    }

    deleteAllTransaction = async (usersId: string) => {
        return this.store?.deleteAllTransaction(usersId);
    }

    makeTransferTransaction = async (transfers: Transaction) => {
        return this.store?.makeTransferTransaction(transfers);
    }

    DeleteTransaction = async (id: string) => {
        return this.store?.DeleteTransaction(id);
    }



}