import { View, Text } from "react-native";
import { TransactionStatus } from "../schema/Transactions";
import React  from "react"
type TransactionListProps = {
  id: string;
  status: TransactionStatus;
  toName: string;
  amount: string;
  onClick: () => void;
};
export default function TransactionList(props: TransactionListProps) {
  const StatusComponent = ({
    status,
    backgroundColor,
  }: {
    status: string;
    backgroundColor: string;
  }) => {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "nowrap",
          }}
      >
        <View
          style={{
            margin:1,
            width: 8,
            height: 8,
            borderRadius: 100,
            backgroundColor: backgroundColor,
          }}
        ></View>
        <Text style={{ color: backgroundColor ,fontSize:11}}>{status}</Text>
      </View>
    );
  };
  const Status = ({sta}:{sta:TransactionStatus}) => {
    switch (sta) {
      case TransactionStatus.complete:
        return <StatusComponent status="Completed" backgroundColor="red" />;
      case TransactionStatus.draft:
        return <StatusComponent status="Completed" backgroundColor="red" />;

      case TransactionStatus.fail:
        return <StatusComponent status="Completed" backgroundColor="red" />;

      case TransactionStatus.pending:
        return <StatusComponent status="Completed" backgroundColor="red" />;
      default:
        return <StatusComponent status="Completed" backgroundColor="red" />;
    }
  };

  const { id, status, toName, amount, onClick } = props;

  return (
    <View style={{width:"95%",padding:10,backgroundColor:"#fff",  borderRadius:5,  margin:5}}>
      <View style={{width:"100%",display:"flex",justifyContent:"space-between",alignSelf:"center",flexDirection:"row",flexWrap:"nowrap"}}>
        <Text style={{fontSize:11}}>{id}</Text>
        <Status sta={status} />
      </View>
      <View  >
        <Text style={{fontSize:20}}>{amount}</Text>
       </View>
       <View style={{
         width:"100%",
         display:"flex",
         justifyContent:"center",
         alignItems:"flex-end"
       }}>
         <View style={{display:"flex",
         flexDirection:"row",
         flexWrap:"nowrap",justifyContent:"center"
         ,alignItems:"center"}}>

        <Text style={{fontSize:11, marginRight:5,fontWeight:"700"}}>To</Text>
        <Text>{toName}</Text>
         </View>
       </View>
    </View>
  );
}
