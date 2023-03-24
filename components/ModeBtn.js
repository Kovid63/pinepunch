import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../colors';
import { ModeContext } from '../contexts/ModeContext';
import { TouchableOpacity } from 'react-native';
import { MODE_BUYER, MODE_SELLER } from '../constants';

const ModeBtn = () => {

  const {mode, setMode} = useContext(ModeContext);

  function modeChangeHandler(mode){
    setMode(mode)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => modeChangeHandler(MODE_BUYER)} activeOpacity={0.5} style={[styles.mode, mode == MODE_BUYER? {backgroundColor: colors.primary[0]}:{}]}>
        <Text style={[styles.modeText, mode == MODE_BUYER? {color: colors.offWhite[1]}:{color: colors.black[4]}]}>{'Buyer Mode'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => modeChangeHandler(MODE_SELLER)} activeOpacity={0.5} style={[styles.mode, mode == MODE_SELLER? {backgroundColor: colors.primary[0]}:{}]}>
        <Text style={[styles.modeText, mode == MODE_SELLER? {color: colors.offWhite[1]}:{color: colors.black[4]}]}>{'Seller Mode'}</Text>
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