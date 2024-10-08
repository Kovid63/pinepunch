import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { ModeContext } from '../../contexts/ModeContext'
import { ScrollView } from 'react-native'
import { MODE_BUYER, MODE_SELLER } from '../../constants'
import { Image } from 'react-native'
import EditProfileIcon from '../../components/EditProfileIcon'
import SubmitBtn from '../../components/SubmitBtn'
import { BASE_URL, MERCHANT } from '@env';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native'
import { Alert } from 'react-native'
import { TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { RefreshControl } from 'react-native'
import { getImageUrl } from '../../utils/getImageUrl'
import { LoadingContext } from '../../contexts/LoadingContext'

const Account = ({ navigation }) => {

    const { mode } = useContext(ModeContext);

    const [merchantData, setMerchantData] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    function backPressHandler() {
        navigation.goBack();
    }

    async function fetchDetails() {
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        const response = await fetch(BASE_URL + MERCHANT, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-USER-SESSION-ID": sessionId
            }
        });

        const data = await response.json();

        if (data.error) {
            if (Platform.OS === 'android') {
                //return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
            }
            else {
                //return Alert.alert(data.error.description);
            }
        }

        setMerchantData(data);
    }

    async function updateDetails() {
        setIsLoading(true);

        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        const response = await fetch(BASE_URL + MERCHANT, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "X-USER-SESSION-ID": sessionId
            },
            body: mode === MODE_SELLER ? JSON.stringify({
                name: merchantData.name,
                seller_background_image_url: merchantData.seller_background_image_url,
                seller_profile_image_url: merchantData.seller_profile_image_url,
                address: merchantData.address?.length === 0 ? "N/A" : merchantData.address,
                seller_contact: merchantData.seller_contact,
                seller_profile_description: merchantData.seller_profile_description
            }) : JSON.stringify({
                name: merchantData.name,
                buyer_background_image_url: merchantData.buyer_background_image_url,
                buyer_profile_image_url: merchantData.buyer_profile_image_url,
                address: merchantData.address?.length === 0 ? "N/A" : merchantData.address,
                contact: merchantData.contact
            })
        });

        const data = await response.json();

        if (data.error) {
            setIsLoading(false);
            if (Platform.OS === 'android') {
                return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
            }
            else {
                return Alert.alert(data.error.description);
            }
        }
        setIsLoading(false);

        navigation.navigate('Profile');
    }

    async function imagePickHandler(type, mode) {
        const mediaPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        if (!mediaPermission.granted) {
            if (!mediaPermission.canAskAgain) {
                return Alert.alert('Permission Required', 'Please grant access for media to add photos.', [
                    {
                        text: 'cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Open Settings',
                        onPress: () => {
                            if (Platform.OS === 'ios') {
                                Linking.openURL('app-settings:');
                            } else {
                                Linking.openSettings();
                            }
                        }
                    }
                ])
            }
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: type === 'Banner' ? [16, 9] : [16, 16],
            quality: 1,
        });

        if (!result.canceled) {
            setRefreshing(true);
            if (mode === MODE_SELLER) {

                if (type === 'Banner') {
                    const bgUrl = await getImageUrl(result.assets[0].uri, 'merchant_seller_background', sessionId);
                    setMerchantData({ ...merchantData, seller_background_image_url: bgUrl });
                    setRefreshing(false);
                } else {
                    const profUrl = await getImageUrl(result.assets[0].uri, 'merchant_seller_logo', sessionId);
                    setMerchantData({ ...merchantData, seller_profile_image_url: profUrl });
                    setRefreshing(false);
                }

            } else {
                if (type === 'Banner') {
                    const bgUrl = await getImageUrl(result.assets[0].uri, 'merchant_buyer_background', sessionId);
                    setMerchantData({ ...merchantData, buyer_background_image_url: bgUrl });
                    setRefreshing(false);
                } else {
                    const profUrl = await getImageUrl(result.assets[0].uri, 'merchant_buyer_logo', sessionId);
                    setMerchantData({ ...merchantData, buyer_profile_image_url: profUrl });
                    setRefreshing(false);
                }
            }

        }
        return;
    }



    function onRefresh() {
        setRefreshing(true);
        fetchDetails();
        setRefreshing(false);
    }

    useEffect(() => {
        fetchDetails();
    }, [])

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Account'} />
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                {
                    mode === MODE_SELLER ?
                        <View>
                            <View style={styles.bannerContainer}>
                                <Image style={[styles.bannerImage, { backgroundColor: '#FDC89F' }]} source={{ uri: merchantData.seller_background_image_url }} />
                                {/* <View style={styles.bannerCover} /> */}
                                <View style={{ position: 'absolute', right: 10, top: 10 }}>
                                    <EditProfileIcon onPress={() => imagePickHandler('Banner', MODE_SELLER)} />
                                </View>
                            </View>
                            <View style={[styles.profileImageContainer, { backgroundColor: colors.primary[0], borderRadius: 60 }]}>
                                {merchantData.seller_profile_image_url ? <Image style={{ height: '100%', width: '100%', borderRadius: 60, backgroundColor: colors.primary[0] }} source={{ uri: merchantData.seller_profile_image_url }} /> : <Text style={{ fontFamily: 'PoppinsBold', color: "#FFFFFF", marginTop: 45, alignSelf: 'center' }}>{'Add Logo'}</Text>}
                                <View style={{ position: 'absolute', right: 0 }}>
                                    <EditProfileIcon onPress={() => imagePickHandler('Profile', MODE_SELLER)} />
                                </View>
                            </View>
                        </View>
                        :
                        <View>
                            <View style={styles.bannerContainer}>
                                <Image style={styles.bannerImage} source={{ uri: merchantData.buyer_background_image_url }} />
                                <View style={{ position: 'absolute', right: 10, top: 10 }}>
                                    <EditProfileIcon onPress={() => imagePickHandler('Banner', MODE_BUYER)} />
                                </View>
                            </View>
                            <View style={[styles.profileImageContainer, { backgroundColor: 'silver', borderRadius: 60 }]}>
                                {merchantData.buyer_profile_image_url ? <Image style={{ height: '100%', width: '100%', borderRadius: 60 }} source={{ uri: merchantData.buyer_profile_image_url }} /> : <Text style={{ fontFamily: 'PoppinsBold', color: "#FFFFFF", marginTop: 45, alignSelf: 'center' }}>{'Add Logo'}</Text>}
                                <View style={{ position: 'absolute', right: 0 }}>
                                    <EditProfileIcon onPress={() => imagePickHandler('Profile', MODE_BUYER)} />
                                </View>
                            </View>
                        </View>
                }
                <View style={styles.profileNameContainer}>
                    <Text style={styles.profileName}>{merchantData.name}</Text>
                    {mode === MODE_SELLER && <TextInput value={merchantData.seller_profile_description} onChangeText={(desc) => setMerchantData({ ...merchantData, seller_profile_description: desc })} style={{
                        fontFamily: 'PoppinsBold',
                        fontSize: 18,
                        textAlign: 'center'
                    }} />}
                </View>
                {mode === MODE_SELLER && <View style={{ overflow: 'hidden' }}>
                    <View
                        style={{
                            borderStyle: 'dotted',
                            borderWidth: 2,
                            borderColor: '#000',
                            margin: -2,
                            marginTop: 10,
                        }}>
                        <View style={{ width: '95%' }} />
                    </View>
                </View>}
                <View style={styles.profileInfoContainer}>
                    <View style={{ backgroundColor: '#F8F8F8' }}>
                        <Text style={styles.infoTitle}>{'Company Name'}</Text>
                        <TextInput value={merchantData.name} style={styles.infoText} onChangeText={(name) => setMerchantData({ ...merchantData, name: name })} />
                    </View>
                    <Text style={styles.infoTitle}>{'Location'}</Text>

                    <TextInput multiline={true} value={merchantData.address} style={styles.infoText} onChangeText={(address) => setMerchantData({ ...merchantData, address: address })} />
                    <View style={{ backgroundColor: '#F8F8F8' }}>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text style={styles.infoTitle}>{'Contact No:  '}</Text>
                            <TextInput value={mode === MODE_SELLER ? merchantData.seller_contact : merchantData.contact} style={[styles.infoText, { marginTop: 6 }]} onChangeText={(contact) => mode === MODE_SELLER ? setMerchantData({ ...merchantData, seller_contact: contact }) : setMerchantData({ ...merchantData, contact: contact })} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.infoTitle}>{'Email:  '}</Text>
                            <TextInput value={merchantData.email} style={[styles.infoText, { marginTop: 6 }]} onChangeText={(email) => setMerchantData({ ...merchantData, email: email })} />
                        </View>
                    </View>
                </View>
                <View style={styles.submitBtnContainer}>
                    <SubmitBtn fill={true} isLoading={isLoading} onPress={updateDetails} active={!refreshing} text={'Save Changes'} />
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
        marginTop: '10%',
        backgroundColor: colors.black[5],
        borderRadius: 24
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
        justifyContent: 'center',
        marginTop: '5%'
    },

    profileName: {
        fontFamily: 'PoppinsBold',
        fontSize: 24,
        textAlign: 'center'
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
        fontSize: 18,
        color: '#000',
    },
    submitBtnContainer: {
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: 100
    }

})

export default Account