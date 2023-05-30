import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { ScrollView } from 'react-native'

const ContactSeller = ({navigation, route}) => {

    const { name, address, seller_contact  } = route.params;

    function backPressHandler(){
        navigation.goBack();
    }


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