import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { OptionRender } from './OptionRender'
import { TextInput } from 'react-native'

const ProductFillSlot = ({ name, options, product, setProduct }) => {

  const [selectedParameter, setSelectedParameter] = useState(null)

  useEffect(() => {

    let arr = { paramName: name, currentValue: selectedParameter }
    const index = product.findIndex(obj => obj.paramName === arr.paramName);
    if (index === -1) {
      setProduct([...product, arr])
    } else {
      const newArr = [...product];
      newArr.splice(index, 1, arr);
      setProduct(newArr);
    }

  }, [selectedParameter])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <FlatList showsHorizontalScrollIndicator={false} style={{ marginRight: '2%' }} horizontal renderItem={item => (<OptionRender onPress={(item) => setSelectedParameter(item)} selected={selectedParameter} {...item} />)} data={options} />
      <TextInput onFocus={() => { setSelectedParameter(null) }} style={styles.input} onChangeText={(value) => setSelectedParameter(value)} />
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '90%',
    paddingVertical: 5,
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    marginTop: '3%'
  },

  text: {
    fontFamily: 'Poppins',
    color: '#B3B1B0',
    width: '36%'
  },

  input: {
    marginLeft: 2,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: '2%',
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#B3B1B0',
    fontSize: 14,
    width: 50,
    textAlign: 'center',
    paddingVertical: 3
  }

})

export default ProductFillSlot