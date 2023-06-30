import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { ScrollView } from 'react-native'

const ContactUs = ({ navigation }) => {

    function backPressHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Contact Us'} />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{'Contact Us'}</Text>
                </View>
                <Text style={styles.text}>{'Bermer Software Private Limited \n\n 2nd floor city center mall, \n Brahmavara 576238 \n Udupi dist., Karnataka State \n\n Email: admin@bermer.in \n\n Contact No: 8970442425'}</Text>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%'
    },

    titleContainer: {
        marginTop: '10%',
        marginHorizontal: '3%'
    },

    titleText: {
        fontFamily: 'PoppinsBold',
        fontSize: 16
    },

    text: {
        fontFamily: 'Poppins',
        marginHorizontal: '3%',
        marginTop: '5%',
        color: '#B3B1B0'
    },

    scroll: {
        flex: 1,
        marginBottom: 80
    },

})

export default ContactUs;