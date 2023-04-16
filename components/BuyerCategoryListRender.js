import { Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export const BuyerCategoryListRender = ({item, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: 160, backgroundColor: '#F8F8F8', borderRadius: 24, paddingVertical: 20, marginHorizontal: 10, marginTop: 10 }}>
            <Image source={{ uri: item.image }} style={{ height: 110, width: '70%', borderRadius: 19, alignSelf: 'center' }} />
            <Text style={{ marginHorizontal: '10%', marginTop: 25, fontFamily: 'Poppins', fontSize: 12 }}>{item.itemName}</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: '5%', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 16, marginLeft: '5%' }}>{'Rs ' + (item.price / item.quantity) + '/Kg'}</Text>
            </View>
        </TouchableOpacity>
    )
}