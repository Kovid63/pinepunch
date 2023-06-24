import { BASE_URL, IMAGES } from '@env';
import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';
import mime from "mime";
import axios from 'axios';

export async function getImageUrl(image, purpose, sessionId, setProgress, index) {
    try {
        const formData = new FormData();
        formData.append('image_file', {
            uri: image,
            type: mime.getType(image),
            name: image.split("/").pop()
        });
        formData.append('purpose', purpose);

        // const response = await fetch(BASE_URL + IMAGES, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         "X-USER-SESSION-ID": sessionId
        //     },
        //     body: formData,
        // })

        const response = await axios.post(BASE_URL + IMAGES, formData, {
            onUploadProgress: progressEvent => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                if(progress === 100){
                    setProgress({progress: Math.floor(Math.random() * 41) + 10, index: index});
                }
                // Handle progress update
               // console.log(`Upload Progress: ${progress}%`);
            },

            onDownloadProgress: progressEvent => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (progress === 100 || !progress.isInFinite) {
                    setTimeout(() => {
                      setProgress({progress: 100, index: index});
                    }, 400);
                  }
            },

            headers: {
                "Content-Type": "multipart/form-data",
                "X-USER-SESSION-ID": sessionId
            }
        })


        if (response.data.error) {

            if (Platform.OS === 'android') {
                return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
            }
            else {
                return Alert.alert(data.error.description);
            }
        }

       // console.log(response.data.image_url);

        return response.data.image_url;

    } catch (error) {
        return error.message;
    }

}