import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Profile from '../screens/profile/Profile';
import Settings from "../screens/profile/Settings";

export const ProfileStack = () => {

    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }


    return (
        <Stack.Navigator screenOptions={options} initialRouteName="Settings">
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    )
}