import { networkConfig } from "../config/network";
import { User } from "../schema/User";
import IDBservices from "./iDbServices"

class Nodeserver implements IDBservices {

    signin = async (email: string, password: string) => {
        await fetch(networkConfig.host + "/auth/signin", {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            })
            //Request Type
        })
    }


    singUp = async (user:User) =>
        await fetch(networkConfig.host + "/auth/signup", {
            method: 'POST',
            body: JSON.stringify(user)})


    signOut = async () => {
         await fetch(networkConfig.host + "/auth/logout", {
            method: 'POST',
            //Request Type
        })
    }

    loadAllTransaction = async () => {
        await fetch(networkConfig.host + "/transaction/getAll", {
            method: 'GET',
            //Request Type
        })
    }


    deleteAllTransaction = async () => {
        await fetch(networkConfig.host + "/transaction/deleteAll", {
            method: 'DELETE',
            //Request Type
        })
    }

    makeTransferTransaction = async () => {
        await fetch(networkConfig.host + "/transaction/makeTransaction", {
            method: 'DELETE',
            //Request Type
        })
    }

    DeleteTransaction = async (id: string) => {
        await fetch(networkConfig.host + "/transaction/delete?" + new URLSearchParams(JSON.stringify({ foo: 'value', bar: 2, }))
            , {
                method: 'DELETE',
            })
    }

    onAuthStateChanged=async(param:Function)=>{

    }
    currentUser=async ()=>{
        return null;// get data from preference
    }

    editTransaction=()=>{
        
    }
}
