import React from "react";
import { AppContextType } from "./App_Types";
const AppContext = React.createContext<AppContextType>({
  networkAvailable: false,
 });
export { AppContext };
