import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import SlidingBtn from '../../components/SlidingBtn'
import { MsgContext } from '../../contexts/MsgContext'

const Notification = ({ navigation }) => {

    const { isNewMsgOn, setIsNewMsgOn, isItemSoldMsgOn, setIsItemSoldMsgOn } = useContext(MsgContext);

    function backPressHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Notification'} />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{'Social'}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{'New Message'}</Text>
                    <SlidingBtn on={isNewMsgOn} setOn={setIsNewMsgOn} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{'Store'}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{'Item Sold'}</Text>
                    <SlidingBtn on={isItemSoldMsgOn} setOn={setIsItemSoldMsgOn} />
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

    titleContainer: {
        marginTop: '10%',
        marginHorizontal: '3%'
    },

    titleText: {
        fontFamily: 'PoppinsBold',
        fontSize: 16
    },

    text: {
        fontFamily: 'Poppins',
        marginHorizontal: '3%'
    },

    scroll: {
        flex: 1,
        marginBottom: 80
    },

})

export default Notification;