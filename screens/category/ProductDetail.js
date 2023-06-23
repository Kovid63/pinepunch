import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { ScrollView } from 'react-native'
import { colors } from '../../colors'
import { Image } from 'react-native'
import SubmitBtn from '../../components/SubmitBtn'
import { ModeContext } from '../../contexts/ModeContext'
import { MODE_BUYER, MODE_SELLER } from '../../constants'
import { BASE_URL, SELLER_ITEMS, FAVORITES, MERCHANT_INFO } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native'
import { Alert } from 'react-native'
import { getImageUrl } from '../../utils/getImageUrl'
import { deleteProduct } from '../../utils/deleteProduct'
import { LoadingContext } from '../../contexts/LoadingContext';
import ProductImage from '../../components/ProductImage'

const ProductDetail = ({ navigation, route }) => {

  const { mode } = useContext(ModeContext);
  const { name, parameters, image, quantity, price, description, unit, categoryType, id, merchantId, isEdit, isDraft, customParameter } = route.params;
  const [favourites, setFavourites] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const [merchantDetails, setMerchantDetails] = useState({});


  console.log(merchantId);

  useEffect(() => {
    getMerchantDetails();
  }, []);

  async function getMerchantDetails(){
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    const response = await fetch(BASE_URL + MERCHANT_INFO + `${merchantId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-USER-SESSION-ID": sessionId
      },
    })

    const data = await response.json();
    setMerchantDetails(data);
  }

  function contactSellerHandler() {
    navigation.navigate('ContactSeller', {...merchantDetails, productId: id});
  }

  function companyClickHandler() {
    navigation.navigate('CompanyPage', merchantDetails);
  }

  function backPressHandler() {
    navigation.goBack();
  }

  async function removeFavourite(itemId) {
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    const response = await fetch(BASE_URL + FAVORITES + `/${itemId}`, {
      method: 'DELETE',
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


    if (Platform.OS === 'android') {

      ToastAndroid.show('removed from favourites', ToastAndroid.LONG);
    }
    else {
      Alert.alert('removed from favourites');
    }

  }

  async function addFavourite(itemId) {
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    const response = await fetch(BASE_URL + FAVORITES + `/${itemId}`, {
      method: 'POST',
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


    if (Platform.OS === 'android') {
      return ToastAndroid.show('added to favourites', ToastAndroid.LONG);
    }
    else {
      return Alert.alert('added to favourites');
    }

  }

  async function productDraftHandler() {
    setIsLoading(true)
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    let paramArr = await parameters.map((parameter) => {
      return { name: parameter.name, value: parameter.value, um: parameter.um }
    });
    customParameter.name.length && customParameter.value.length === 0? paramArr.push(customParameter): {}
    const response = await fetch(BASE_URL + SELLER_ITEMS, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-USER-SESSION-ID": sessionId
      },
      body: JSON.stringify({
        catogery_type: categoryType,
        product_name: name,
        product_description: description,
        quantity: parseInt(quantity),
        quantity_um: unit,
        price: price,
        save_as_draft: true,
        images: image,
        parameters: paramArr
      })
    })

    const data = await response.json();

    if (data.error) {
      setIsLoading(false);
      if (Platform.OS === 'android') {
        return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
      }
      else {
        return Alert.alert(data.error.description);
      }
    }

    setIsLoading(false);
    navigation.popToTop();
    navigation.navigate('EditStack');
  }

  async function deleteProductHandler() {
    setIsLoading(true);
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    deleteProduct(id, sessionId);
    setIsLoading(false);
    navigation.popToTop();
    navigation.navigate('CategoryStack');
  }

  async function deleteProductHandlerDraft(itemId){
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    deleteProduct(itemId, sessionId);
  }

  async function submitProductHandler() {
    setIsLoading(true);
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');

    if(isDraft){
      await deleteProductHandlerDraft(id);
    }

    let imageArray = [];
    for (const img of image) {
      imageArray.push(img);
    }

    if(isEdit && !isDraft){
      let paramArr = await parameters.map((parameter) => {
        return { name: parameter.name, value: parameter.value, um: parameter.um }
      });
      customParameter.name.length && customParameter.value.length === 0? paramArr.push(customParameter): {}
      console.log(paramArr);
      const response = await fetch(BASE_URL + SELLER_ITEMS + '/' + id, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "X-USER-SESSION-ID": sessionId
        },
        body: JSON.stringify({
          catogery_type: categoryType,
          product_name: name,
          product_description: description,
          quantity: parseInt(quantity),
          quantity_um: unit,
          price: price,
          images: imageArray,
          parameters: paramArr
        })
      })
  
      const data = await response.json();
  
      if (data.error) {
        setIsLoading(false);
        if (Platform.OS === 'android') {
          return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
        }
        else {
          return Alert.alert(data.error.description);
        }
      }
      setIsLoading(false);
      navigation.popToTop();
      navigation.navigate('HomeStack');

    }else{
      let paramArr = await parameters.map((parameter) => {
        return { name: parameter.name, value: parameter.value, um: parameter.um }
      });
      customParameter.name.length && customParameter.value.length === 0? paramArr.push(customParameter): {}
      console.log(paramArr);
      const response = await fetch(BASE_URL + SELLER_ITEMS, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-USER-SESSION-ID": sessionId
        },
        body: JSON.stringify({
          catogery_type: categoryType,
          product_name: name,
          product_description: description,
          quantity: parseInt(quantity),
          quantity_um: unit,
          price: price,
          images: imageArray,
          custom_parameter: customParameter,
          parameters: paramArr
        })
      })
  
      const data = await response.json();
  
      if (data.error) {
        setIsLoading(false);
        if (Platform.OS === 'android') {
          return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
        }
        else {
          return Alert.alert(data.error.description);
        }
      }
      setIsLoading(false);
      navigation.popToTop();
      navigation.navigate('HomeStack');
    }
    
    
  }

  async function fetchFavourites() {
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    const response = await fetch(BASE_URL + FAVORITES + `?page=${1}&count=${0}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-USER-SESSION-ID": sessionId
      }
    });

    const data = await response.json();

    if (data.error) {
      if (Platform.OS === 'android') {
        return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
      }
      else {
        return Alert.alert(data.error.description);
      }
    }

    setFavourites(data.items)

  }

  useEffect(() => {
    mode === MODE_BUYER ? fetchFavourites() : <></>;
  }, []);

  useEffect(() => {
    setIsFav(favourites.some(o => o.inventory_item_id == id));
  }, [favourites]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={backPressHandler} style={styles.iconContainer}>
          <Svg style={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M20 25a1 1 0 0 1-.71-.29l-8-8a1 1 0 0 1 0-1.42l8-8a1 1 0 1 1 1.42 1.42L13.41 16l7.3 7.29a1 1 0 0 1 0 1.42A1 1 0 0 1 20 25Z"
              data-name="Layer 2"
              fill={'#000000'}
            />
            <Path
              style={{
                fill: "none",
              }}
              d="M0 0h32v32H0z"
            />
          </Svg>
        </TouchableOpacity>
        <View>
          <Text style={styles.titleText}>{'Product Detail'}</Text>
        </View>
        {mode === MODE_BUYER ? <TouchableOpacity onPress={() => [isFav ? removeFavourite(id) : addFavourite(id), fetchFavourites()]} style={styles.iconContainer}>
          {isFav ? <Svg style={styles.icon} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M8.28 2.5c.63.02 1.24.13 1.83.33h.06c.04.02.07.04.09.06.22.07.43.15.63.26l.38.17c.15.08.33.23.43.29.1.06.21.12.3.19a6.264 6.264 0 0 1 3.85-1.3c.63 0 1.26.09 1.86.29 3.69 1.2 5.02 5.25 3.91 8.79a12.728 12.728 0 0 1-3.01 4.81 38.456 38.456 0 0 1-6.33 4.96l-.25.15-.26-.16a38.094 38.094 0 0 1-6.37-4.96 12.933 12.933 0 0 1-3.01-4.8c-1.13-3.54.2-7.59 3.93-8.81.29-.1.59-.17.89-.21h.12c.28-.04.56-.06.84-.06Zm8.91 3.16a.8.8 0 0 0-1.01.5c-.14.42.08.88.5 1.03.64.24 1.07.87 1.07 1.57v.03a.86.86 0 0 0 .19.62c.14.17.35.27.57.29.41-.01.76-.34.79-.76v-.12a3.3 3.3 0 0 0-2.11-3.16Z"
              fill="#FD9340"
              fillRule="nonzero"
            />
          </Svg> : <Svg style={styles.icon} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M12.235 4.039c1.626-1.028 3.786-1.312 5.652-.714 4.059 1.309 5.319 5.734 4.192 9.255-1.74 5.53-9.166 9.655-9.481 9.828a.743.743 0 0 1-.72.002c-.312-.171-7.685-4.235-9.482-9.829l-.001-.001c-1.128-3.522.128-7.948 4.183-9.255a6.729 6.729 0 0 1 5.657.714Zm-5.197.714c-3.281 1.058-4.105 4.587-3.214 7.37 1.402 4.362 6.94 7.889 8.413 8.762 1.477-.882 7.056-4.448 8.413-8.758.89-2.786.064-6.315-3.222-7.374-1.592-.511-3.45-.2-4.731.792a.75.75 0 0 1-.91.006 5.234 5.234 0 0 0-4.75-.798Zm9.43 1.986a3.525 3.525 0 0 1 2.435 3.075.75.75 0 0 1-1.496.122 2.024 2.024 0 0 0-1.4-1.77.75.75 0 0 1 .46-1.427Z"
              fill="#000000"
              fillRule="evenodd"
            />
          </Svg>}
        </TouchableOpacity> : <View style={{ width: '10%' }} />}
      </View>
      {/* <Image style={{ height: '100%', width: '100%', borderRadius: 24 }} source={{ uri: image }} /> */}
      <ScrollView>
        <View>
          <FlatList horizontal showsHorizontalScrollIndicator={false} pagingEnabled scrollEventThrottle={16} data={image} renderItem={ProductImage} />
        </View>
        <View style={{ flexDirection: 'row', marginTop: '8%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ width: '50%', fontFamily: 'PoppinsSemiBold', fontSize: 17 }}>{name}</Text>
          {!route.params.preview ? <TouchableOpacity onPress={companyClickHandler} style={{ height: 50, maxWidth: '50%', backgroundColor: '#FFFFFF', elevation: 0, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '3%', borderRadius: 16, marginRight: '2%' }}>
            <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 17, color: colors.primary[0], textAlign: 'center' }}>{merchantDetails.name}</Text>
          </TouchableOpacity>
            :
            <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <TouchableOpacity onPress={productDraftHandler} style={{ height: 30, width: '60%', backgroundColor: colors.primary[0], borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'Poppins', color: '#FFFFFF', fontSize: 13 }}>{'Save Draft'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteProductHandler}>
                <Svg style={{ height: 25, marginTop: 3, width: 25 }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                  <Path
                    fill="#000"
                    fillRule="nonzero"
                    d="M18.94 8.697c.198 0 .38.087.522.234.134.157.2.352.181.558 0 .068-.533 6.808-.837 9.645-.19 1.741-1.313 2.798-2.997 2.827-1.294.029-2.56.039-3.805.039-1.323 0-2.616-.01-3.872-.039-1.627-.039-2.75-1.115-2.931-2.827-.313-2.847-.837-9.577-.846-9.645a.79.79 0 0 1 .19-.558.706.706 0 0 1 .524-.234h13.87ZM14.064 2c.884 0 1.673.617 1.902 1.497l.163.73a1.28 1.28 0 0 0 1.241 1.016h2.916c.39 0 .713.323.713.734v.38a.73.73 0 0 1-.713.734H3.714A.73.73 0 0 1 3 6.357v-.38c0-.411.324-.734.714-.734H6.63c.592 0 1.107-.421 1.24-1.015l.153-.682C8.261 2.617 9.041 2 9.935 2Z"
                  />
                </Svg>
              </TouchableOpacity>
            </View>}
        </View>
        <View style={{ width: '60%', marginTop: '1%' }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{description}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '10%', marginTop: '5%' }}>
          <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 18 }}>{quantity + unit}</Text>
          <Text style={{ fontFamily: 'PoppinsSemiBold', fontSize: 18 }}>{'Rs ' + price}</Text>
        </View>
        <View style={styles.submitBtnContainer}>
          <SubmitBtn isLoading={isLoading} onPress={mode === MODE_SELLER ? route.params.preview ? submitProductHandler : contactSellerHandler : contactSellerHandler} fill={true} active={true} text={mode === MODE_BUYER ? 'Contact Seller' : route.params.preview ? 'Submit' : 'Contact Seller'} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: colors.background
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15%',
    justifyContent: 'space-between'
  },

  titleText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 17
  },

  iconContainer: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 15,
    elevation: 1
  },

  icon: {
    height: 30,
    width: 30
  },

  submitBtnContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: '10%'
  }

})

export default ProductDetail