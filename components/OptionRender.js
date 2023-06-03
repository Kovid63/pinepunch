import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { colors } from "../colors"

export const OptionRender = ({ item, onPress, selected }) => {

    return (
        <TouchableOpacity onPress={() => onPress(item)} style={[{ paddingVertical: 1, marginHorizontal: 10, width: 35}, selected === item? {backgroundColor: '#FFF5EC'} : {backgroundColor: '#FFFFFF',}]}>
            <Text style={{fontFamily: 'Poppins', textAlign: 'center', color: '#B3B1B0'}}>{item}</Text>
        </TouchableOpacity>
    )
}