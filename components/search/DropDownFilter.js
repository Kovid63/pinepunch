import React from 'react'
import {useState} from 'react'
import { StyleSheet, Text, Pressable, TextInput, View } from 'react-native'
import { colors } from '../../colors'
import { Dropdown } from 'react-native-element-dropdown';

const DropDownFilter = ({parameter, addFilterHandler}) => {
    let data = [{
        label: 'All',
        value: '',
    }];
    const [selected, setSelected] = useState("");

    parameter.options.forEach(option => {
        data.push({
            label: option,
            value: option,
        })
    });
    
  return (
    <Pressable style={styles.parameterContainer}>
        <Text style={styles.parameterText}>{parameter.name}</Text>
        <View style={styles.dropDownContainer}>
            <Dropdown style={styles.dropdown}
                data={data}
                onChange={(item) => {
                    setSelected(item.value);
                    addFilterHandler(parameter.name, item.value);
                }}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                value={selected}
            />
        </View>
        {/* <TextInput style={[styles.parameterInput, { borderRadius: 5 }]} placeholder='' onChangeText={(event) => {
            console.log(event);
            addFilterHandler(parameter.name, event)
        }} /> */}
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
        width: '90%',
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
    },
    dropDownContainer: {
        backgroundColor: 'white',
        width: '60%',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
})

export default DropDownFilter