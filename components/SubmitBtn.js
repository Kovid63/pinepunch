import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../colors'

const SubmitBtn = ({ active, text, onPress, outline, fill }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={active? false : true} activeOpacity={active ? 0.5 : 1} style={[styles.container, fill ? { backgroundColor: colors.primary[0] } : outline? { borderColor: colors.primary[0], borderWidth: 1 } : { backgroundColor: colors.black[5] }]}>
      <Text style={[styles.btnText, outline? {color: colors.primary[0]}: {}]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  btnText: {
    fontFamily: 'PoppinsBold',
    fontSize: 18,
    color: '#FFFFFF'
  }
})

export default SubmitBtn