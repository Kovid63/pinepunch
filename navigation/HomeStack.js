import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home/Home";
import Product from "../screens/home/Product";
import Search from "../screens/home/Search";
import ProductDetail from "../screens/category/ProductDetail";

export const HomeStack = () => {

    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }

    return (
        <Stack.Navigator screenOptions={options} initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
    )
}