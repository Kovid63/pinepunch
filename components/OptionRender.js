import React, { useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { colors } from "../colors"

export const OptionRender = ({ item, onPress, selected }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)} style={[{ paddingVertical: 5, marginHorizontal: 10, width: 28}, selected === item? {backgroundColor: colors.primary[0]} : {backgroundColor: '#FFFFFF',}]}>
            <Text style={[{fontFamily: 'Poppins', textAlign: 'center'}, selected === item? {color: '#FFFFFF'}:{color: '#B3B1B0'}]}>{item}</Text>
        </TouchableOpacity>
    )
}