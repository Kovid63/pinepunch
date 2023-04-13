import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home/Home";
import Product from "../screens/home/Product";
import Search from "../screens/home/Search";

export const HomeStack = () => {

    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }

    return (
        <Stack.Navigator screenOptions={options} initialRouteName="Search">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    )
}