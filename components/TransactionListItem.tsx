import { View, Text } from "react-native";
import { Transaction, TransactionStatus } from "../schema/Transactions";
import React from "react"
type TransactionListProps = {
  transaction: Transaction,
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
            margin: 1,
            width: 8,
            height: 8,
            borderRadius: 100,
            backgroundColor: backgroundColor,
          }}
        ></View>
        <Text style={{ color: backgroundColor, fontSize: 11 }}>{status}</Text>
      </View>
    );
  };
  const Status = ({ sta }: { sta: TransactionStatus }) => {
    switch (sta) {
      case TransactionStatus.complete:
        return <StatusComponent status="Completed" backgroundColor="red" />;
      case TransactionStatus.draft:
        return <StatusComponent status="default" backgroundColor="blue" />;

      case TransactionStatus.fail:
        return <StatusComponent status="fail" backgroundColor="red" />;

      case TransactionStatus.pending:
        return <StatusComponent status="pending" backgroundColor="orange" />;
      default:
        return <StatusComponent status="unknown" backgroundColor="grey" />;
    }
  };

  const { transaction, onClick } = props;

  return (
    <View style={{
      // height:73,
      width: "95%", padding: 10, backgroundColor: "#fff", borderRadius: 5, position: "relative"
    }}>
      <View style={{
        width: "100%", display: "flex",
        justifyContent: "space-between", alignSelf: "center", flexDirection: "row", flexWrap: "nowrap"
      }}>
        <Text style={{ fontSize: 11 }}>{`id:  ${transaction.id}`}</Text>
        <Status sta={transaction.status} />
      </View>
      <View>
        <Text style={{ fontSize: 13 }}>{`Le ${transaction.amount}`}</Text>
      </View>
      <View style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
      }}>
        <View style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap", justifyContent: "center"
          , alignItems: "center"
        }}>

          <Text style={{ fontSize: 11, marginRight: 5, fontWeight: "700" }}>To</Text>
          <Text>{transaction.to}</Text>
        </View>
      </View>
    </View>
  );
}
