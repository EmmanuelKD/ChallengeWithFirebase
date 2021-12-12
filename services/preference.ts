import { ACCESS_TOKEN, REFRESH_TOKEN, EMAIL, USER_NAME, USER_ID } from "../constants/preferenceKeys";
import { User } from "../schema/User";
import { checkForPrefersnceAvailability, getFromValueFor, saveToPreference } from "./usersPrefersnce";


export type preferenceUsr = {
    accessToken: string,
    refreshToken: string,
    email: string,
    userName: string,
    id:string
}

export class Preference {
    Preference() {

    }

    saveUserPreference = async (email: string, accessToken: string, refreshToken: string, name: string,id:string) => {
        try {
            if (await checkForPrefersnceAvailability()) {
                await saveToPreference(ACCESS_TOKEN, email);
                await saveToPreference(REFRESH_TOKEN, accessToken);
                await saveToPreference(EMAIL, refreshToken);
                await saveToPreference(USER_NAME, name);
                await saveToPreference(USER_ID, id);
                
                return true;

            }
        } catch (e) {
        }
        return false;

    }



    getUserPreference = async (): Promise<preferenceUsr | null> => {

        try {
            if (await checkForPrefersnceAvailability()) {
                const accessToken = await getFromValueFor(ACCESS_TOKEN) as string
                const refreshToken = await getFromValueFor(REFRESH_TOKEN) as string
                const email = await getFromValueFor(EMAIL) as string
                const userName = await getFromValueFor(USER_NAME) as string
                const id = await getFromValueFor(USER_ID) as string

                return {
                    accessToken,
                    refreshToken,
                    email,
                    userName,
                    id,
                };
            } else {
                alert("fail to save session")
            }
        } catch (e) {

        }

        return null;
    }
}
