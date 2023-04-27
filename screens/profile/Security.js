import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { security } from '../../data/security'
import { SettingsSlot } from '../../components/SettingsSlot'

const Security = ({ navigation }) => {

    function backPressHandler() {
        navigation.goBack();
    }

    function slotPressHandler(slotName){
        navigation.navigate(slotName)
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Security'} />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{'Security'}</Text>
            </View>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {
                    security.map((slot, index) => (
                        <SettingsSlot onPress={() => slotPressHandler(slot.name)} key={index} slot={slot} />
                    ))
                }
            </ScrollView>
        </View>
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

    scroll: {
        flex: 1,
        marginBottom: 80
    },

})

export default Security;