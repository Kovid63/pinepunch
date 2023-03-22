import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../colors';
import { ModeContext } from '../contexts/ModeContext';
import { TouchableOpacity } from 'react-native';

const ModeBtn = () => {

  const {mode, setMode} = useContext(ModeContext);

  function modeChangeHandler(mode){
    setMode(mode)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => modeChangeHandler('Buyer')} activeOpacity={0.5} style={[styles.mode, mode == 'Buyer'? {backgroundColor: colors.primary[0]}:{}]}>
        <Text style={[styles.modeText, mode == 'Buyer'? {color: colors.offWhite[1]}:{color: colors.black[4]}]}>{'Buyer Mode'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => modeChangeHandler('Seller')} activeOpacity={0.5} style={[styles.mode, mode == 'Seller'? {backgroundColor: colors.primary[0]}:{}]}>
        <Text style={[styles.modeText, mode == 'Seller'? {color: colors.offWhite[1]}:{color: colors.black[4]}]}>{'Seller Mode'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F8F8F8',
        width: '100%',
        height: 50,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    mode: {
      width: '48%',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90%',
      borderRadius: 25,
    },

    modeText: {
      fontFamily: 'PoppinsSemiBold'
    }
})

export default ModeBtn