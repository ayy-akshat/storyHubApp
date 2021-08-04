// basically if it is android it will show a toast, otherwise an alert

import { Platform } from "react-native";

export default (message) =>
{
    if (Platform.OS == "android")
    {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    else
    {
        alert(message);
    }
}