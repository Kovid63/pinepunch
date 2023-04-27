import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { ModeContext } from '../../contexts/ModeContext'
import { ScrollView } from 'react-native'
import { MODE_SELLER } from '../../constants'
import { Image } from 'react-native'
import EditProfileIcon from '../../components/EditProfileIcon'
import SubmitBtn from '../../components/SubmitBtn'

const Account = ({ navigation }) => {

    const { mode } = useContext(ModeContext);

    function backPressHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Account'} />
            <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                {
                    mode === MODE_SELLER ?
                        <View>
                            <View style={styles.bannerContainer}>
                                <Image style={styles.bannerImage} source={{ uri: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }} />
                                <View style={styles.bannerCover} />
                                <View style={{ position: 'absolute', right: 10, top: 10 }}>
                                    <EditProfileIcon />
                                </View>
                            </View>
                            <View style={styles.profileImageContainer}>
                                <Image style={{ height: '100%', width: '100%', borderRadius: 60, backgroundColor: colors.primary[0] }} />
                                <View style={{ position: 'absolute', right: 0 }}>
                                    <EditProfileIcon />
                                </View>
                            </View>
                        </View>
                        :
                        <View>
                            <View style={styles.bannerContainer}>
                                <Image style={styles.bannerImage} source={{ uri: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }} />
                                <View style={{ position: 'absolute', right: 10, top: 10 }}>
                                    <EditProfileIcon />
                                </View>
                            </View>
                            <View style={styles.profileImageContainer}>
                                <Image style={{ height: '100%', width: '100%', borderRadius: 60, backgroundColor: 'silver' }} />
                                <View style={{ position: 'absolute', right: 0 }}>
                                    <EditProfileIcon />
                                </View>
                            </View>
                        </View>
                }
                <View style={styles.profileNameContainer}>
                    <Text style={styles.profileName}>{'PinePunch'}</Text>
                </View>
                <View style={styles.profileInfoContainer}>
                    <Text style={styles.infoTitle}>{'Name'}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>{'PinePunch'}</Text>
                    </View>
                    <Text style={styles.infoTitle}>{'Username'}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>{'PinePunch'}</Text>
                    </View>
                    <Text style={styles.infoTitle}>{'Email'}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>{'PinePunch'}</Text>
                    </View>
                </View>
                <View style={styles.submitBtnContainer}>
                    <SubmitBtn fill={true} active={true} text={'Save Changes'} />
                </View>
            </ScrollView >
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%'
    },

    bannerContainer: {
        height: 175,
        width: '100%',
        alignSelf: 'center',
        marginTop: '10%'
    },

    bannerCover: {
        position: 'absolute',
        backgroundColor: colors.primary[0],
        height: '100%',
        width: '100%',
        borderRadius: 24,
        opacity: 0.65
    },

    bannerImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
        transform: [
            {
                rotateY: '180deg'
            }
        ],
        borderRadius: 24
    },

    profileImageContainer: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginTop: '-20%'
    },

    profileNameContainer: {
        alignSelf: 'center',
        marginTop: '5%'
    },

    profileName: {
        fontFamily: 'PoppinsBold',
        fontSize: 24
    },

    profileInfoContainer: {
        marginTop: '5%',
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
        fontFamily: 'PoppinsBold',
        fontSize: 20,
        color: colors.black[4]
    },
    submitBtnContainer: {
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: 100
    }

})

export default Account