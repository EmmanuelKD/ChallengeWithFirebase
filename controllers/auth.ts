import { User } from "../schema/User"
import FirebaseServices from "../services/firebaseServices";
import IDBservices from "../services/iDbServices";
import { Preference, preferenceUsr } from "../services/preference";
 

export default class Auth extends Preference  {
    store: IDBservices = new FirebaseServices()


    signin = async (email: string, password: string) => {
        return await this.store?.signin(email, password);
    }

    singUp = (user: User) => {
       return this.store?.singUp(user);
    }

    signOut = () => {
        this.store?.signOut();

    }

    currentUser = async (): Promise<User | null> => {

        var user: preferenceUsr | null = await this.getUserPreference();
        if (user == null)
            return null;

        var _user = new User()
        _user.id = user.id;
        _user.name = user.userName;
        _user.id = user.id;
        _user.email = user.email;

        return _user;

    }

    onAuthStateChanged = async (onAuthStateChanged: any) => {
        if (this.store instanceof FirebaseServices) {
            const subscriber = this.store.onAuthStateChanged(onAuthStateChanged);
        } else {

        }


    }

}

// "@react-native-firebase/app": "^13.1.0",
// "@react-native-firebase/auth": "^13.1.0",
// "@react-native-firebase/firestore": "^13.1.0",