import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import SubmitBtn from '../../components/SubmitBtn'
import { BASE_URL, UPDATE_PASSWORD } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native'
import { Alert } from 'react-native'

const ChangePassword = ({ navigation }) => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isButtonActive = !(newPassword.length == 0 || confirmPassword.length == 0) && (newPassword.match(confirmPassword));

    async function changePassword() {
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        const response = await fetch(BASE_URL + UPDATE_PASSWORD, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-USER-SESSION-ID": sessionId
            },
            body: JSON.stringify({
                password: confirmPassword
            })
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

        navigation.navigate('Profile');
    }

    function backPressHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Change Password'} />
            <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                <View style={styles.profileInfoContainer}>
                    <Text style={styles.infoTitle}>{'New Password'}</Text>
                    <View style={styles.infoContainer}>
                        <TextInput value={newPassword} onChangeText={(password) => setNewPassword(password) } selectionColor={colors.black[5]} secureTextEntry style={styles.infoText} />
                    </View>
                    <Text style={styles.infoTitle}>{'Confirm Password'}</Text>
                    <View style={styles.infoContainer}>
                        <TextInput value={confirmPassword} onChangeText={(password) => setConfirmPassword(password)} selectionColor={colors.black[5]} secureTextEntry style={styles.infoText} />
                    </View>
                </View>
                <View style={styles.submitBtnContainer}>
                    <SubmitBtn onPress={changePassword} fill={isButtonActive} active={isButtonActive} text={'Change Password'} />
                </View>
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
    profileInfoContainer: {
        marginTop: '5%',
        marginBottom: 100
    },

    infoTitle: {
        fontFamily: 'Poppins',
        marginTop: '3%'
    },

    infoContainer: {
        height: 60,
        borderWidth: 1,
        borderColor: colors.black[5],
        borderRadius: 16,
        marginTop: '2%',
        justifyContent: 'center',
        paddingHorizontal: '8%'
    },

    infoText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        color: colors.black[4]
    },

    submitBtnContainer: {
        alignItems: 'center',
        marginTop: '40%',
        marginBottom: 80
    }

})

export default ChangePassword;