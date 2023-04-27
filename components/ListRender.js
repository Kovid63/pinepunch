import { Image, Text, View, TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";
import React from "react";


export const ListRender = ({ item, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} style={{ width: 160, backgroundColor: '#F8F8F8', borderRadius: 24, paddingVertical: 20, marginHorizontal: 10, marginTop: 10 }}>
            <Image source={{ uri: item.image }} style={{ height: 110, width: '70%', borderRadius: 19, alignSelf: 'center' }} />
            <Text style={{ marginHorizontal: '10%', marginTop: 25, fontFamily: 'Poppins', fontSize: 12 }}>{item.itemName}</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: '5%', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 16, marginLeft: '5%' }}>{'Rs ' + (item.price / item.quantity) + '/Kg'}</Text>
                <TouchableOpacity>
                    <Svg style={{ height: 25, marginTop: 3, width: 25 }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                        <Path
                            d="M16.665 2.01A5.323 5.323 0 0 1 20.591 3.4a5.381 5.381 0 0 1 1.399 3.936v9.33a5.373 5.373 0 0 1-1.389 3.936 5.346 5.346 0 0 1-3.936 1.389h-9.33A5.332 5.332 0 0 1 3.399 20.6a5.332 5.332 0 0 1-1.389-3.936v-9.33A5.332 5.332 0 0 1 3.4 3.399 5.332 5.332 0 0 1 7.335 2.01Zm-.26 4.566a1.58 1.58 0 0 0-2.237 0l-.67.679c-.1.1-.1.27 0 .37l.055.054.246.244.497.496.605.604c.126.126.21.211.216.22.11.12.18.28.18.46 0 .359-.29.659-.66.659-.17 0-.33-.07-.44-.18L12.53 8.524a.217.217 0 0 0-.3 0l-4.765 4.765a1.8 1.8 0 0 0-.53 1.238l-.06 2.368c0 .13.04.25.13.34.09.09.21.14.34.14h2.347c.48 0 .94-.19 1.29-.53l6.722-6.743c.61-.62.61-1.618 0-2.228Z"
                            fill="#130F26"
                            fillRule="nonzero"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}