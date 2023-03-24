import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../colors'

const Button = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: colors.primary[0],
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: '#FFFFFF',
        fontFamily: 'Poppins'
    }
})

export default Button