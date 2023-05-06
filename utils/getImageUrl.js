import { BASE_URL, IMAGES } from '@env';
import axios from 'axios';
import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';
import mime from "mime";

export async function getImageUrl(image, purpose, sessionId) {
    
        const formData = new FormData();
        formData.append('image_file', {
            uri : image,
            type: mime.getType(image),
            name: image.split("/").pop()
           });
        formData.append('purpose', purpose);

        const response = await fetch(BASE_URL + IMAGES, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
                "X-USER-SESSION-ID": sessionId
            },
            body: formData,
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

        console.log(data.image_url);
        return data.image_url;
}