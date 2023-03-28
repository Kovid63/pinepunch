import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import FormInput from '../../components/FormInput'
import CheckBox from '../../components/CheckBox'
import SubmitBtn from '../../components/SubmitBtn'
import { UserContext } from '../../contexts/UserContext'

const CreateAccountScreen = ({navigation}) => {

    const [company, setCompany] = useState('');
    const [companyError, setCompanyError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isCheckboxTicked, setIsCheckBoxTicked] = useState(false);


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

    function getCheckboxStatus(status){
        setIsCheckBoxTicked(status);
    }

    function createAccountHandler(){
        navigation.navigate('VerifyEmail', {
            email: email
        });
    }


    return (
        <View style={styles.container}>
            <View style={styles.create}>
                <Text style={styles.createText}>{'Create New Account'}</Text>
            </View>
            <View style={styles.form}>
                <FormInput placeholder={'Company Name'} getValue={getCompany} getError={getCompanyError}/>
                <FormInput placeholder={'Email'} getValue={getEmail} getError={getEmailError}/>
                <FormInput secure={true} placeholder={'Password'} getValue={getPassword} getError={getPasswordError}/>
            </View>
            <View style={styles.boxBtnContainer}>
                <CheckBox isActive={getCheckboxStatus}/>
                <Text style={styles.agreeText}>{'I Agree to the'}<Text style={{color: colors.primary[0]}}>{' '}{'Terms of Service'}</Text><Text>{' '}{'and'}</Text><Text style={{color: colors.primary[0]}}>{' '}{'Privacy Policy'}</Text></Text>
            </View>
            <View style={styles.loginAccContainer}>
                <Text style={styles.accRequestText}>{"Have an account?"}{' '}<Text onPress={loginPageHandler} style={styles.loginAccText}>{'Login'}</Text></Text>
            </View>
            <View style={styles.submitBtnContainer}>
                <SubmitBtn onPress={createAccountHandler} active={isButtonActive} text={'Get Started'}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%',
        justifyContent: 'space-evenly'
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
        justifyContent: 'space-between'
    },

    boxBtnContainer: {
        marginHorizontal: '3%',
        flexDirection: 'row',
        width: '70%'
    },

    agreeText: {
        marginLeft: '3%',
        fontFamily: 'Poppins',
        color: colors.black[4],
        fontSize: 12
    },

    loginAccContainer: {
        alignItems: 'center',
        marginTop: '25%'
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
        alignItems: 'center'
    }
})

export default CreateAccountScreen