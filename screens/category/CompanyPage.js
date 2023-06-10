import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import { itemsForSale } from '../../dummydata/dummydata'
import { BuyerCategoryListRender } from '../../components/BuyerCategoryListRender'
import * as SecureStore from 'expo-secure-store';
import { BASE_URL, BUYER_ITEMS } from '@env';

const CompanyPage = ({ navigation, route }) => {


    const { name, seller_background_image_url, seller_email, address, seller_contact } = route.params;

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    async function fetchProducts() {
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        const response = await fetch(BASE_URL + BUYER_ITEMS + `?catogery_type=${'sheet'}&count=${0}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-USER-SESSION-ID": sessionId
            },
        })

        const data = await response.json();

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

    const HeaderComponentFlatlist = () => {
        return (<>
            <View style={{ height: 200, width: '75%', alignSelf: 'center', marginTop: '5%' }}>
                <Image style={{ height: '100%', width: '100%', borderRadius: 16 }} source={{ uri: seller_background_image_url }} />
            </View>
            <View style={{ marginTop: '10%', marginLeft: '13%' }}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Location: '}<Text style={{ fontFamily: 'PoppinsSemiBold' }}>{address}</Text></Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Email: '}<Text style={{ fontFamily: 'PoppinsSemiBold' }}>{seller_email}</Text></Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Contact No: '}<Text style={{ fontFamily: 'PoppinsSemiBold' }}>{seller_contact}</Text></Text>
            </View>
            <Text style={{ marginHorizontal: '5%', fontFamily: 'PoppinsSemiBold', marginTop: '5%' }}>{'Products on sale'}</Text>
        </>)
    }

    function backPressHandler() {
        navigation.goBack();
    }

    function productDetailHandler() {
        navigation.navigate('ProductDetail', {
            preview: false
        });
    }




    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={name} />
            <FlatList style={{ marginTop: 20 }} ListHeaderComponentStyle={{ width: '100%' }} ListHeaderComponent={HeaderComponentFlatlist} contentContainerStyle={{ paddingBottom: 90, alignItems: 'center' }} showsVerticalScrollIndicator={false} data={products} renderItem={item => <BuyerCategoryListRender imageUri={item.item.images?.toString().replace(/\[/g, '').replace(/\]/g, '').replace(/"/g, '').replace(/\\/g, '').split(',')[0]} onPress={() => navigation.navigate('ProductDetail', {
                preview: false,
                name: item.item.product_name,
                description: item.item.product_description,
                price: item.item.price,
                quantity: item.item.quantity,
                unit: item.item.quantity_um,
                image: item.item.images?.toString().replace(/\[/g, '').replace(/\]/g, '').replace(/"/g, '').replace(/\\/g, '').split(','),
                id: item.item.id,
                merchantId: item.item.merchant_id
            })} {...item} />} numColumns={2} />
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: colors.background
    }
})

export default CompanyPage