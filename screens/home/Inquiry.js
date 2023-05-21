import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { colors } from '../../colors'
import { notifications } from '../../dummydata/dummydata'
import { Path, Svg } from 'react-native-svg'

const Inquiry = ({ navigation, route }) => {

    function backPressHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View>
                <Header onPress={backPressHandler} pageTitle={'Inquiry'} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 80 }}>
                <View style={{ alignItems: 'center', marginTop: '5%' }}>
                    <Text style={{ width: '95%', fontFamily: 'Poppins', color: '#B3B1B0', fontSize: 14 }}>{route.params.title}</Text>
                </View>
                <View style={{ backgroundColor: '#F8F8F8', height: 300, marginTop: '10%', borderRadius: 24 }}>
                    <Image style={{ height: '100%', width: '100%', borderRadius: 24 }} />
                </View>
                <View style={{ width: '100%', marginTop: '5%' }}>
                    <Text style={{ width: '50%', fontFamily: 'PoppinsSemiBold', fontSize: 17 }}>{'Item name'}</Text>
                    <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: '#B3B1B0' }}>{'Description about the product \nDescription about the product'}</Text>
                </View>
                <View style={{ marginTop: '10%' }}>
                    <Text style={styles.textHeading}>{'Contact detail of seller: '}</Text>
                    <Text style={styles.textHeading}>{'Name: '}</Text>
                    <Text style={styles.text}>{'Location: '}</Text>
                    <Text style={styles.text}>{'Contact number: '}{'23456789'}</Text>
                </View>
                <View style={{ marginTop: '10%' }}>
                    <Text style={styles.textHeading}>{'Contact detail of seller: '}</Text>
                    <Text style={styles.textHeading}>{'Name: '}</Text>
                    <Text style={styles.text}>{'Location: '}</Text>
                    <Text style={styles.text}>{'Contact number: '}{'23456789'}</Text>
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