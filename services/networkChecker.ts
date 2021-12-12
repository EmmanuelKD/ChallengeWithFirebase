import NetInfo, { NetInfoChangeHandler } from "@react-native-community/netinfo"

export default function listenerForNetworkChange(handler: NetInfoChangeHandler){
    return NetInfo.addEventListener(handler)
}