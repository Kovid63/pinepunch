import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import ProductDraft from "../screens/edit/ProductDraft";

export const EditStack = () => {

    const Stack = createStackNavigator();

    const options = {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }


    return (
        <Stack.Navigator screenOptions={options} initialRouteName="ProductDraft">
            <Stack.Screen name="ProductDraft" component={ProductDraft} />
        </Stack.Navigator>
    )
}