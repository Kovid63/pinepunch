import { View, Text, TouchableOpacity, FlatList, Image, Dimensions, RefreshControl, Platform } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ModeContext } from '../../contexts/ModeContext';
import ModeBtn from '../../components/ModeBtn';
import { colors } from '../../colors';
import SearchBar from '../../components/SearchBar';
import Svg, { Path } from "react-native-svg"
import Button from '../../components/Button';
import { itemsForSale, scrapForSale } from '../../dummydata/dummydata';
import { ScrollView } from 'react-native';
import { ListRender } from '../../components/ListRender';
import { MODE_BUYER, MODE_SELLER } from '../../constants';
import { homeBuyerAd } from '../../data/homeBuyerAd';
import { AdRender } from '../../components/AdRender';
import { homeCategory } from '../../data/homeCategory';
import { BuyerListRender } from '../../components/BuyerListRender';
import { BASE_URL, BUYER_ITEMS, FAVORITES, SELLER_ITEMS, GET_DETAILS } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native';
import { UserContext } from '../../contexts/UserContext';
import { getAppSettings } from '../../utils/getAppSettings';

const Home = ({ navigation }) => {

  const { mode } = useContext(ModeContext);
  const { setUserData, setIsUserLoggedIn } = useContext(UserContext)
  const { width } = Dimensions.get('window');

  const [adIndex, setAdIndex] = useState(0);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [notificationCount, setNotificationCount] = useState('0');

  const adRef = useRef();

  async function getNotificationCount() {
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    try {
      const response = await fetch(BASE_URL + GET_DETAILS, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-USER-SESSION-ID": sessionId
        }
      });

      const data = await response.json();

      if (data.error) {
        if (Platform.OS === 'android') {
          //return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
        }
        else {
          //return Alert.alert(data.error.description);
        }
      }

      setNotificationCount(data.unseen_notifications_count);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async function getFilters() {
      const filters = await getAppSettings();
      setCategory(Object.keys(filters.products));
    })();

  }, [])

  // useEffect(() => {
  //   setSelectedCategory(category[0]);
  // }, [category])

  function showAllProductHandler() {
    if (refreshing) return;
    navigation.navigate('Product', {
      products: mode === MODE_SELLER ? sellerProducts : products
    });
  }

  function addProductHandler() {
    navigation.navigate('CategoryStack');
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

  async function fetchProducts(category, count) {
    setRefreshing(true);
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    const response = await fetch(BASE_URL + BUYER_ITEMS + `?${category?.length === 0? ``: `catogery_type=${category}`}&count=${count}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-USER-SESSION-ID": sessionId
      },
    })

    const data = await response.json();
    setRefreshing(false);
    if (data.error) {
      if (Platform.OS === 'android') {
        //return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
      }
      else {
        // return Alert.alert(data.error.description);
      }
    }
    console.log(data);
    setProducts(data.items);
  }

  const onMomentumScrollEndHandler = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x; // get the x-axis offset of the content
    const viewSize = event.nativeEvent.layoutMeasurement.width; // get the width of the viewport
    const index = Math.round(contentOffset / viewSize); // calculate the index of the item closest to the center of the screen
    setAdIndex(index);
  };

  function scrollToIndex(index) {
    // Get the offset of the item at the given index
    const offset = index * width;
    // Use the scrollToOffset method to scroll to the desired offset
    setAdIndex(index);
    adRef.current.scrollToOffset({ offset, animated: true });
  };

  function onSelectCategoryHandler(item) {
    selectedCategory === item ? [setSelectedCategory(''), fetchProducts('', 0)] : [setSelectedCategory(item), fetchProducts(item, 0)];
  }

  function searchBarHandler() {
    navigation.navigate('Search');
  }

  function categoryPageLaunchHandler() {
    navigation.navigate('CategoryStack');
  }

  async function onRefresh() {
    setRefreshing(true);
    await fetchProducts(selectedCategory, 0);
    await fetchFavourites();
    setRefreshing(false);
  }

  async function fetchSellerProducts() {
    const sessionId = await SecureStore.getItemAsync('SESSION_ID');
    const response = await fetch(BASE_URL + SELLER_ITEMS + `?status=active`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-USER-SESSION-ID": sessionId
      },
    })

    const data = await response.json();

    if (data.error) {

      if (Platform.OS === 'android') {

      }
      else {

      }
    }

    setSellerProducts(data.items);
  }

  function editDraftHandler(product) {
    navigation.navigate('FillProduct', { product, isEdit: true, description_required: true })
  }

  useEffect(() => {
    if (mode === MODE_BUYER) {
      var currentIndex = adIndex;
      const adInterval = setInterval(() => {
        currentIndex < homeBuyerAd.length - 1 ? currentIndex += 1 : currentIndex = 0;
        scrollToIndex(currentIndex);
      }, 10000);
      return () => clearInterval(adInterval);
    }
  }, [mode])

  useEffect(() => {
    mode === MODE_BUYER ? [fetchProducts(selectedCategory, 0), fetchFavourites()] : fetchSellerProducts();
  }, [mode]);


  // useEffect(() => {
  //   fetchProducts(selectedCategory, 0);
  // }, [selectedCategory]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      //onRefresh();
      fetchSellerProducts();
      getNotificationCount();
      // (async function getFilters() {
      //   const filters = await getAppSettings();
      //   setCategory(Object.keys(filters.products));
      // })();
      //setSelectedCategory(selectedCategory);
      //fetchProducts(selectedCategory, 0);
    })
    return () => focusListener;
  }, [navigation])

  return (
    <View key={refreshing} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.modeBtnContainer}>
          <ModeBtn />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AccountNotification')} style={styles.bellIconContainer}>
          <View style={{ paddingHorizontal: 2, height: 10, backgroundColor: colors.primary[0], alignSelf: 'flex-end', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 7, color: 'white', fontFamily: 'Poppins' }}>{notificationCount}</Text>
          </View>
          <Svg style={styles.bellIcon} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M10.324 20.106c.518.577 1.183.894 1.873.894h.001c.693 0 1.361-.317 1.88-.895a.75.75 0 0 1 1.115 1.004c-.808.897-1.87 1.391-2.995 1.391h-.002c-1.12-.001-2.182-.495-2.987-1.392a.749.749 0 1 1 1.115-1.002ZM12.247 1c4.445 0 7.431 3.462 7.431 6.695 0 1.663.423 2.368.872 3.116.444.738.947 1.576.947 3.16-.349 4.047-4.574 4.377-9.25 4.377S3.345 18.018 3 14.035c-.003-1.648.5-2.486.944-3.224l.157-.264c.386-.663.715-1.385.715-2.852C4.816 4.462 7.802 1 12.247 1Zm0 1.5c-3.495 0-5.93 2.738-5.93 5.195 0 2.079-.578 3.04-1.088 3.888-.409.681-.732 1.219-.732 2.388.167 1.886 1.412 2.877 7.75 2.877 6.303 0 7.587-1.035 7.753-2.942-.003-1.104-.326-1.642-.735-2.323-.51-.848-1.087-1.809-1.087-3.888 0-2.457-2.436-5.195-5.93-5.195Z"
              fill="#000"
              fillRule="evenodd"
            />
          </Svg>
        </TouchableOpacity>
      </View>
      {mode === MODE_SELLER ?
        <>
          <View style={styles.listContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              key={mode}
              refreshControl={<RefreshControl refreshing={refreshing} />}
              data={sellerProducts}
              ListHeaderComponent={<>
                <View style={styles.addProductTextContainer}>
                  <Text style={styles.headingText}>{'Add a product to sell'}</Text>
                </View>
                <View style={styles.addBtnContainer}>
                  <Button onPress={addProductHandler} text={'Add'} />
                </View>
                <View showsVerticalScrollIndicator={false} style={{ marginTop: '5%' }}>
                  <View style={styles.middle}>
                    <View>
                      <Text style={styles.headingText}>{'Items for sale'}</Text>
                    </View>
                    <Text onPress={showAllProductHandler} style={styles.viewAllText}>{'View All'}</Text>
                  </View>
                </View>
              </>}
              columnWrapperStyle={{justifyContent: 'center'}}
              numColumns={2}
              renderItem={(item) => <ListRender onPress={() => editDraftHandler(item.item)} {...item} onPressEdit={() => editDraftHandler(item.item)} imageUri={item.item.images?.toString()?.replace(/\[/g, '')?.replace(/\]/g, '')?.replace(/"/g, '')?.replace(/\\/g, '')?.split(',')[0]} />} />
          </View>
          {/* <View style={styles.middle}>
              <View>
                <Text style={styles.headingText}>{'Scrap for sale'}</Text>
              </View>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                contentContainerStyle={{ paddingBottom: 90 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={scrapForSale}
                renderItem={(item) => <ListRender onPress={() => navigation.navigate('ProductDetail', {
                  preview: false
                })} {...item} />} />
            </View> */}
        </>
        :
        <>

          <View>

            <View style={styles.listContainer}>
              <FlatList
                contentContainerStyle={{ paddingBottom: 190 }}
                showsVerticalScrollIndicator={false}
                data={products}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                key={mode}
                ListHeaderComponent={<><View>
                  <FlatList
                    ref={adRef}
                    key={mode}
                    horizontal
                    data={homeBuyerAd}
                    renderItem={AdRender}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={onMomentumScrollEndHandler} />
                </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '-4%', marginBottom: '5%' }}>
                    {
                      homeBuyerAd.map((banner, index) => (
                        <View key={index} style={[{ height: 10, width: 10, borderRadius: 5, marginHorizontal: 5 }, index === adIndex ? { backgroundColor: 'white' } : { backgroundColor: '#D9D9D9' }]} />
                      ))
                    }
                  </View><View style={styles.middle}>
                    <View>
                      <Text style={styles.headingText}>{'Category'}</Text>
                    </View>
                    <Text onPress={categoryPageLaunchHandler} style={styles.viewAllText}>{'View All'}</Text>
                  </View>
                  <View style={{ marginTop: '5%' }}>
                    <FlatList key={mode} horizontal showsHorizontalScrollIndicator={false} data={category} renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => onSelectCategoryHandler(item)} activeOpacity={0.7} style={[{ height: 50, paddingHorizontal: 15, marginLeft: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }, selectedCategory === item ? { backgroundColor: colors.primary[0] } : { backgroundColor: '#F8F8F8' }]}>
                          <Text style={[{ fontFamily: 'Poppins' }, selectedCategory === item ? { color: '#FFFFFF' } : { color: '#B3B1B0' }]}>{item}</Text>
                        </TouchableOpacity>
                      )
                    }} />
                  </View>
                  <View style={styles.middle}>
                    <View>
                      <Text style={styles.headingText}>{'Listed Items'}</Text>
                    </View>
                    {/* <Text onPress={showAllProductHandler} style={styles.viewAllText}>{'View All'}</Text> */}
                  </View></>}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'center'}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => {
                  const isFav = favourites.some(o => o.inventory_item_id == item.item.id);
                  return (
                    <BuyerListRender imageUri={item.item.images?.toString()?.replace(/\[/g, '')?.replace(/\]/g, '')?.replace(/"/g, '')?.replace(/\\/g, '')?.split(',')[0]} {...item} favouriteUpdate={onRefresh} favourite={isFav} onPress={() => navigation.navigate('ProductDetail', {
                      preview: false,
                      name: item.item.product_name,
                      description: item.item.product_description,
                      price: item.item.price,
                      quantity: item.item.quantity,
                      unit: item.item.quantity_um,
                      merchantId: item.item.merchant_id,
                      parameters: item.item.parameters,
                      image: item.item.images?.toString()?.replace(/\[/g, '')?.replace(/\]/g, '')?.replace(/"/g, '')?.replace(/\\/g, '')?.split(','),
                      id: item.item.id
                    })} />
                  )
                }} />
            </View>
          </View>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.offWhite[1],
  },

  header: {
    flexDirection: 'row',
    paddingHorizontal: '8%',
    justifyContent: 'space-between',
    marginTop: '15%',
    alignItems: 'center'
  },

  modeBtnContainer: {
    width: '73%',
    marginLeft: '10%'
  },

  bellIconContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation: 1
  },

  bellIcon: {
    height: 30,
    width: 30
  },

  searchBarContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: '3%',
  },

  bannerImage: {
    width: 100,
    height: 150,
    alignSelf: 'center',
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  addProductTextContainer: {
    marginTop: '10%',
    marginLeft: '8%'
  },

  headingText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 17
  },

  addBtnContainer: {
    width: '16%',
    marginTop: '5%',
    marginLeft: '8%'
  },

  middle: {
    flexDirection: 'row',
    paddingHorizontal: '8%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%'
  },

  viewAllText: {
    color: colors.primary[0]
  },

  listContainer: {
    marginTop: '5%',
    paddingBottom: 180
  }

});

export default Home;