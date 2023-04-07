import { Text } from "react-native";
import { Dimensions, Image, View } from "react-native";
import { colors } from "../colors";

export const AdRender = ({ item, index }) => {

    const { width } = Dimensions.get('window');

    return(
    <View style={{ alignItems: 'center', marginTop: '5%' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: width }}>
            <Image style={{ height: 150, width: '95%', borderRadius: 41 }} source={{ uri: item.poster }} />
            <View style={{ position: 'absolute', height: 40, width: '45%', backgroundColor: '#FFFFFF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.primary[0], fontFamily: 'PoppinsBold', fontSize: 20 }}>{'50% Discount'}</Text>
            </View>
        </View>
    </View>
)};