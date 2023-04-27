import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Profile from '../screens/profile/Profile';
import Settings from "../screens/profile/Settings";
import Account from "../screens/profile/Account";
import Privacy from "../screens/profile/Privacy";
import Notification from "../screens/profile/Notification";
import FAQ from "../screens/profile/FAQ";
import ChangeEmail from "../screens/profile/ChangeEmail";
import ChangePassword from "../screens/profile/ChangePassword";
import Security from "../screens/profile/Security";

export const ProfileStack = () => {

    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }


    return (
        <Stack.Navigator screenOptions={options} initialRouteName="Profile">
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Security" component={Security} />
            <Stack.Screen name="Change Password" component={ChangePassword} />
            <Stack.Screen name="Change Email" component={ChangeEmail} />
            <Stack.Screen name="FAQ" component={FAQ} />
        </Stack.Navigator>
    )
}