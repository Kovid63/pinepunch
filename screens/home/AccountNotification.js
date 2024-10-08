import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { colors } from '../../colors'
import { Path, Svg } from 'react-native-svg'
import { BASE_URL, FETCH_NOTIFICATION } from '@env';
import * as SecureStore from 'expo-secure-store';

const AccountNotification = ({ navigation }) => {

    const [notifications, setNotificatons] = useState([]);

    function backPressHandler() {
        navigation.goBack();
    }

    function notificationClickHandler(notification) {
        navigation.navigate('Inquiry', notification);
    }

    async function fetchNotification() {
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        try {
            const response = await fetch(BASE_URL + FETCH_NOTIFICATION , {
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

            setNotificatons(data.items);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
     fetchNotification();
    }, [])
    

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: '8%' }}>
                <Header onPress={backPressHandler} pageTitle={'Account notifications'} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 80, marginTop: '5%' }}>
                {
                    notifications.map((notification, index) => (
                        <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => notificationClickHandler(notification)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '8%', backgroundColor: '#F8F8F8', paddingVertical: 15, alignItems: 'center', marginTop: 5 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 50, backgroundColor: '#FFFFFF', borderRadius: 25 }}>
                                <Svg style={{ height: 30, width: 30 }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M12 15.174c4.339 0 8 .705 8 3.425C20 21.32 16.315 22 12 22c-4.338 0-8-.705-8-3.425 0-2.721 3.685-3.401 8-3.401ZM12 2a5.273 5.273 0 0 1 5.294 5.291A5.274 5.274 0 0 1 12 12.583a5.275 5.275 0 0 1-5.294-5.292A5.274 5.274 0 0 1 12 2Z"
                                        fill={notification.unseen ? "#FD9340" : "#B3B1B0"}
                                        fillRule="nonzero"
                                    />
                                </Svg>
                            </View>
                            <Text style={{ width: '75%', fontFamily: 'Poppins', color: '#B3B1B0', fontSize: 14 }}>{notification.description}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

})

export default AccountNotification