import React from "react";
import { AppProps, AppState } from "./App_Types";
import { AppContext } from "./AppContext";
import { NetInfoChangeHandler } from "@react-native-community/netinfo";
import listenerForNetworkChange from "../../services/networkChecker";


class AppContextProvider extends React.Component<AppProps, AppState> {
  
  constructor(props: AppProps) {
    super(props);
    // const { db, App, getDocs } = initializeApp();

    this.state = {
      networkAvailable: false,
    };
  }

  handleConnictivityChange = (netStat:any)=> {
    if (netStat.isConnected) {
      this.setState(prev => ({ ...prev, networkAvailable: true }));
      alert("online")
    } else {
      this.setState(prev => ({ ...prev, networkAvailable: false }))
      alert("offline")
    }

  }
  componentDidMount() {
    listenerForNetworkChange(this.handleConnictivityChange)
  }


  SignUp = async () => {

  }
  render() {
    return (
      <AppContext.Provider
        value={{
          networkAvailable: this.state.networkAvailable,

        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppContextConsumer = AppContext.Consumer;
export { AppContextProvider, AppContextConsumer };

