import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'

const CreateAccountScreen = () => {
    return (
        <View style={styles.container}>

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
})

export default CreateAccountScreen