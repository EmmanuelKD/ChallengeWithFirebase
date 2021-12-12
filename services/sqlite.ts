import { Asset } from "expo-asset";
import FileSystem from "expo-file-system";
import { Transaction } from "../schema/Transactions";
import IDBservices from "./iDbServices";
import SQLite, { SQLStatementErrorCallback } from "expo-sqlite"

async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.WebSQLDatabase> {

    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }

    await FileSystem.downloadAsync(
        Asset.fromModule(require(pathToDatabaseFile)).uri,
        FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
    );

    return SQLite.openDatabase('firebaseCash.db');
}



export default class SqlIte {
    db: SQLite.WebSQLDatabase
    storTran: Transaction = new Transaction();

    init = async () => {
        this.db = await openDatabase("firebaseCash");
    }
    constructor() {
        this.init().then(() => {
            this.db.transaction(tx => {

                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT,
                referenceId TEXT, from TEXT ,to Text, amount INT,deleted_at STRING,created_at STRING, updated_at STRING,
                status STRING)`
                )
            })
        })

    }

    newTransaction = (transaction: Transaction): Transaction => {


        var _t = { ...Transaction.toObject(transaction), updated_at: transaction.updated_at.toISOString() }

        this.db.transaction(tx => {
            tx.executeSql(`INSERT INTO transactions 
          (id,referenceId , from  ,to , amount ,deleted_at ,created_at , updated_at , status) 
           values (?, ?)`, [_t["id"], _t["referenceId"], _t["from"], _t["to"], _t["amount"], _t["deleted_at"]
                , _t["created_at"], _t["updated_at"], _t["status"]],
                (txObj, resultSet) => transaction.id = resultSet.insertId.toString())
        })
        return transaction;
    }



    loadAllTransaction = async (usersId: string) => {

        var transactions: Array<Transaction> = new Array<Transaction>();

        this.db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM transactions', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    _array.forEach(v => {
                        transactions.push(Transaction.fromObject(v))
                    })
                }
            ) // end executeSQL
        }) // end transaction


        return transactions;

    }

    DeleteTransaction = async (id: string) => {
        var transactions: Array<Transaction> = new Array<Transaction>();
        this.db.transaction(tx => {
            tx.executeSql('DELETE FROM items WHERE id = ? ', [id],
                (txObj, { rows: { _array } }) => {
                    _array.forEach(v => {
                        transactions.push(Transaction.fromObject(v))
                    })
                })
        })
        return transactions;
    }

    updateTransaction = (transaction: Transaction) => {
        this.DeleteTransaction(transaction.id)
        return this.newTransaction(transaction);
    }


}






