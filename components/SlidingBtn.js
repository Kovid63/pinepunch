import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { colors } from '../colors'

const SlidingBtn = ({ on, setOn }) => {

    function buttonClickHandler(){
        on? setOn(false) : setOn(true)
    }

    return (
        <View style={[{height: 50, width: 80, borderRadius: 25, justifyContent: 'center'}, on? {backgroundColor: colors.primary[0]}:{backgroundColor: '#B3B1B0'}]}>
            <TouchableOpacity onPress={buttonClickHandler} style={[{backgroundColor: '#FFFFFF', width: 45, height: '94%', position: 'absolute', marginHorizontal: '2%', borderRadius: 25}, on? {right: 0}:{left: 0}]}>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default SlidingBtn