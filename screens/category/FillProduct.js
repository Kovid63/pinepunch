import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import { TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { TextInput } from 'react-native'
import { OptionRender } from '../../components/OptionRender'

const FillProduct = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.bellIconContainer}>
                    <Svg style={styles.bellIcon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <Path
                            d="M20 25a1 1 0 0 1-.71-.29l-8-8a1 1 0 0 1 0-1.42l8-8a1 1 0 1 1 1.42 1.42L13.41 16l7.3 7.29a1 1 0 0 1 0 1.42A1 1 0 0 1 20 25Z"
                            data-name="Layer 2"
                            fill={'#000000'}
                        />
                        <Path
                            style={{
                                fill: "none",
                            }}
                            d="M0 0h32v32H0z"
                        />
                    </Svg>
                </TouchableOpacity>
                <View>
                    <Text style={styles.titleText}>{'Details of item'}</Text>
                </View>
                <View style={{ width: '10%' }} />
            </View>
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryText}>{route.params.type}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.parameterContainer}>
                    <Text style={styles.parameterText}>{'Product Name'}</Text>
                    <TextInput style={styles.parameterInput} placeholder='Item Name 1' />
                </View>
                {route.params.parameters ?
                    route.params.parameters.map((parameter, index) => {
                        return (
                            <View key={index} style={styles.parameterContainer}>
                                <Text style={styles.parameterText}>{parameter.param_name}</Text>
                                {
                                    parameter.predefined ?
                                        <FlatList showsHorizontalScrollIndicator={false} style={{marginLeft: '2%'}} horizontal renderItem={item => (<OptionRender {...item}/>)} data={parameter.options} />
                                        : <TextInput style={styles.parameterInput} placeholder={parameter.param_name} />
                                }
                            </View>
                        )
                    })
                    : <></>}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15%',
        justifyContent: 'space-between'
    },

    titleText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17
    },

    bellIconContainer: {
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 15,
        elevation: 1
    },

    bellIcon: {
        height: 30,
        width: 30
    },

    categoryContainer: {
        height: 50,
        backgroundColor: colors.primary[0],
        marginTop: '15%',
        borderRadius: 16,
        justifyContent: 'center'
    },

    categoryText: {
        fontFamily: 'Poppins',
        marginLeft: '5%',
        color: '#FFFFFF'
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
        color: '#B3B1B0'
    },

    parameterInput: {
        marginLeft: '10%',
        backgroundColor: 'white',
        width: '50%',
        paddingHorizontal: '3%',
        fontFamily: 'Poppins',
        fontSize: 12
    }
})

export default FillProduct