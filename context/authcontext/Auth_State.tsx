import React from "react";
import Auth from "../../controllers/auth";
import { User } from "../../schema/User";
import { AuthContext } from "./Auth_Context";
import { AuthProps, AuthState } from "./Auth_Types";
class AuthContextProvider extends React.Component<AuthProps, AuthState> {
  auth: Auth = new Auth()
  constructor(props: AuthProps) {
    super(props);


    this.state = {

      isLoggedIn: false,
      user: null,
    };
  }

  init = async () => {
    const _user = await this.auth.currentUser()
    alert(_user?.id)
    if (_user?.id) {
      this.setState(prev => ({ ...prev, isLoggedIn: true, user: _user }))
    }

  }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  onAuthStateChanged = async (user: any) => {
    if (user?.id) {
      this.init();
     } else {
      this.setState(prev => ({ ...prev, isLoggedIn: false, user: null }))
      return true
     }
  }
  componentDidMount() {
    // this.auth.onAuthStateChanged(this.onAuthStateChanged)
    this.init();
  }
  setLoginState= (isLoged:boolean,user: User)=>{

    this.setState(prev => ({ ...prev, isLoggedIn: isLoged, user: user }))

  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.state.isLoggedIn,
          setLoginState: this.setLoginState,
          user:this.state.user,

        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthContextConsumer = AuthContext.Consumer;
export { AuthContextProvider, AuthContextConsumer };

