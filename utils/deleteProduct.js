import { BASE_URL, SELLER_ITEMS } from '@env';
import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';

export async function deleteProduct(itemId, sessionId) {

    const response = await fetch(BASE_URL + SELLER_ITEMS + `/${itemId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "X-USER-SESSION-ID": sessionId
        },
    })

    const data = await response.json();

    if (data.error) {
        if (Platform.OS === 'android') {
           // return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
        }
        else {
          //  return Alert.alert(data.error.description);
        }
    }

}