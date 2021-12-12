import { networkConfig } from "../config/network";
import IDBservices from "./iDbServices"
import { User } from "../schema/User";
import { Transaction } from "../schema/Transactions";

import firebase from "firebase"


function initializeApp() {

    var firebaseApp = null;
    try {
        const firebaseConfiguration = {
            apiKey: "AIzaSyAJklVoJw14Pu-S0rnLlGKjt1CmOgYBzYg",
            authDomain: "reactnative-9e64f.firebaseapp.com",
            projectId: "reactnative-9e64f",
            storageBucket: "reactnative-9e64f.appspot.com",
            messagingSenderId: "178098401807",
            appId: "1:178098401807:web:275279fe35d75aa537a97a",
            measurementId: "${config.measurementId}"
        }
        firebaseApp = firebase.initializeApp(firebaseConfiguration);
    } catch (e) {
    }
    if (firebaseApp == null) {
        firebaseApp = firebase.app();
    }

    const db = firebaseApp.firestore();
    const auth = firebaseApp.auth()
    return { db, auth }
}


export default class FirebaseServices implements IDBservices {
    collectonName: string = "transactions";
    app = initializeApp();
    auth = this.app.auth;
    db = this.app.db;

    constructor() {

    }

    signin = async (email: string, password: string) => {
        return await this.auth.signInWithEmailAndPassword(email, password).catch((e) => {
            alert(e)
        })

    }


    singUp = async (user: User) => {
        return await this.auth.createUserWithEmailAndPassword(user.email, user.password).then(async (authres) => {
            return await this.db.collection("user").add(User.toObject(user)).
                then((r) => {
                    return authres;
                });
        }).catch((e) => {
            alert(e);
        });
    }


    signOut = async () => {
        return this.auth
            .signOut().catch((e) => {
                alert(e);
            })
    }

    loadAllTransaction = async (usersId: string) => {

        var transactions: Array<Transaction> = new Array<Transaction>();
        await this.db.collection(this.collectonName).where("from", "==", usersId)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        var _data = doc.data()
                        _data.id = doc.id;
                        transactions.push(Transaction.fromObject(_data))
                    }
                });
            });

        await this.db.collection(this.collectonName).where("to", "==", usersId)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        var _data = doc.data()
                        _data.id = doc.id;
                        transactions.push(Transaction.fromObject(_data))
                    }
                });
            });


        return transactions;

    }


    deleteAllTransaction = async (usersId: string) => {
        this.db.collection(this.collectonName).where("to", "==", usersId).where("from", "==", usersId)
            .onSnapshot((snp) => {
                snp.docs.forEach(async (doc) => {
                    if (doc.exists) {
                        if (doc.exists) {
                            await this.db.collection(this.collectonName).doc(doc.id).delete();
                        }
                    }
                })

            })
    }

    makeTransferTransaction = async (transfers: Transaction) => {
        var doc = await this.db.collection(this.collectonName).doc()
        doc.set(Transaction.toObject(transfers));
        // .doc.se(Transaction.toObject(transfers))

        return doc.id;
    }

    editTransaction = async (transfers: Transaction) => {
        var doc = await this.db.collection(this.collectonName).doc(transfers.id)
        doc.set(Transaction.toObject(transfers));
        return doc.id;
    }


    

    DeleteTransaction = async (id: string) => {
        return await this.db.collection(this.collectonName).doc(id).delete();

    }

    onAuthStateChanged = async (onAuthStateChanged: (listener: any) => void) => {
        return await this.auth.onAuthStateChanged(onAuthStateChanged);
    };
    currentUser=async ()=>{
        return   firebase.auth().currentUser
    }

}





