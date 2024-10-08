import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { Text } from 'react-native'
import { ScrollView } from 'react-native'
import SubmitBtn from '../../components/SubmitBtn'
import { settingsAccount } from '../../data/settingsAccount'
import { settingsHelp } from '../../data/settingsHelp'
import { SettingsSlot } from '../../components/SettingsSlot'
import { UserContext } from '../../contexts/UserContext'
import * as SecureStore from 'expo-secure-store';
import { LoadingContext } from '../../contexts/LoadingContext'
import { BASE_URL, LOGOUT } from '@env';
import { Platform } from 'react-native'
import { ToastAndroid } from 'react-native'
import { Alert } from 'react-native'

const Settings = ({ navigation }) => {

    const { setIsUserLoggedIn } = useContext(UserContext);

    const { isLoading, setIsLoading } = useContext(LoadingContext);

    function backPressHandler() {
        navigation.goBack();
    }

    async function logOutUserHandler() {
        try {
            setIsLoading(true)
            const response = await fetch(BASE_URL + LOGOUT, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setIsLoading(false);
            await SecureStore.deleteItemAsync('SESSION_ID');
            setIsUserLoggedIn(false);
        } catch (error) {
            console.log(error);
        }
    }

    function slotPressHandler(slotName) {
        navigation.navigate(slotName)
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Settings Page'} />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{'Account'}</Text>
            </View>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {
                    settingsAccount.map((slot, index) => (
                        <SettingsSlot onPress={() => slotPressHandler(slot.name)} key={index} slot={slot} />
                    ))
                }
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{'Help'}</Text>
                </View>
                {
                    settingsHelp.map((slot, index) => (
                        <SettingsSlot onPress={() => slotPressHandler(slot.name)} key={index} slot={slot} />
                    ))
                }
            </ScrollView>
            <View style={styles.submitBtnContainer}>
                <SubmitBtn isLoading={isLoading} fill={isLoading ? 1 : 0} onPress={logOutUserHandler} active={true} outline={true} text={'Log Out'} />
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