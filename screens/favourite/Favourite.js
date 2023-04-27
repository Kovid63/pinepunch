import { View, Text, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import { itemsForSale } from '../../dummydata/dummydata'
import { FlatList } from 'react-native'
import { BuyerCategoryListRender } from '../../components/BuyerCategoryListRender'
import { FavouriteListRender } from '../../components/FavouriteListRender'
import { BASE_URL, FAVORITES } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native'
import { Alert } from 'react-native'

const Favourite = () => {

    const [favourites, setFavourites] = useState([])
    const [query, setQuery] = useState('');

    const [refreshing, setRefreshing] = useState(false);

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

        setFavourites(data.items);
    }

    function onRefresh(){
        setRefreshing(true);
        query.length === 0 ? fetchFavourites() : <></>
        setRefreshing(false);
    }

    useEffect(() => {
        fetchFavourites();
    }, [])

    useEffect(() => {

        const obj = favourites.filter(obj => obj.inventory_item.product_name.toLowerCase().includes(query.toLowerCase()));

        query.length === 0 ? fetchFavourites() : setFavourites(obj);

    }, [query])

    return (
        <View style={styles.container}>
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
                <TextInput onChangeText={(search) => setQuery(search)} selectionColor={'#B3B1B0'} style={styles.input} />
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
            <View style={{ marginTop: '5%', marginHorizontal: '8%' }}>
                <Text style={styles.headingText}>{'Favourite items'}</Text>
            </View>
            <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ marginTop: '5%' }} contentContainerStyle={{ paddingBottom: 90, alignItems: 'center' }} showsVerticalScrollIndicator={false} data={favourites} renderItem={item => <FavouriteListRender fetchFavourites={fetchFavourites} {...item} />} numColumns={2} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    input: {
        fontFamily: 'Poppins',
        width: '80%',
        marginLeft: '5%',
        fontSize: 14,
        paddingHorizontal: '3%'
    },

    headingText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17
    },
})

export default Favourite