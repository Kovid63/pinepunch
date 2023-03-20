import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../colors'

const CheckBox = ({isActive}) => {

  const[active, setActive] = useState(false)

  function clickHandler(){
    active? setActive(false): setActive(true)
  }

  useEffect(() => {
    return () => isActive(!active);
  }, [active])

  return (
      <TouchableOpacity onPress={clickHandler} style={active? styles.boxContainerActive: styles.boxContainer}>
        {active && <View style={styles.box}/>}
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  boxContainerActive: {
    height: 18,
    width: 18,
    borderWidth: 3,
    borderColor: colors.primary[0],
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  boxContainer: {
    height: 18,
    width: 18,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black[5]
  },

  box: {
    height: 8,
    width: 8,
    backgroundColor: colors.primary[0],
    borderRadius: 2,
  },

})

export default CheckBox