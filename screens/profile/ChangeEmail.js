import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import SubmitBtn from '../../components/SubmitBtn'

const ChangeEmail = ({ navigation }) => {

    function backPressHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Change Email'} />
            <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                <View style={styles.profileInfoContainer}>
                    <Text style={styles.infoTitle}>{'New Email'}</Text>
                    <View style={styles.infoContainer}>
                        <TextInput selectionColor={colors.black[5]} style={styles.infoText} />
                    </View>
                </View>
                <View style={styles.submitBtnContainer}>
                    <SubmitBtn fill={true} active={true} text={'Save'} />
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
        marginTop: '98%',
        marginBottom: 80
    }

})

export default ChangeEmail;