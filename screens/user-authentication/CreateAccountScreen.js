import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import FormInput from '../../components/FormInput'
import CheckBox from '../../components/CheckBox'
import SubmitBtn from '../../components/SubmitBtn'
import { UserContext } from '../../contexts/UserContext'
import { BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccountScreen = ({ navigation }) => {

    const [company, setCompany] = useState('');
    const [companyError, setCompanyError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isCheckboxTicked, setIsCheckBoxTicked] = useState(false);

    const { userData, setUserData } = useContext(UserContext)

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
            fetch(BASE_URL + 'api/v1/authentication/merchant/user/send_register_otp', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-USER-SESSION-ID": sessionId
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((data) => {
                 navigation.navigate('VerifyEmail', {
                    otpId: data.otp_id
                 })
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function createAccountHandler() {
        try {
            fetch(BASE_URL + 'api/v1/merchant/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    merchant_name: company
                })
            }).then((response) => {
                if (response.ok) {
                    response.json()
                    .then(async (data) => {
                        await SecureStore.setItemAsync('sessionId', data.session_id);
                        setUserData({...userData, merchantName: company, email: email, sessionId: data.session_id, merchantStatus: data.merchant_status, merchantId: data.merchant_id});
                        await otpTriggerHandler(data.session_id);
                    })
                }else{
                    console.log(response.status);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        (async function init() {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
        })();
    }, [userData]);

    return (
        <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.create}>
                <Text style={styles.createText}>{'Create New Account'}</Text>
            </View>
            <View style={styles.form}>
                <FormInput placeholder={'Company Name'} getValue={getCompany} getError={getCompanyError} />
                <FormInput placeholder={'Email'} getValue={getEmail} getError={getEmailError} />
                <FormInput secure={true} placeholder={'Password'} getValue={getPassword} getError={getPasswordError} />
            </View>
            <View style={styles.boxBtnContainer}>
                <CheckBox isActive={getCheckboxStatus} />
                <Text style={styles.agreeText}>{'I Agree to the'}<Text style={{ color: colors.primary[0] }}>{' '}{'Terms of Service'}</Text><Text>{' '}{'and'}</Text><Text style={{ color: colors.primary[0] }}>{' '}{'Privacy Policy'}</Text></Text>
            </View>
            <View style={styles.loginAccContainer}>
                <Text style={styles.accRequestText}>{"Have an account?"}{' '}<Text onPress={loginPageHandler} style={styles.loginAccText}>{'Login'}</Text></Text>
            </View>
            <View style={styles.submitBtnContainer}>
                <SubmitBtn fill={isButtonActive} onPress={createAccountHandler} active={isButtonActive} text={'Get Started'} />
            </View>
        </ScrollView>
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
        marginTop: '45%'
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
        alignItems: 'center',
        marginBottom: 30,
        marginTop: '10%'
    }
})

export default CreateAccountScreen