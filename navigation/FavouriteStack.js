import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Favourite from "../screens/favourite/Favourite";

export const FavouriteStack = () => {

    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }


    return (
        <Stack.Navigator screenOptions={options} initialRouteName="Favourite">
            <Stack.Screen name="Favourite" component={Favourite} />
        </Stack.Navigator>
    )
}