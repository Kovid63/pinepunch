import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../colors'
import { BASE_URL, SELLER_ITEMS } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native'
import { Alert } from 'react-native'
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { RefreshControl } from 'react-native';
import { deleteProduct } from '../../utils/deleteProduct';
import { Pressable } from 'react-native';

const ProductDraft = ({ navigation }) => {

  const [draftProducts, setDraftProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState({open: false, draftId: null});

  async function fetchDrafts() {
    setRefreshing(true);
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    const response = await fetch(BASE_URL + SELLER_ITEMS + `?status=draft`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-USER-SESSION-ID": sessionId
      },
    })

    const data = await response.json();

    if (data.error) {
      setRefreshing(false);
      if (Platform.OS === 'android') {
        return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
      }
      else {
        return Alert.alert(data.error.description);
      }
    }

    setRefreshing(false);
    setDraftProducts(data.items);

  }

  async function deleteProductHandler(itemId) {
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    deleteProduct(itemId, sessionId);
    onRefresh();
  }

  function editDraftHandler(product) {
    try {
      console.log(product);
      navigation.navigate('FillProduct', { product, isEdit: true, description_required: true, isDraft: true });
    } catch (error) {
      console.log(error.message);
    }

  }

  function onRefresh() {
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
    <>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>{'Drafts of item to sell'}</Text>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryListContainer}>
          {
            draftProducts.map((draft, index) => (
              <TouchableOpacity onPress={() => editDraftHandler(draft)} key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryText}>{draft.catogery_type}</Text>
                </View>
                <TouchableOpacity style={{ marginHorizontal: '8%' }} onPress={() => setModalOpen({open: true, draftId: draft.id})}>
                  <Svg style={{ height: 25, marginTop: 3, width: 25 }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                    <Path
                      fill="#000"
                      fillRule="nonzero"
                      d="M18.94 8.697c.198 0 .38.087.522.234.134.157.2.352.181.558 0 .068-.533 6.808-.837 9.645-.19 1.741-1.313 2.798-2.997 2.827-1.294.029-2.56.039-3.805.039-1.323 0-2.616-.01-3.872-.039-1.627-.039-2.75-1.115-2.931-2.827-.313-2.847-.837-9.577-.846-9.645a.79.79 0 0 1 .19-.558.706.706 0 0 1 .524-.234h13.87ZM14.064 2c.884 0 1.673.617 1.902 1.497l.163.73a1.28 1.28 0 0 0 1.241 1.016h2.916c.39 0 .713.323.713.734v.38a.73.73 0 0 1-.713.734H3.714A.73.73 0 0 1 3 6.357v-.38c0-.411.324-.734.714-.734H6.63c.592 0 1.107-.421 1.24-1.015l.153-.682C8.261 2.617 9.041 2 9.935 2Z"
                    />
                  </Svg>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
      {modalOpen.open && <Pressable onPress={() => {setModalOpen({open: false, draftId: null})}} style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', height: 200, width: 225, borderRadius: 25, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'PoppinsBold', textAlign: 'center', width: '70%' }}>
            {'Are you sure you want to delete?'}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '90%'}}>
          <TouchableOpacity onPress={() => [deleteProductHandler(modalOpen.draftId), setModalOpen({open: false, draftId: null})]} style={{ paddingVertical: 10, paddingHorizontal: '8%', backgroundColor: colors.primary[0], borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Poppins', color: '#FFFFFF', fontSize: 13 }}>{'Delete'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalOpen({open: false, draftId: null})} style={{ paddingVertical: 10, paddingHorizontal: '8%', backgroundColor: colors.black[5], borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Poppins', color: '#b3b1b0', fontSize: 13 }}>{'No'}</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Pressable>}
    </>
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
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    width: '75%'
  },

  categoryText: {
    fontFamily: 'Poppins',
    color: '#B3B1B0'
  },
})

export default ProductDraft