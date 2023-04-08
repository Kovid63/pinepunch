import * as Font from 'expo-font';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Home from './screens/home/Home';
import { UserAuthStack } from './navigation/UserAuthStack';
import TabNavigation from './navigation/TabNavigation';
import { BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Auth = () => {

    const { isUserLoggedIn, setIsUserLoggedIn, userData, setUserData } = useContext(UserContext);
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Font.loadAsync({
            Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
            PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
            PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
        })
            .then(() => {
                setIsFontLoaded(true)
            });
    }, []);

    useEffect(() => {
        (async function init() {
            const sessionId = await SecureStore.getItemAsync('sessionId');
            if (sessionId) {
                try {
                    fetch(BASE_URL + 'api/v1/merchant/get_details', {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                            "X-USER-SESSION-ID": sessionId
                        }
                    }).then((response) => {
                        return response.json();
                    }).then(async(data) => {
                        setIsLoading(false);
                        if (data.error) {
                           return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
                        }
                        setUserData({...userData, sessionId: data.session_id, merchantStatus: data.merchant_status, merchantId: data.merchant_id});
                        setIsUserLoggedIn(true);
                        const local = await AsyncStorage.getItem('user');
                        console.log(local);
                    })
                } catch (error) {
                    console.log(error);
                }
            }else{
                setIsLoading(false);
            }
        })();
        
    }, [])


    if (!isFontLoaded) {
        return null;
    }

    if(!isLoading) return (
        isUserLoggedIn ? <TabNavigation /> : <UserAuthStack />
    )
}

export default Auth