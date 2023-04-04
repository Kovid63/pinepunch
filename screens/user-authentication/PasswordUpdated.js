import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import SubmitBtn from '../../components/SubmitBtn'

const PasswordUpdated = ({ navigation }) => {

    function loginHandler() {
        navigation.navigate('LoginScreen');
    }

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text style={styles.welcomeText}>{'Password Updated!'}</Text>
            </View>
            <View style={styles.submitBtnContainer}>
                <SubmitBtn onPress={loginHandler} fill={true} active={true} text={'Login'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    welcome: {

    },

    welcomeText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 42,
        color: colors.black[0]
    },
    submitBtnContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: '15%'
    },
})

export default PasswordUpdated