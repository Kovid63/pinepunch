import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/user-authentication/LoginScreen";
import CreateAccountScreen from "../screens/user-authentication/CreateAccountScreen";
import ForgotPasswordEmail from "../screens/user-authentication/ForgotPasswordEmail";
import ForgotPasswordWithNewPassword from "../screens/user-authentication/ForgotPasswordWithNewPassword";
import PasswordUpdated from "../screens/user-authentication/PasswordUpdated";
import VerifyEmail from "../screens/user-authentication/VerifyEmail";
import { UserContext } from "../contexts/UserContext";
import Privacy from "../screens/profile/Privacy";

export const UserAuthStack = () => {

    const {initialScreen} = useContext(UserContext);

    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={options} initialRouteName={initialScreen}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
                <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmail} />
                <Stack.Screen name="ForgotPasswordWithNewPassword" component={ForgotPasswordWithNewPassword} />
                <Stack.Screen name="PasswordUpdated" component={PasswordUpdated} />
                <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
                <Stack.Screen name="Privacy" component={Privacy} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}