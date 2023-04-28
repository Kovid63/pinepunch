import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../colors'
import { BASE_URL, ITEMS } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native'
import { Alert } from 'react-native'
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { RefreshControl } from 'react-native';

const ProductDraft = ({navigation}) => {

  const [draftProducts, setDraftProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchDrafts() {
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    const response = await fetch(BASE_URL + ITEMS + `?status=draft`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-USER-SESSION-ID": sessionId
      },
    })

    const data = await response.json();

    if (data.error) {
      if (Platform.OS === 'android') {
        return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
      }
      else {
        return Alert.alert(data.error.description);
      }
    }

    setDraftProducts(data.items);

  }

  function editDraftHandler(product){
    navigation.navigate('FillProduct', {product, isEdit: true, description_required: true})
  }

  function onRefresh(){
    setRefreshing(true);
    fetchDrafts();
    setRefreshing(false);
}

useEffect(() => {
  const focusListener = navigation.addListener('focus', () => {
    fetchDrafts();
  })
  return () => focusListener;
}, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{'Drafts of item to sell'}</Text>
      </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryListContainer}>
        {
          draftProducts.map((draft, index) => (
            <View key={index} style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{draft.catogery_type}</Text>
              <View style={{ flexDirection: 'row', width: '25%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => editDraftHandler(draft)}>
                  <Svg style={{ height: 25, marginTop: 3, width: 25 }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M16.665 2.01A5.323 5.323 0 0 1 20.591 3.4a5.381 5.381 0 0 1 1.399 3.936v9.33a5.373 5.373 0 0 1-1.389 3.936 5.346 5.346 0 0 1-3.936 1.389h-9.33A5.332 5.332 0 0 1 3.399 20.6a5.332 5.332 0 0 1-1.389-3.936v-9.33A5.332 5.332 0 0 1 3.4 3.399 5.332 5.332 0 0 1 7.335 2.01Zm-.26 4.566a1.58 1.58 0 0 0-2.237 0l-.67.679c-.1.1-.1.27 0 .37l.055.054.246.244.497.496.605.604c.126.126.21.211.216.22.11.12.18.28.18.46 0 .359-.29.659-.66.659-.17 0-.33-.07-.44-.18L12.53 8.524a.217.217 0 0 0-.3 0l-4.765 4.765a1.8 1.8 0 0 0-.53 1.238l-.06 2.368c0 .13.04.25.13.34.09.09.21.14.34.14h2.347c.48 0 .94-.19 1.29-.53l6.722-6.743c.61-.62.61-1.618 0-2.228Z"
                      fill="#130F26"
                      fillRule="nonzero"
                    />
                  </Svg>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Svg style={{ height: 25, marginTop: 3, width: 25 }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                    <Path
                      fill="#000"
                      fillRule="nonzero"
                      d="M18.94 8.697c.198 0 .38.087.522.234.134.157.2.352.181.558 0 .068-.533 6.808-.837 9.645-.19 1.741-1.313 2.798-2.997 2.827-1.294.029-2.56.039-3.805.039-1.323 0-2.616-.01-3.872-.039-1.627-.039-2.75-1.115-2.931-2.827-.313-2.847-.837-9.577-.846-9.645a.79.79 0 0 1 .19-.558.706.706 0 0 1 .524-.234h13.87ZM14.064 2c.884 0 1.673.617 1.902 1.497l.163.73a1.28 1.28 0 0 0 1.241 1.016h2.916c.39 0 .713.323.713.734v.38a.73.73 0 0 1-.713.734H3.714A.73.73 0 0 1 3 6.357v-.38c0-.411.324-.734.714-.734H6.63c.592 0 1.107-.421 1.24-1.015l.153-.682C8.261 2.617 9.041 2 9.935 2Z"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>
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
    paddingHorizontal: '5%',
  },

  heading: {
    marginTop: '20%',
    marginHorizontal: '3%'
  },

  headingText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 17
  },
  categoryListContainer: {
    marginHorizontal: '3%',
    paddingBottom: 90
  },

  categoryContainer: {
    height: 50,
    backgroundColor: '#F8F8F8',
    marginTop: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%'
  },

  categoryText: {
    fontFamily: 'Poppins',
    color: '#B3B1B0'
  },
})

export default ProductDraft