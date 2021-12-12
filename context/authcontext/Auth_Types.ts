import { User } from "../../schema/User"

export type AuthProps={


}
export type AuthContextType={
    isAuthenticated:Boolean,
    setLoginState: (isLoged:boolean,user: User)=>void,

}

export type AuthState={
isLoggedIn:Boolean,
user:User|null
}