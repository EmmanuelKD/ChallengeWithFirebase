
import { MaterialIcons } from "@expo/vector-icons";
import React from 'react';
import {
  Alert,
  Animated, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeListView } from 'react-native-swipe-list-view';
import { COLORS } from "../constants/Theme";
import { AppContext } from "../context/appContext/AppContext";
import { AppContextType } from "../context/appContext/App_Types";
import { AuthContext } from "../context/authcontext/Auth_Context";
import { AuthContextType } from "../context/authcontext/Auth_Types";
import Auth from "../controllers/auth";
import { StoreOpperations } from "../controllers/store";
import { Transaction, TransactionStatus } from "../schema/Transactions";
import { applyAlpha } from "../utils";
import CustomTextField from "./CustomTextField";
import LoadingButton from "./LoadingButton";
import TransactionList from "./TransactionListItem";



const TransactionScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [transactions, setTransactions] = React.useState<Array<Transaction>>([]);
  const [edittingTransactions, setEdittingTransactions] = React.useState<Transaction>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const store = new StoreOpperations();
  const appContext = React.useContext(AppContext)
  const authContext = React.useContext(AuthContext)

  const updateTransactions = (id: string, transaction: Transaction) => {
    var _transaction: Array<Transaction> = transactions;
    var tra: Transaction = _transaction.find(i => i.id === id)
    var ind: number = _transaction.indexOf(tra);
    _transaction.splice(ind, 1)
    _transaction.push(transaction);
    setTransactions([...transactions, ...appContext.transactions])
  }


  async function init() {
    if (appContext.transactions.length > 0) {
      setTransactions([...transactions, ...appContext.transactions])
      appContext.lodeStoreTransactions([])

    }
    if (transactions.length == 0) {
      setLoading(true)
      var res = await store.loadAllTransaction(authContext.user.id) as Array<Transaction>
      setTransactions([...transactions, ...res]);
      setLoading(false)
    }
  }

  React.useEffect(() => {
    init();
  }, [appContext.transactions])


  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    Alert.alert(
      "Warning: Deleting " + rowKey,
      "on Ok clicked data will be forever gone",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            closeRow(rowMap, rowKey);
            const newData = [...transactions];
            const prevIndex = transactions.findIndex(item => item.id === rowKey);
            newData.splice(prevIndex, 1);
            setTransactions(newData);
            // appContext.lodeStoreTransactions(res)
            var opperations: StoreOpperations = new StoreOpperations();
            opperations.DeleteTransaction(rowKey)

          }
        }
      ]
    );

  };


  const VisibleItem = props => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      leftActionState,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }
    var transaction = data.item as Transaction
    return (

      <Animated.View
        style={[styles.rowFront, { height: rowHeightAnimatedValue }]
        }>

        <TransactionList
          key={data.item.id}
          onClick={() => { }}
          transaction={transaction}
        />

      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(75);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.id)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
      onEdit,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity

            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onEdit}>
            <MaterialIcons name="edit" size={24} color="white" />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialIcons name="delete" size={24} color="white" />

              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(75);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.id)}
        onDelete={() => deleteRow(rowMap, data.item.id)}
        onEdit={() => {
          setEdittingTransactions(data.item)
          setModalVisible(true)
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View style={{
          display: "flex", justifyContent: "space-between", alignContent: "center"
          , flexDirection: "row",
          flexWrap: "nowrap"
          ,
        }}>
          <Text style={{ fontSize: 20, margin: 2, fontWeight: "bold" }}>Transactions</Text>
          <Text style={{ fontSize: 12, margin: 2, color: COLORS.PRI }}>{`<<< swipe for more`}</Text>
        </View>
        <View style={styles.container}>
          <SwipeListView
            data={transactions.map((t) => Transaction.toObject(t))}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            disableRightSwipe

            leftActivationValue={100}
            rightActivationValue={-200}
            leftActionValue={0}
            rightActionValue={-500}

          />
        </View>
        <EditModel
          updateTransactions={(id: string, transaction: Transaction) => updateTransactions(id, transaction)}
          appContext={appContext}
          modalVisible={modalVisible}
          authContext={authContext}
          setModalVisible={(p) => setModalVisible(p)}
          store={store}
          transaction={edittingTransactions}
        />
      </View></SafeAreaView>

  );
};

export default TransactionScreen;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  main: {
    // paddingVertical: 3,
  },
  container: {
    width: "100%",
    height: windowHeight * 0.55,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,

  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 75,
    // margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 75,
    // padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    // margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});



function EditModel(props: {
  updateTransactions: (id: string, transaction: Transaction) => void,
  transaction: Transaction
  store: StoreOpperations,
  modalVisible: boolean,
  authContext: AuthContextType,
  appContext: AppContextType
  setModalVisible: (p: boolean) => void
}) {

  const [to, enterToRef] = React.useState<string | null>(props.transaction?.to)
  const [amount, enterAmount] = React.useState<string | null>(props.transaction?.amount)
  const [pin, enterPin] = React.useState<string | null>(null)
  React.useEffect(() => {

  }, [props.transaction])




  const validate = (): boolean => {
    if (props.transaction?.to??to == null) {
      alert("To empty: please enter any value")
      return false;
    } else

      if (props.transaction?.amount??amount == null) {
        alert("amount empty:please enter any value")
        return false;
      } else

        if (pin == null) {
          alert("pin empty: please enter any value")
          return false;
        } else return true;
    return false;
  };
  return (<View style={{
    // height: windowHeight,
    // width:windowWidth,
    //  backgroundColor:applyAlpha(COLORS.PRI,.5),

    // 
  }}>
    <Modal
      animationType="slide"
      style={{ justifyContent: "center", alignContent: "center", display: "flex" }}
      // transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        props.setModalVisible(!props.modalVisible);
      }}>
      <View
        style={[{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap",
          zIndex: 1,
          // borderWidth: 2,
          // borderColor: "red",
        }]}
      >
        <CustomTextField
          defaultVal={props.transaction?.to}
      
          // ref={toRef}
          style={{ marginTop: 20 }}
          onChange={(val) => {
            enterToRef(val)
          }}
          title="To ref"
          keyboardType="default"
        />
        <CustomTextField
          defaultVal={props.transaction?.amount}

          // ref={amountRef}
          onChange={(val) => {
            enterAmount(val)
          }}
          title="Amount"
          keyboardType="numbers-and-punctuation"
          secureTextEntry={true}
        />
        <CustomTextField
          // ref={pinRef}
          onChange={(val) => {
            enterPin(val)
          }}
          title="Pin"
          keyboardType="visible-password"
          secureTextEntry={true}
        />

        <LoadingButton
          // ref={payRef}
          style={{ marginTop: 20 }}
          title="Update"
          onClick={async () => {

            if (validate()) {
              const transaction = Transaction.fromObject({
                id: props.transaction.id,
                referenceId: "uuid()",
                amount: amount,
                created_at: props.transaction.created_at,
                updated_at: new Date(),
                deleted_at: null,
                from: props.authContext.user?.id,
                to: to,
                status: TransactionStatus.complete
              });

              await props.store.editTransaction(transaction).then((r) => {
                transaction.id = r;
                props.updateTransactions(r, transaction);
                props.setModalVisible(!props.modalVisible);

              }).catch((e) => {
                alert(e);
              })
            }

          }}
        />

        <LoadingButton
          // ref={payRef}
          style={{ marginTop: 20 }}
          title="Cancle"
          onClick={async () => {

            props.setModalVisible(!props.modalVisible);

          }}
        />
      </View>
    </Modal>
  </View>)
}