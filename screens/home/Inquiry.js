import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { colors } from '../../colors'
import { notifications } from '../../dummydata/dummydata'
import { Path, Svg } from 'react-native-svg'
import { BASE_URL, SELLER_ITEMS } from '@env';
import * as SecureStore from 'expo-secure-store';

const Inquiry = ({ navigation, route }) => {

    const { notes, description } = route.params;

    const [product, setProduct] = useState({});

    function backPressHandler() {
        navigation.goBack();
    }

    async function getProduct(id) {
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        try {
            const response = await fetch(BASE_URL + SELLER_ITEMS + `/${id}` , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-USER-SESSION-ID": sessionId
                }
            });

            const data = await response.json();

            console.log(data);

            if (data.error) {
                if (Platform.OS === 'android') {
                    //return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
                }
                else {
                    //return Alert.alert(data.error.description);
                }
            }

            setProduct(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
       getProduct(notes.seller_product_id);
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Header onPress={backPressHandler} pageTitle={'Inquiry'} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 80 }}>
                <View style={{ alignItems: 'center', marginTop: '5%' }}>
                    <Text style={{ width: '95%', fontFamily: 'Poppins', color: '#B3B1B0', fontSize: 14 }}>{description}</Text>
                </View>
                <View style={{ backgroundColor: '#F8F8F8', height: 300, marginTop: '10%', borderRadius: 24 }}>
                    <Image style={{ height: '100%', width: '100%', borderRadius: 24 }} source={{uri: product.images?.toString().replace(/\[/g, '').replace(/\]/g, '').replace(/"/g, '').replace(/\\/g, '')}}/>
                </View>
                <View style={{ width: '100%', marginTop: '5%' }}>
                    <Text style={{ width: '50%', fontFamily: 'PoppinsSemiBold', fontSize: 17 }}>{product.product_name}</Text>
                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: '#B3B1B0' }}>{product.product_description}</Text>
                </View>
                <View style={{ width: '100%', marginTop: '0%' }}>
                    <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Parameter'}</Text>
                    {
                        product.parameters?.map((parameter, index) => (
                            <View key={index} style={{flexDirection: 'row'}}>
                            <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: '#B3B1B0' }}>{parameter.name+': '}</Text>
                            <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: '#B3B1B0' }}>{parameter.value}</Text>
                            </View>
                        ))
                    }
                </View>
                <View style={{ marginTop: '10%' }}>
                    <Text style={styles.textHeading}>{'Contact detail of seller: '}</Text>
                    <Text style={styles.textHeading}>{'Name: '}{product.merchant?.name}</Text>
                    <Text style={styles.text}>{'Location: '}{product.merchant?.address}</Text>
                    <Text style={styles.text}>{'Contact number: '}{product.merchant?.contact}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '8%'
    },

    textHeading: {
        fontFamily: 'Poppins',
        color: '#B3B1B0',
    },

    text: {
        fontFamily: 'Poppins',
        color: '#B3B1B0',
        marginTop: '5%'
    }

})

export default Inquiry