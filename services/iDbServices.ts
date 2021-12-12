import { Transaction } from "../schema/Transactions";
import { User } from "../schema/User";

export default interface IDBservices {
    signin: (email: string, password: string) => any;
    singUp: (user:User) => any
    signOut: Function
    loadAllTransaction: (usersId:string)=>any,
    deleteAllTransaction: (usersId:string)=>any,
    makeTransferTransaction: (transfers:Transaction)=>any,
    DeleteTransaction: (id: string) => void,
    onAuthStateChanged:(param:any)=>any;
// implimnts all db services and then seperate them into auth an store in controller


}