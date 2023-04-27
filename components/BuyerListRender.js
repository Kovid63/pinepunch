import { Image, Text, View, TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";
import React from "react";
import { BASE_URL, FAVORITES } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from "react-native";
import { Alert } from "react-native";

export const BuyerListRender = ({ item }) => {

    async function addFavourite(itemId){
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        const response = await fetch(BASE_URL + FAVORITES+ `/${itemId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-USER-SESSION-ID": sessionId
            },
        })
    }

    return (
        <View style={{ width: 160, backgroundColor: '#F8F8F8', borderRadius: 24, paddingVertical: 20, marginHorizontal: 10, marginTop: 10 }}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', paddingHorizontal: 10 }}>
                <Svg style={{ height: 25, marginTop: 3, width: 25 }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                    <Path
                        d="M12.235 4.039c1.626-1.028 3.786-1.312 5.652-.714 4.059 1.309 5.319 5.734 4.192 9.255-1.74 5.53-9.166 9.655-9.481 9.828a.743.743 0 0 1-.72.002c-.312-.171-7.685-4.235-9.482-9.829l-.001-.001c-1.128-3.522.128-7.948 4.183-9.255a6.729 6.729 0 0 1 5.657.714Zm-5.197.714c-3.281 1.058-4.105 4.587-3.214 7.37 1.402 4.362 6.94 7.889 8.413 8.762 1.477-.882 7.056-4.448 8.413-8.758.89-2.786.064-6.315-3.222-7.374-1.592-.511-3.45-.2-4.731.792a.75.75 0 0 1-.91.006 5.234 5.234 0 0 0-4.75-.798Zm9.43 1.986a3.525 3.525 0 0 1 2.435 3.075.75.75 0 0 1-1.496.122 2.024 2.024 0 0 0-1.4-1.77.75.75 0 0 1 .46-1.427Z"
                        fill="#000000"
                        fillRule="evenodd"
                    />
                </Svg>
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={{ height: 110, width: '70%', borderRadius: 19, alignSelf: 'center'}} />
            <Text style={{ marginHorizontal: '10%', marginTop: 25, fontFamily: 'Poppins', fontSize: 12 }}>{item.itemName}</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: '5%', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 16, marginLeft: '5%' }}>{'Rs ' + (item.price / item.quantity) + '/Kg'}</Text>
            </View>
        </View>
    )
}