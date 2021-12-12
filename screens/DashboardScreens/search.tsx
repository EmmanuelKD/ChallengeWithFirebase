import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import CustomTextField from '../../components/CustomTextField';
import LoadingButton from '../../components/LoadingButton';
import { COLORS } from '../../constants/Theme';
import { AppContext } from '../../context/appContext/AppContext';
import { AuthContext } from '../../context/authcontext/Auth_Context';
import { StoreOpperations } from '../../controllers/store';
import { Transaction, TransactionStatus } from '../../schema/Transactions';
import { applyAlpha } from '../../utils';

const EditTransaction = (transaction: Transaction) => {

  
 
  
    // const payRef= React.createRef<TextInput>();
  
  
  
  

    return (
        <View >
            
                 <Text >search</Text>
         </View>
    );
};

const styles = StyleSheet.create({
 
});

export default EditTransaction;