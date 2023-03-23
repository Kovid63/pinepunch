import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../colors'
import FormInput from '../../components/FormInput';
import GoogleBtn from '../../components/GoogleBtn';
import SubmitBtn from '../../components/SubmitBtn';
import { UserContext } from '../../contexts/UserContext';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const { setIsUserLoggedIn } = useContext(UserContext);

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

    function forgotPasswordHandler(){
        navigation.navigate('ForgotPasswordEmail');
    }

    function loginHandler(){
        // for testing
        setIsUserLoggedIn(true)
        // for production
        {/* todo */}
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
                <FormInput placeholder={'Email'} getValue={getEmail} getError={getEmailError} />
                <FormInput secure={true} placeholder={'Password'} getValue={getPassword} getError={getPasswordError} />
            </View>
            <View style={styles.forgotPasswordTextContainer}>
                <Text onPress={forgotPasswordHandler} style={styles.forgotPasswordText}>{'Forgot Password'}</Text>
            </View>
            <View style={styles.borderContainer}>
                <View style={styles.line} />
                <Text style={styles.lineText}>{'or'}</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.btnGoogleContainer}>
                <GoogleBtn />
            </View>
            <View style={styles.createAccContainer}>
                <Text style={styles.accRequestText}>{"Don't have an account?"}{' '}<Text onPress={createAccount} style={styles.createAccText}>{'Create Account'}</Text></Text>
            </View>
            <View style={styles.submitBtnContainer}>
                <SubmitBtn onPress={loginHandler} active={isButtonActive} text={'Get Started'}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%',
        justifyContent: 'space-evenly'
    },

    welcome: {
        marginTop: '15%'
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
        justifyContent: 'space-between'
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

    },

    createAccContainer: {
        alignItems: 'center',
        marginTop: '25%'
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
        alignItems: 'center'
    },

    forgotPasswordTextContainer: {
        marginLeft: '14%'
    },

    forgotPasswordText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: colors.alerts.error
    }

});

export default LoginScreen;