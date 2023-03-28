import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { categories } from '../../category'
import { colors } from '../../colors'

const AddProduct = ({ navigation }) => {

  function categoryClickHandler(category){
    navigation.navigate('FillProduct', category)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.addProductText}>{'Category of item to sell'}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryListContainer}>
        {
          categories.map((category, index) => (
            <TouchableOpacity onPress={() => categoryClickHandler(category)} activeOpacity={0.4} key={index} style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{category.category_name}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    paddingHorizontal: '8%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '15%'
  },

  addProductText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 17
  },

  categoryListContainer: {
    marginHorizontal: '8%',
    paddingBottom: 90
  },

  categoryContainer: {
    height: 50,
    backgroundColor: '#F8F8F8',
    marginTop: 20,
    borderRadius: 16,
    justifyContent: 'center'
  },

  categoryText: {
    fontFamily: 'Poppins',
    marginLeft: '5%',
    color: '#B3B1B0'
  }

})

export default AddProduct;