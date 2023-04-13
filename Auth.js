import * as Font from 'expo-font';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { UserAuthStack } from './navigation/UserAuthStack';
import TabNavigation from './navigation/TabNavigation';
import { BASE_URL, GET_DETAILS } from '@env';
import * as SecureStore from 'expo-secure-store';
import { Platform, ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingContext } from './contexts/LoadingContext';

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
            const sessionId = await SecureStore.getItemAsync('SESSION_ID');
            if (sessionId) {
                try {
                    const response = await fetch(BASE_URL + GET_DETAILS, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                            "X-USER-SESSION-ID": sessionId
                        }
                    });

                    const data = await response.json();
                    setIsLoading(false);

                    if (data.error) {
                        if (Platform.OS === 'android') {
                            return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
                        }
                        else {
                            return Alert.alert(data.error.description);
                        }
                    }

                    // const local = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
                    // setUserData(local);
                    setIsUserLoggedIn(true);

                } catch (error) {
                    console.log(error);
                }
            } else {
                setIsLoading(false);
            }
        })();

    }, [])

    if (!isFontLoaded) {
        return null;
    }

    if (!isLoading) return (
        <>
            <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
                {
                    isUserLoggedIn ? <TabNavigation /> : <UserAuthStack />
                }
            </LoadingContext.Provider>
        </>
    )
}

export default Auth