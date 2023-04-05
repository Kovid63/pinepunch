import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { Text } from 'react-native'
import { ScrollView } from 'react-native'
import SubmitBtn from '../../components/SubmitBtn'
import { settingAccount } from '../../data/settingsAccount'
import { settingHelp } from '../../data/settingsHelp'
import { SettingsSlot } from '../../components/SettingsSlot'

const Settings = ({ navigation }) => {

    function backPressHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Settings Page'} />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{'Account'}</Text>
            </View>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {
                    settingAccount.map((slot, index) => (
                        <SettingsSlot key={index} slot={slot} />
                    ))
                }
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{'Help'}</Text>
                </View>
                {
                    settingHelp.map((slot, index) => (
                        <SettingsSlot key={index} slot={slot} />
                    ))
                }
            </ScrollView>
            <View style={styles.submitBtnContainer}>
                <SubmitBtn active={true} outline={true} text={'Log Out'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '8%',
        paddingBottom: 90
    },

    titleContainer: {
        marginTop: '10%'
    },

    titleText: {
        fontFamily: 'PoppinsBold',
        fontSize: 16
    },

    scroll: {
        flex: 1,
        marginBottom: 10
    },

    submitBtnContainer: {
        alignItems: 'center'
    }

})
export default Settings