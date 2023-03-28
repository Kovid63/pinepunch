import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Profile from '../screens/profile/Profile';

export const ProfileStack = () => {

    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }


    return (
        <Stack.Navigator screenOptions={options} initialRouteName="Profile">
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    )
}