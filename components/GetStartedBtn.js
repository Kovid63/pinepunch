import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../colors'

const GetStartedBtn = ({ active }) => {
  return (
    <TouchableOpacity activeOpacity={active ? 0 : 1} style={[styles.container, active ? { backgroundColor: colors.primary[0] } : { backgroundColor: colors.black[5] }]}>
      <Text style={styles.btnText}>Get Started</Text>
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

export default GetStartedBtn