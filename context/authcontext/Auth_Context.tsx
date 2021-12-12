import React from "react";
import { User } from "../../schema/User";
import { AuthContextType } from "./Auth_Types";
const AuthContext = React.createContext<AuthContextType>({
   isAuthenticated: false,
   setLoginState: (isLoged:boolean,user: User)=>{}
 });
export { AuthContext };
