import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { categories } from '../../category'
import { colors } from '../../colors'
import { ModeContext } from '../../contexts/ModeContext'
import { MODE_SELLER } from '../../constants'
import { Path, Svg } from 'react-native-svg'

const AddProduct = ({ navigation }) => {

  const { mode } = useContext(ModeContext);

  function categoryClickHandler(category) {
    navigation.navigate('FillProduct', category)
  }

  return (
    <View style={styles.container}>
      {mode === MODE_SELLER ? <><View style={styles.header}>
        <View>
          <Text style={styles.headingText}>{'Category of item to sell'}</Text>
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
        </ScrollView></> :
        <>
          <View style={{
            backgroundColor: '#FFFFFF', alignItems: 'center', marginTop: '20%', height: 50, width: '70%', marginHorizontal: '8%', shadowColor: "#B3B1B0",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
            elevation: 14, borderRadius: 16,
            flexDirection: 'row'
          }}>
            <TextInput selectionColor={'#B3B1B0'} style={styles.input} />
            <TouchableOpacity>
              <Svg
                style={{
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 2,
                  height: 35,
                  width: 35,
                  marginRight: '3%'
                }}
                fill={'#000'}
                viewBox="0 0 25 24"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path d="M16.206 17.266a8.466 8.466 0 0 1-5.456 1.984c-4.691 0-8.5-3.809-8.5-8.5s3.809-8.5 8.5-8.5 8.5 3.809 8.5 8.5a8.466 8.466 0 0 1-1.984 5.456l3.264 3.264a.749.749 0 1 1-1.06 1.06l-3.264-3.264ZM10.75 3.75c3.863 0 7 3.137 7 7s-3.137 7-7 7-7-3.137-7-7 3.137-7 7-7Z" />
              </Svg>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.headingText}>{'Category'}</Text>
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
        </>
      }
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

  headingText: {
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
  },

  input: {
    fontFamily: 'Poppins',
    width: '80%',
    marginLeft: '5%',
    fontSize: 14,
    paddingHorizontal: '3%'
  }

})

export default AddProduct;