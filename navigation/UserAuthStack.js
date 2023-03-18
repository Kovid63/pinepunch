import React, { useEffect, useState } from "react";
import * as Font from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/user-authentication/LoginScreen";

export const UserAuthStack = () => {
    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
    }

    const [isFontLoaded, setIsFontLoaded] = useState(false);

    useEffect(() => {
        Font.loadAsync({
            Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
            PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
            PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
        })
            .then(() => {
                setIsFontLoaded(true)
            });
    }, []);

    if (!isFontLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={options} initialRouteName="LoginScreen">
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}