import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import AddProduct from "../screens/category/AddProduct";
import FillProduct from "../screens/category/FillProduct";

export const CategoryStack = () => {

    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }


    return (
        <Stack.Navigator screenOptions={options} initialRouteName="AddProduct">
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="FillProduct" component={FillProduct} />
        </Stack.Navigator>
    )
}