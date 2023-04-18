import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import AddProduct from "../screens/category/AddProduct";
import FillProduct from "../screens/category/FillProduct";
import ProductDetail from "../screens/category/ProductDetail";
import CompanyPage from "../screens/category/CompanyPage";
import ContactSeller from "../screens/category/ContactSeller";

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
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="CompanyPage" component={CompanyPage} />
            <Stack.Screen name="ContactSeller" component={ContactSeller} />
        </Stack.Navigator>
    )
}