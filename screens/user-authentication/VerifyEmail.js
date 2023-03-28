import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { colors } from '../../colors'
import { Image } from 'react-native'
import SubmitBtn from '../../components/SubmitBtn'
import { UserContext } from '../../contexts/UserContext'

const VerifyEmail = ({ navigation, route }) => {

    const [isEmailverified, setIsEmailverified] = useState(false);

    const { setIsUserLoggedIn } = useContext(UserContext);

    function verifyEmailHandler(){
        // for testing
        setIsUserLoggedIn(true);
        // for production
        {/* todo */}
    }

    function backPressHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
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
            <View style={styles.middle}>
                <Text style={styles.middleText}>{'You have entered "'}<Text style={{ color: colors.primary[0] }}>{route.params.email}</Text>{'".\nPlease check your email.'}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/emailverify.png')} />
            </View>
            <View style={styles.message}>
                <Text style={styles.messageText}>{'Email verified? Tap the below button to proceed'}</Text>
            </View>
            {!isEmailverified && (<View style={styles.warning}>
                <Text style={styles.warningText}>{'Email is not verified yet.'}</Text>
            </View>)}
            <View style={styles.submitBtnContainer}>
                <SubmitBtn onPress={verifyEmailHandler} active={isEmailverified} text={'Continue'} />
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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%',
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
        marginTop: '2%'
    },

    createText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 42,
        color: colors.black[0]
    },

    middle: {
        marginTop: '2%'
    },

    middleText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        color: colors.black[0]
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%'
    },

    message: {
        marginTop: '2%',
    },

    messageText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        color: colors.black[0],
        textAlign: 'center',
    },

    submitBtnContainer: {
        alignItems: 'center'
    },
    warning: {
        marginTop: '2%',
    },

    warningText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        color: colors.alerts.error,
        textAlign: 'center',
    },

    submitBtnContainer: {
        alignItems: 'center',
        marginTop: '2%',
    },
})

export default VerifyEmail