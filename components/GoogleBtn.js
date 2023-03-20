import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { colors } from '../colors'

const GoogleBtn = () => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
        <View style={styles.content}>
            <Image style={styles.googleLogo} source={require('../assets/google.png')}/>
            <Text style={styles.googleText}>{'Google'}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    container: {
        borderWidth: 1,
        borderColor: colors.black[5],
        height: 60, 
        width: '45%',
        marginLeft: '3%',
        borderRadius: 15,
        justifyContent: 'center'
        
    },

    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: '10%'
    },

    googleLogo: {
        height: 25,
        width: 25
    },

    googleText: {
        color: '#337EFE',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 16
    }
})

export default GoogleBtn