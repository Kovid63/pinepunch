import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home/Home";
import Product from "../screens/home/Product";
import Search from "../screens/home/Search";
import ProductDetail from "../screens/category/ProductDetail";
import CompanyPage from "../screens/category/CompanyPage";
import ContactSeller from "../screens/category/ContactSeller";
import FillProduct from "../screens/category/FillProduct";
import AccountNotification from "../screens/home/AccountNotification";
import Inquiry from "../screens/home/Inquiry";

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
            <Stack.Screen name="CompanyPage" component={CompanyPage} />
            <Stack.Screen name="ContactSeller" component={ContactSeller} />
            <Stack.Screen name="FillProduct" component={FillProduct} />
            <Stack.Screen name="AccountNotification" component={AccountNotification} />
            <Stack.Screen name="Inquiry" component={Inquiry} />
        </Stack.Navigator>
    )
}