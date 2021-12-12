import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoadingButton from '../../components/LoadingButton';
import Auth from '../../controllers/auth';
import { Transaction } from '../../schema/Transactions';

const Profile = ({ navigation }) => {

    const auth: Auth = new Auth();

    return (
        <View >
            <LoadingButton
                onClick={() => {
                    auth.signOut()
                    navigation.navigate("SignIn")
                }
                }
                title="Logout"
                style={{ bbackgroundColor: "red" }}
            />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default   Profile
