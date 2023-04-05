import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { Text } from 'react-native'
import { ScrollView } from 'react-native'
import SubmitBtn from '../../components/SubmitBtn'
import { Path, Svg } from 'react-native-svg'

const Settings = () => {

    const settingSlotData = [
        {
            name: 'Account',
            icon: <Svg style={{
                height: 30,
                width: 30
            }} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                <Path
                    d="M19.84 18.193c0 3.296-4.52 3.677-7.92 3.677h-.242C9.512 21.865 4 21.728 4 18.173c0-3.229 4.338-3.66 7.711-3.676h.453c2.166.005 7.676.141 7.676 3.696Zm-7.92-2.197c-4.26 0-6.42.732-6.42 2.177 0 1.458 2.16 2.197 6.42 2.197s6.42-.732 6.42-2.177c0-1.458-2.16-2.197-6.42-2.197ZM11.92 2a5.315 5.315 0 0 1 5.31 5.31 5.314 5.314 0 0 1-5.31 5.309h-.031a5.3 5.3 0 0 1-5.28-5.312A5.316 5.316 0 0 1 11.922 2Zm0 1.428A3.887 3.887 0 0 0 8.039 7.31a3.873 3.873 0 0 0 3.854 3.882l.029.714v-.714A3.886 3.886 0 0 0 15.8 7.31a3.886 3.886 0 0 0-3.88-3.882Z"
                    fill="#B3B1B0"
                    fillRule="evenodd"
                />
            </Svg>
        },
        {
            name: ''
        }
    ]

    const SettingSlot = ({slot}) => {

        return (
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        {slot.icon}
                    </View>
                    <Text>{slot.name}</Text>
                </View>
                <View>

                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header pageTitle={'Settings Page'} />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{'Account'}</Text>
            </View>
            <ScrollView style={styles.scroll} showsHorizontalScrollIndicator={false}>
                {
                    settingSlotData.map((slot, index) => (
                        <SettingSlot slot={slot}/>
                    ))
                }
            </ScrollView>
            <View style={styles.submitBtnContainer}>
                <SubmitBtn active={true} outline={true} text={'Log Out'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '8%',
        paddingBottom: 90
    },

    titleContainer: {
        marginTop: '10%'
    },

    titleText: {
        fontFamily: 'PoppinsBold',
        fontSize: 16
    },

    scroll: {
        flex: 1
    },

    submitBtnContainer: {
        alignItems: 'center'
    }

})
export default Settings