import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { colors } from '../../colors';
import { ListRender } from '../../components/ListRender';
import SearchBar from '../../components/SearchBar';
import { itemsForSale } from '../../dummydata/dummydata';
import { ModeContext } from '../../contexts/ModeContext';
import { MODE_SELLER } from '../../constants';
import { BuyerListRender } from '../../components/BuyerListRender';
import { BASE_URL, FAVORITES } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native';

const Product = ({ route, navigation }) => {

    const [query, setQuery] = useState('');
    const [products, setProducts] = useState(route.params.products || {});
    const { mode } = useContext(ModeContext);
    const [favourites, setFavourites] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    function backPressHandler() {
        navigation.goBack();
    }

    function onRefresh() {
        setRefreshing(true);
        fetchFavourites();
        setRefreshing(false);
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

    function editDraftHandler(product){
        navigation.navigate('FillProduct', {product, isEdit: true, description_required: true })
      }

    useEffect(() => {

        const obj = route.params.products.filter(obj => obj.product_name.toLowerCase().includes(query.toLowerCase()));

        query.length === 0 ? setProducts(route.params.products) : setProducts(obj);

    }, [query]);


    useEffect(() => {
        fetchFavourites();
    }, [])

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
         fetchFavourites();
        })
        return () => focusListener;
      }, [navigation])




    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={backPressHandler} style={styles.bellIconContainer}>
                    <Svg style={styles.bellIcon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
                <View style={styles.searchBarContainer}>
                    <SearchBar query={query} setQuery={setQuery} />
                </View>
            </View>
            <View style={styles.middle}>
                <View>
                    <Text style={styles.headingText}>{'Items for sale'}</Text>
                </View>
            </View>
            <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{ alignItems: 'center', paddingBottom: 90 }} showsVerticalScrollIndicator={false} data={products} renderItem={mode === MODE_SELLER ? (item) => <ListRender onPress={() => navigation.navigate('ProductDetail', {
                preview: false,
                name: item.item.product_name,
                description: item.item.product_description,
                price: item.item.price,
                quantity: item.item.quantity,
                unit: item.item.quantity_um,
                image: item.item.images.toString().replace(/\[/g, '').replace(/\]/g, '').replace(/"/g, '').replace(/\\/g, '').split(','),
                id: item.item.id
            })} {...item} onPressEdit={() => editDraftHandler(item.item)} imageUri={item.item.images.toString().replace(/\[/g, '').replace(/\]/g, '').replace(/"/g, '').replace(/\\/g, '').split(',')[0]} /> : (item) => {
                const isFav = favourites.some(o => o.inventory_item_id == item.item.id);
                return (<BuyerListRender favouriteUpdate={onRefresh} favourite={isFav} onPress={() => navigation.navigate('ProductDetail', {
                    preview: false,
                    name: item.item.product_name,
                    description: item.item.product_description,
                    price: item.item.price,
                    quantity: item.item.quantity,
                    unit: item.item.quantity_um,
                    isFav: isFav,
                    id: item.item.id
                })} {...item} />)
            }} numColumns={2} />
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
        alignItems: 'center',
        marginHorizontal: '5%',
        marginTop: '15%',
        justifyContent: 'space-between'
    },

    bellIconContainer: {
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 15,
        elevation: 1
    },

    bellIcon: {
        height: 30,
        width: 30
    },

    searchBarContainer: {
        width: '80%',
        alignSelf: 'center'
    },

    middle: {
        flexDirection: 'row',
        paddingHorizontal: '8%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '5%'
    },

    headingText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17
    },

    listContainer: {
        paddingHorizontal: '3%',
    }

})

export default Product