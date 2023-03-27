import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '../colors'

const Button = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
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