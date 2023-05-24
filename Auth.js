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

const Auth = ({appIsReady, setAppIsReady}) => {

    const { isUserLoggedIn } = useContext(UserContext);
    
    const [isLoading, setIsLoading] = useState(false);
    //const [isFirstLoading, setIsFirstLoading] = useState(true);

    return (
        <>
            <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
                {
                    isUserLoggedIn ? <TabNavigation /> : <UserAuthStack/>
                }
            </LoadingContext.Provider>
        </>
    )
}

export default Auth