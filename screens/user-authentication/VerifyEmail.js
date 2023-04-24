import { View, Text } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { colors } from '../../colors'
import SubmitBtn from '../../components/SubmitBtn'
import { UserContext } from '../../contexts/UserContext'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { Pressable } from 'react-native'
import { BASE_URL, VERIFY_REGISTER_OTP } from '@env';
import { Keyboard } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'
import { Alert } from 'react-native'

const VerifyEmail = ({ navigation, route }) => {

    //const [isEmailverified, setIsEmailverified] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const { setIsUserLoggedIn, userData, setUserData } = useContext(UserContext);

    const isButtonActive = otpValue.length === 4;

    const inputRef = useRef();

    function inputPressHandler() {
        inputRef.current.isFocused() ? inputRef.current.blur() : inputRef.current.focus();
    }

    async function verifyEmailHandler() {
        try {
            const response = await fetch(BASE_URL + VERIFY_REGISTER_OTP, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-USER-SESSION-ID": route.params.sessionId
                },
                body: JSON.stringify({
                    otp_id: route.params.otpId,
                    otp: otpValue
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

            // await AsyncStorage.setItem('USER_INFO', JSON.stringify({...userData, merchant_status: data.merchant_status}));
            // const local = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
            // setUserData(local);
            setIsUserLoggedIn(true);

        } catch (error) {
            console.log(error);
        }
    }

    function backPressHandler() {
        navigation.goBack();
    }


    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={backPressHandler} style={styles.bellIconContainer}>
                        <Svg style={styles.bellIcon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <Path
                                d="M20 25a1 1 0 0 1-.71-.29l-8-8a1 1 0 0 1 0-1.42l8-8a1 1 0 1 1 1.42 1.42L13.41 16l7.3 7.29a1 1 0 0 1 0 1.42A1 1 0 0 1 20 25Z"
                                data-name="Layer 2"
                                fill={'#FFFFFF'}
                            />
                            <Path
                                style={{
                                    fill: "none",
                                }}
                                d="M0 0h32v32H0z"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={styles.create}>
                    <Text style={styles.createText}>{'Verify Your Email'}</Text>
                </View>
                {/* <View style={styles.middle}>
                <Text style={styles.middleText}>{'You have entered "'}<Text style={{ color: colors.primary[0] }}>{'route.params.email'}</Text>{'".\nPlease check your email.'}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/emailverify.png')} />
            </View>
            <View style={styles.message}>
                <Text style={styles.messageText}>{'Email verified? Tap the below button to proceed'}</Text>
            </View>
            {!isEmailverified && (<View style={styles.warning}>
                <Text style={styles.warningText}>{'Email is not verified yet.'}</Text>
            </View>)} */}
                <View style={styles.otpInputContainer}>
                    {
                        [1, 2, 3, 4].map((_, index) => (
                            <Text onPress={inputPressHandler} key={index} style={styles.otpInput}>{otpValue[index]}</Text>
                        ))
                    }
                </View>
                <View>
                    <Text style={styles.otpMessage}>{'Please enter 4 digit code you received on your email.'}</Text>
                </View>
                <TextInput maxLength={4} keyboardType={'number-pad'} value={otpValue.toString()} onChangeText={(value) => setOtpValue(value)} ref={inputRef} style={{ opacity: 0 }} />
                <View style={styles.submitBtnContainer}>
                    <SubmitBtn onPress={verifyEmailHandler} active={isButtonActive} fill={isButtonActive} text={'Continue'} />
                </View>
            </ScrollView>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15%',
        justifyContent: 'space-between'
    },

    bellIconContainer: {
        backgroundColor: colors.primary[0],
        padding: 8,
        borderRadius: 30,
        elevation: 1
    },

    bellIcon: {
        height: 35,
        width: 35
    },

    create: {
        marginTop: '5%'
    },

    createText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 42,
        color: colors.black[0]
    },

    middle: {
        marginTop: '5%'
    },

    middleText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        color: colors.black[0]
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },

    message: {
        marginTop: '10%',
    },

    messageText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        color: colors.black[0],
        textAlign: 'center',
    },

    submitBtnContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },

    warning: {
        marginTop: '10%',
    },

    warningText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        color: colors.alerts.error,
        textAlign: 'center',
    },

    submitBtnContainer: {
        alignItems: 'center',
        marginTop: '75%'
    },

    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '20%',
        height: 30
    },

    otpInput: {
        borderBottomWidth: 4,
        width: '20%',
        textAlign: 'center',
        borderColor: '#D9D9D9',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 16
    },

    otpMessage: {
        fontFamily: 'Poppins',
        width: '90%',
        fontSize: 16,
        marginLeft: '5%',
        color: '#B3B1B0',
        marginTop: '10%'
    }
})

export default VerifyEmail