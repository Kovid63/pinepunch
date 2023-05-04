import { BASE_URL, IMAGES } from '@env';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';

export async function getImageUrl(image, purpose) {
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    const response = await fetch(BASE_URL + IMAGES, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-USER-SESSION-ID": sessionId
        },
        body: JSON.stringify({
            image_file: image,
            purpose: purpose
        })
    })

    const data = await response.json();

        if (data.error) {
            if (Platform.OS === 'android') {
                return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
            }
            else {
                return Alert.alert(data.error.description);
            }
        }

       return data.image_url;
}