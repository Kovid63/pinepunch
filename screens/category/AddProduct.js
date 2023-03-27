import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'

const AddProduct = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.middle}>
        <View>
          <Text style={styles.addProductText}>{'Category of item to sell'}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  middle: {
    flexDirection: 'row',
    paddingHorizontal: '8%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '15%'
  },

  addProductText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 17
  }

})

export default AddProduct;