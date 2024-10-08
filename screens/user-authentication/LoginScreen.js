import { View, Text, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../colors'
import FormInput from '../../components/FormInput';
import GoogleBtn from '../../components/GoogleBtn';
import SubmitBtn from '../../components/SubmitBtn';
import { UserContext } from '../../contexts/UserContext';
import { BASE_URL, LOGIN, SEND_REGISTER_OTP } from '@env';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import { LoadingContext } from '../../contexts/LoadingContext';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const { setIsUserLoggedIn, setUserData } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const isButtonActive = !(emailError || passwordError) && !(email.length == 0 || password.length == 0);

    function getEmail(email) {
        setEmail(email);
    }

    function getPassword(password) {
        setPassword(password);
    }

    function getEmailError(error) {
        setEmailError(error);
    }

    function getPasswordError(error) {
        setPasswordError(error);
    }

    function createAccount() {
        navigation.navigate('CreateAccountScreen');
    }

    function forgotPasswordHandler() {
        navigation.navigate('ForgotPasswordEmail');
    }

    async function otpTriggerHandler(sessionId) {

        try {
            const response = await fetch(BASE_URL + SEND_REGISTER_OTP, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-USER-SESSION-ID": sessionId
                }
            });

            if (response.ok) {
                const data = await response.json();
                navigation.navigate('VerifyEmail', { otpId: data.otp_id, sessionId: sessionId });
            }
        
        } catch (error) {
            console.log(error);
        }
    }

    async function loginHandler() {
        try {
            setIsLoading(true)
            const response = await fetch(BASE_URL + LOGIN, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            console.log(data);

            if (data.error) {
                setIsLoading(false);
                if (Platform.OS === 'android') {
                    return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
                }
                else {
                    return Alert.alert(data.error.description);
                }
            }

            await SecureStore.setItemAsync('SESSION_ID', data.session_id);
            if (data.merchant_status === 'afa_pending') {
                await otpTriggerHandler(data.session_id);
            }
            if (data.merchant_status === 'in_review') {
                setUserData(Math.random(0, 9));
            }
            setUserData(Math.random(0, 9));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text style={styles.welcomeText}>{'Hello,\nWelcome Back!'}</Text>
            </View>
            {
                isButtonActive && (
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{'Water is life. Water is a basic human need. In various lines of life, humans need water.'}</Text>
                    </View>
                )}
            <View style={styles.form}>
                <FormInput type={'email'} autoCapitalize='none' placeholder={'Email'} getValue={getEmail} getError={getEmailError} />
                <FormInput secure={true} placeholder={'Password'} getValue={getPassword} getError={getPasswordError} />
            </View>
            <View style={styles.forgotPasswordTextContainer}>
                <Text onPress={forgotPasswordHandler} style={styles.forgotPasswordText}>{'Forgot Password'}</Text>
            </View>
            {/* <View style={styles.borderContainer}>
                <View style={styles.line} />
                <Text style={styles.lineText}>{'or'}</Text>
                <View style={styles.line} />
            </View> */}
            <View style={styles.btnGoogleContainer}>
                {/* <GoogleBtn /> */}
            </View>
            <View style={styles.createAccContainer}>
                <Text style={styles.accRequestText}>{"Don't have an account?"}{' '}<Text onPress={createAccount} style={styles.createAccText}>{'Create Account'}</Text></Text>
            </View>
            <View style={styles.submitBtnContainer}>
                <SubmitBtn onPress={loginHandler} isLoading={isLoading} fill={isButtonActive} active={isButtonActive && !isLoading} text={'Get Started'} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%',
    },

    welcome: {
        marginTop: '20%'
    },

    welcomeText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 42,
        color: colors.black[0]
    },

    textContainer: {
        alignItems: 'center'
    },

    text: {
        fontFamily: 'Poppins',
        fontSize: 16,
        color: '#898989'
    },

    form: {
        justifyContent: 'space-between'
    },

    borderContainer: {
        flexDirection: 'row',
        height: 30,
        paddingHorizontal: '8%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '5%'
    },

    line: {
        borderWidth: 0.2,
        width: '40%',
        alignItems: 'center',
        height: 0,
        borderColor: colors.black[5]
    },

    lineText: {
        color: colors.black[5],
        fontFamily: 'Poppins'
    },

    btnGoogleContainer: {
        marginTop: '30%'
    },

    createAccContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 130,
        alignSelf: 'center'
    },

    accRequestText: {
        fontFamily: 'Poppins',
        fontSize: 13
    },

    createAccText: {
        fontFamily: 'PoppinsSemiBold',
        color: colors.primary[0]
    },

    submitBtnContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 50,
        alignSelf: 'center'
    },

    forgotPasswordTextContainer: {
        marginLeft: '14%',
        marginTop: '5%'
    },

    forgotPasswordText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: colors.alerts.error
    }

});

export default LoginScreen;