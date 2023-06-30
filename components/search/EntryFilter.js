import React from 'react'
import { StyleSheet, Text, Pressable, TextInput } from 'react-native'
import { colors } from '../../colors'

const EntryFilter = ({parameter, addFilterHandler}) => {
    // console.log(parameter);
  return (
    <Pressable style={styles.parameterContainer}>
        <Text style={styles.parameterText}>{parameter.name}</Text>
        <TextInput style={[styles.parameterInput, { borderRadius: 5 }]} placeholder='' onChangeText={(event) => {
            console.log(event);
            addFilterHandler(parameter.name, event)
        }} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: colors.primary[0],
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    parameterContainer: {
        // width: '90%',
        paddingVertical: 5,
        backgroundColor: '#F8F8F8',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '2%',
        marginTop: '3%'
    },
    parameterText: {
        fontFamily: 'Poppins',
        color: '#B3B1B0',
        width: '36%'
    },
    parameterInput: {
        marginLeft: '1%',
        backgroundColor: 'white',
        width: '50%',
        paddingHorizontal: '3%',
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#B3B1B0',
        fontSize: 14
    },
    text: {
        color: '#FFFFFF',
        fontFamily: 'Poppins'
    }
})

export default EntryFilter