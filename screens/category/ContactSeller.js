import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { ScrollView } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { BASE_URL, CONTACT_SELLER } from '@env';

const ContactSeller = ({navigation, route}) => {

    const { name, address, seller_contact, productId } = route.params;

    function backPressHandler(){
        navigation.goBack();
    }

    async function contactSeller(id) {
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        const response = await fetch(BASE_URL + CONTACT_SELLER + `${id}/contact_seller`, {
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
    }


    useEffect(() => {
        contactSeller(productId);
    }, [])


    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Contact Details'} />
            <ScrollView>
                <View style={{marginTop: '10%'}}>
                    <Text style={styles.textHeading}>{'Contact detail of seller: '}</Text>
                    <Text style={styles.textHeading}>{'Name: '}{name}</Text>
                    <Text style={styles.text}>{'Location: '}{address}</Text>
                    <Text style={styles.text}>{'Contact number: '}{seller_contact}</Text>
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

export default ContactSeller