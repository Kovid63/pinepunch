import React, { useEffect, useState } from "react";
import * as Font from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/user-authentication/LoginScreen";
import CreateAccountScreen from "../screens/user-authentication/CreateAccountScreen";

export const UserAuthStack = () => {
    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
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
                <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}