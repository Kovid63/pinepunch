import * as Font from 'expo-font';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Home from './screens/home/Home';
import { UserAuthStack } from './navigation/UserAuthStack';
import TabNavigation from './navigation/TabNavigation';

const Auth = () => {

    const { isUserLoggedIn } = useContext(UserContext);
    const [isFontLoaded, setIsFontLoaded] = useState(false);

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

    if (!isFontLoaded) {
        return null;
    }

    return (
        isUserLoggedIn ? <TabNavigation /> : <UserAuthStack />
    )
}

export default Auth