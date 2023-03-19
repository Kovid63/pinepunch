import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../colors'
import FormInput from '../../components/FormInput';
import GoogleBtn from '../../components/GoogleBtn';
import GetStartedBtn from '../../components/GetStartedBtn';
const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const isButtonActive = !(emailError || passwordError) && !(email.length==0 || password.length ==0);

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

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text style={styles.welcomeText}>{'Hello,\nWelcome Back!'}</Text>
            </View>
            <View style={styles.form}>
                <FormInput placeholder={'Email'} getValue={getEmail} getError={getEmailError}/>
                <FormInput secure={true} placeholder={'Password'} getValue={getPassword} getError={getPasswordError}/>
            </View>
            <View style={styles.borderContainer}>
                <View style={styles.line}/>
                    <Text style={styles.lineText}>{'or'}</Text>
                <View style={styles.line}/>
            </View>
            <View style={styles.btnGoogleContainer}>
                <GoogleBtn/>
            </View>
            <View style={styles.createAccContainer}>
                <Text style={styles.accRequestText}>{"Don't have an account?"}{' '}<Text style={styles.createAccText}>{'Create Account'}</Text></Text>
            </View>
            <View style={styles.submitBtnContainer}>
                <GetStartedBtn active={isButtonActive}/>
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

    form: {
        marginTop: '10%',
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
    }

});

export default LoginScreen;