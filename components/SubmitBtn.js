import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../colors'

const SubmitBtn = ({ active, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={active? false : true} activeOpacity={active ? 0.5 : 1} style={[styles.container, active ? { backgroundColor: colors.primary[0] } : { backgroundColor: colors.black[5] }]}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  container: {
    width: '95%',
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