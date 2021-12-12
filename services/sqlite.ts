//  import {
//     Platform
// } from "react-native";
// import { Transaction, TransactionStatus } from "../schema/Transactions";
// import  SQLite from "expo-sqlite"

// const tableName = "transactions";
// const dbName = "t_pay";

// function openDatabase() {
//     if (Platform.OS === "web") {
//         return {
//             transaction: () => {
//                 return {
//                     executeSql: () => { },
//                 };
//             },
//         };
//     }
//     const db = SQLite.openDatabase("t_pay.db");
//     return db;
// }
// const db = openDatabase();



// export async function create(transaction: Transaction, status: TransactionStatus) {

//     const created_at = Date.now();
//     // is text empty?
//     if (transaction === null) {
//         return false;
//     }
//     db.transaction(
//         (tx) => {
//             tx.executeSql(`insert into ${tableName} ( 
//                         created_at,
//                         deleted_at,
//                         updated_at,
//                         amount,from,to,status) values (?,null,null,?,?,?)`, [created_at,
//                 transaction.amount, transaction.from,
//                 transaction.to,
//                 status,
//             ]);

//             tx.executeSql(`select * from ${tableName}`, [], (_, { rows }) =>
//                 console.log(JSON.stringify(rows))
//             );
//         },
//         () => { },
//         () => { }
//     );

// }

// export async function read(onLoadSuccess: (Sparam: SQLite.SQLResultSetRowList) => void) {

//     db.transaction(
//         (tx) => {
//             tx.executeSql(`select * from ${tableName}`, [], (_, { rows }) => {

//                 onLoadSuccess(rows);
//                 console.log(JSON.stringify(rows))

//             }
//             );
//         },
//         () => { },
//         () => { }
//     );

// }

// // update name="name", goo="easy"
// export async function update(affectedRowsValues: string, createdAt: string) {
//     `update ${tableName} set ${affectedRowsValues} where created_at = ${createdAt}`
// }

// export async function deleteData(createdAt: string) {
//     db.transaction(
//         (tx) => {
//             tx.executeSql(`delete from ${tableName} where created_at = ?;`, [createdAt]);
//         },
//         () => { },
//         () => { })
// }

