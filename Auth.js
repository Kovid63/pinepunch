import * as Font from 'expo-font';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import HomeSeller from './screens/home/HomeSeller';
import { UserAuthStack } from './navigation/UserAuthStack';

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
        isUserLoggedIn ? <HomeSeller /> : <UserAuthStack />
    )
}

export default Auth