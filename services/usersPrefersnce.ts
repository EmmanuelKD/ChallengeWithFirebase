import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export async function saveToPreference(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

export async function getFromValueFor(key: string) {
    return await SecureStore.getItemAsync(key);
}

export async  function removeKey(key: string){
    SecureStore.deleteItemAsync(key)
 }

export async  function checkForPrefersnceAvailability(){
    return await SecureStore.isAvailableAsync();
    
}

