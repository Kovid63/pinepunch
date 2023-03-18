import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../colors'
import FormInput from '../../components/FormInput';
import GoogleBtn from '../../components/GoogleBtn';
const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function getEmail(email) {
        setEmail(email);
    }

    function getPassword(password) {
        setPassword(password);
    }

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text style={styles.welcomeText}>{'Hello,\nWelcome Back!'}</Text>
            </View>
            <View style={styles.form}>
                <FormInput placeholder={'Email'} getValue={getEmail} />
                <FormInput secure={true} placeholder={'Password'} getValue={getPassword} />
            </View>
            <View style={styles.borderContainer}>
                <View style={styles.line}/>
                    <Text style={styles.lineText}>{'or'}</Text>
                <View style={styles.line}/>
            </View>
            <View style={styles.btnContainer}>
                <GoogleBtn/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%'
    },

    welcome: {
        marginTop: '20%',
    },

    welcomeText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 42,
        color: colors.black[0]
    },

    form: {
        marginTop: '20%',
        justifyContent: 'space-between'
    },

    borderContainer: {
        flexDirection: 'row',
        height: 30,
        paddingHorizontal: '8%',
        marginTop: '5%',
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

    btnContainer: {
        marginTop: '5%'
    }
});

export default LoginScreen;