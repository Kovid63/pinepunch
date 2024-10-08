import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import FormInput from '../../components/FormInput'
import CheckBox from '../../components/CheckBox'
import SubmitBtn from '../../components/SubmitBtn'
import { UserContext } from '../../contexts/UserContext'
import { BASE_URL, REGISTER, SEND_REGISTER_OTP } from '@env';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'
import { Alert } from 'react-native'
import { LoadingContext } from '../../contexts/LoadingContext'

const CreateAccountScreen = ({ navigation }) => {

    const [company, setCompany] = useState('');
    const [companyError, setCompanyError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isCheckboxTicked, setIsCheckBoxTicked] = useState(false);

    const { setUserData } = useContext(UserContext)
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const isButtonActive = !(emailError || passwordError || companyError) && !(email.length == 0 || password.length == 0 || company.length == 0) && isCheckboxTicked;

    function getCompany(company) {
        setCompany(company);
    }

    function getEmail(email) {
        setEmail(email);
    }

    function getPassword(password) {
        setPassword(password);
    }

    function getCompanyError(error) {
        setCompanyError(error);
    }

    function getEmailError(error) {
        setEmailError(error);
    }

    function getPasswordError(error) {
        setPasswordError(error);
    }

    function loginPageHandler() {
        navigation.goBack();
    }

    function getCheckboxStatus(status) {
        setIsCheckBoxTicked(status);
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

    function privacyHandler(){
        navigation.navigate('Privacy');
    }

    async function createAccountHandler() {
        setIsLoading(true)
        try {
            const response = await fetch(BASE_URL + REGISTER, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    merchant_name: company
                })
            });

            const data = await response.json();
           
            if (data.error) {
                setIsLoading(false)
                if (Platform.OS === 'android') {
                    return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
                }
                else {
                    return Alert.alert(data.error.description);
                }
            }
            
            // await AsyncStorage.setItem('USER_INFO', JSON.stringify(data));
            // const local = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
            // setUserData(local);
            await otpTriggerHandler(data.session_id);
        
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    

    return (
        <View style={styles.container}>
            <View style={styles.create}>
                <Text style={styles.createText}>{'Create New Account'}</Text>
            </View>
            <View style={styles.form}>
                <FormInput placeholder={'Company Name'} getValue={getCompany} getError={getCompanyError} />
                <FormInput type={'email'} autoCapitalize='none' placeholder={'Email'} getValue={getEmail} getError={getEmailError} />
                <FormInput secure={true} placeholder={'Password'} getValue={getPassword} getError={getPasswordError} />
            </View>
            <View style={styles.boxBtnContainer}>
                <CheckBox isActive={getCheckboxStatus} />
                <Text style={styles.agreeText}>{'I Agree to the'}<Text onPress={privacyHandler} style={{ color: colors.primary[0] }}>{' '}{'Terms of Service'}</Text><Text>{' '}{'and'}</Text><Text onPress={privacyHandler} style={{ color: colors.primary[0] }}>{' '}{'Privacy Policy'}</Text></Text>
            </View>
            <View style={styles.loginAccContainer}>
                <Text style={styles.accRequestText}>{"Have an account?"}{' '}<Text onPress={loginPageHandler} style={styles.loginAccText}>{'Login'}</Text></Text>
            </View>
            <View style={styles.submitBtnContainer}>
                <SubmitBtn isLoading={isLoading} fill={isButtonActive} onPress={createAccountHandler} active={isButtonActive} text={'Get Started'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%'
    },

    create: {
        marginTop: '15%'
    },

    createText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 42,
        color: colors.black[0]
    },

    form: {
        justifyContent: 'space-between',
        marginTop: '5%'
    },

    boxBtnContainer: {
        marginHorizontal: '3%',
        flexDirection: 'row',
        width: '70%',
        marginTop: '8%'
    },

    agreeText: {
        marginLeft: '3%',
        fontFamily: 'Poppins',
        color: colors.black[4],
        fontSize: 12
    },

    loginAccContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 130,
        alignSelf: 'center'
    },

    accRequestText: {
        fontFamily: 'Poppins',
        fontSize: 13
    },

    loginAccText: {
        fontFamily: 'PoppinsSemiBold',
        color: colors.primary[0]
    },

    submitBtnContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 50,
        alignSelf: 'center'
    }
})

export default CreateAccountScreen