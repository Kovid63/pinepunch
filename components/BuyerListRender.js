import { Image, Text, View, TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";
import React, { useEffect, useState } from "react";
import { BASE_URL, FAVORITES } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from "react-native";
import { Alert } from "react-native";

export const BuyerListRender = ({ item, favourite, onPress, favouriteUpdate, imageUri }) => {

    const [isFavUpdateTriggered, setIsUpdateTriggered] = useState(0);
    const [mounted, setMounted] = useState(false);

    async function removeFavourite(itemId){
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        const response = await fetch(BASE_URL + FAVORITES+`/${itemId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "X-USER-SESSION-ID": sessionId
            },
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

        setIsUpdateTriggered(Math.random(0,9));

        if (Platform.OS === 'android') {

            ToastAndroid.show('Item removed', ToastAndroid.LONG);
        }
        else {
            Alert.alert('Item removed');
        }

    }

    async function addFavourite(itemId) {
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        const response = await fetch(BASE_URL + FAVORITES + `/${itemId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-USER-SESSION-ID": sessionId
            },
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

        setIsUpdateTriggered(Math.random(0,9));

        if (Platform.OS === 'android') {
            return ToastAndroid.show('Item added', ToastAndroid.LONG);
        }
        else {
            return Alert.alert('Item added');
        }

    }

    useEffect(()=>{
        if(!mounted) setMounted(true);
        if(mounted) favouriteUpdate();
    }, [isFavUpdateTriggered])

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{ width: 160, backgroundColor: '#F8F8F8', borderRadius: 24, paddingVertical: 20, marginHorizontal: 10, marginTop: 10 }}>
            {favourite ? <TouchableOpacity onPress={() => removeFavourite(item.id)} style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', paddingHorizontal: 10 }}><Svg style={{ height: 25, marginTop: 3, width: 25 }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                <Path
                    d="M8.28 2.5c.63.02 1.24.13 1.83.33h.06c.04.02.07.04.09.06.22.07.43.15.63.26l.38.17c.15.08.33.23.43.29.1.06.21.12.3.19a6.264 6.264 0 0 1 3.85-1.3c.63 0 1.26.09 1.86.29 3.69 1.2 5.02 5.25 3.91 8.79a12.728 12.728 0 0 1-3.01 4.81 38.456 38.456 0 0 1-6.33 4.96l-.25.15-.26-.16a38.094 38.094 0 0 1-6.37-4.96 12.933 12.933 0 0 1-3.01-4.8c-1.13-3.54.2-7.59 3.93-8.81.29-.1.59-.17.89-.21h.12c.28-.04.56-.06.84-.06Zm8.91 3.16a.8.8 0 0 0-1.01.5c-.14.42.08.88.5 1.03.64.24 1.07.87 1.07 1.57v.03a.86.86 0 0 0 .19.62c.14.17.35.27.57.29.41-.01.76-.34.79-.76v-.12a3.3 3.3 0 0 0-2.11-3.16Z"
                    fill="#FD9340"
                    fillRule="nonzero"
                />
            </Svg></TouchableOpacity> : <TouchableOpacity onPress={() => addFavourite(item.id)} style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', paddingHorizontal: 10 }}>
                <Svg style={{ height: 25, marginTop: 3, width: 25 }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                    <Path
                        d="M12.235 4.039c1.626-1.028 3.786-1.312 5.652-.714 4.059 1.309 5.319 5.734 4.192 9.255-1.74 5.53-9.166 9.655-9.481 9.828a.743.743 0 0 1-.72.002c-.312-.171-7.685-4.235-9.482-9.829l-.001-.001c-1.128-3.522.128-7.948 4.183-9.255a6.729 6.729 0 0 1 5.657.714Zm-5.197.714c-3.281 1.058-4.105 4.587-3.214 7.37 1.402 4.362 6.94 7.889 8.413 8.762 1.477-.882 7.056-4.448 8.413-8.758.89-2.786.064-6.315-3.222-7.374-1.592-.511-3.45-.2-4.731.792a.75.75 0 0 1-.91.006 5.234 5.234 0 0 0-4.75-.798Zm9.43 1.986a3.525 3.525 0 0 1 2.435 3.075.75.75 0 0 1-1.496.122 2.024 2.024 0 0 0-1.4-1.77.75.75 0 0 1 .46-1.427Z"
                        fill="#000000"
                        fillRule="evenodd"
                    />
                </Svg>
            </TouchableOpacity>}
            <Image source={{ uri: imageUri }} style={{ height: 110, width: '70%', borderRadius: 19, alignSelf: 'center' }} />
            <Text style={{ marginHorizontal: '10%', marginTop: 25, fontFamily: 'Poppins', fontSize: 12 }}>{item.product_name}</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: '5%', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 16, marginLeft: '5%' }}>{'Rs ' + item.price}</Text>
            </View>
        </TouchableOpacity>
    )
}