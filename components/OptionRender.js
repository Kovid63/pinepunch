import React, { useState } from "react"
import { Text } from "react-native"
import { View } from "react-native"

export const OptionRender = ({ item }) => {

    const [selected, setSelected] = useState(0)

    return (
        <View style={{ paddingVertical: 5, backgroundColor: '#FFFFFF', marginHorizontal: 10, paddingHorizontal: 10 }}>
            <Text style={{fontFamily: 'Poppins', color: '#B3B1B0'}}>{item}</Text>
        </View>
    )
}