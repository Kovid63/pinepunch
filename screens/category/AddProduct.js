import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { colors } from '../../colors'
import { ModeContext } from '../../contexts/ModeContext'
import { MODE_SELLER } from '../../constants'
import { Path, Svg } from 'react-native-svg'
import { getAppSettings } from '../../utils/getAppSettings'

const AddProduct = ({ navigation }) => {

  const { mode } = useContext(ModeContext);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState([]);
  const [properties, setProperties] = useState({});


  function categoryClickHandler(category) {
    navigation.navigate('FillProduct', {
      type: category,
      parameters: mode === MODE_SELLER? properties[category].add_product.parameters_default: properties[category].filters,
      description_required: true
    })
  }

  useEffect(() => {

    const obj = category?.filter(obj => obj.toLowerCase().includes(query.toLowerCase()));
    query.length === 0 ? getFilters() : setCategory(obj);

}, [query]);

async function getFilters(){
  const filters = await getAppSettings();
  setCategory(Object.keys(filters.products));
  setProperties(filters.products);
}

useEffect(() => {
  (async function getFilters(){
    const filters = await getAppSettings();
    setCategory(Object.keys(filters.products));
    setProperties(filters.products);
  })();
} ,[])

  return (
    <View style={styles.container}>
      {mode === MODE_SELLER ? <><View style={styles.header}>
        <View>
          <Text style={styles.headingText}>{'Category of item to sell'}</Text>
        </View>
      </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryListContainer}>
          {
            category.map((category, index) => {
            
              return (
              <TouchableOpacity onPress={() => categoryClickHandler(category)} activeOpacity={0.4} key={index} style={styles.categoryContainer}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            )})
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
            <TextInput value={query} onChangeText={(category) => setQuery(category)}  selectionColor={'#B3B1B0'} style={styles.input} />
            
          </View>
          <View style={styles.header}>
            <Text style={styles.headingText}>{'Category'}</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryListContainer}>
            {
              category.map((category, index) => (
                <TouchableOpacity onPress={() => categoryClickHandler(category)} activeOpacity={0.4} key={index} style={styles.categoryContainer}>
                  <Text style={styles.categoryText}>{category}</Text>
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