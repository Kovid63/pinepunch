import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import { TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { TextInput } from 'react-native'
import { OptionRender } from '../../components/OptionRender'
import Header from '../../components/Header'
import { ModeContext } from '../../contexts/ModeContext'
import { MODE_SELLER } from '../../constants'
import { ListRender } from '../../components/ListRender'
import { itemsForSale } from '../../dummydata/dummydata'
import { BuyerCategoryListRender } from '../../components/BuyerCategoryListRender'

const FillProduct = ({ navigation, route }) => {

    const { mode } = useContext(ModeContext);


    const HeaderComponentFlatList = () => {
        return (
            <>
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
                                            <FlatList showsHorizontalScrollIndicator={false} style={{ marginLeft: '2%' }} horizontal renderItem={item => (<OptionRender {...item} />)} data={parameter.options} />
                                            : <TextInput style={styles.parameterInput} placeholder={parameter.param_name} />
                                    }
                                </View>
                            )
                        })
                        : <></>}

                </View>
            </>
        )
    }

    function backPressHandler() {
        navigation.goBack();
    }

    function productDetailHandler() {
        navigation.navigate('ProductDetail');
    }


    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={mode === MODE_SELLER ? 'Details Of Item' : 'Category'} />
            {
                mode === MODE_SELLER ?
                    <ScrollView>
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
                                                    <FlatList showsHorizontalScrollIndicator={false} style={{ marginLeft: '2%' }} horizontal renderItem={item => (<OptionRender {...item} />)} data={parameter.options} />
                                                    : <TextInput style={styles.parameterInput} placeholder={parameter.param_name} />
                                            }
                                        </View>
                                    )
                                })
                                :
                                <></>
                            }
                            <View style={{height: 180, width: '90%', backgroundColor: '#F8F8F8', marginTop: 10, borderRadius: 5}}>
                                <Text style={[styles.parameterText, {marginHorizontal: '2%', marginTop: 5}]}>{'Product images'}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    :
                    <FlatList ListHeaderComponentStyle={{ width: '100%' }} ListHeaderComponent={HeaderComponentFlatList} style={{ marginTop: 20 }} contentContainerStyle={{ paddingBottom: 90, alignItems: 'center' }} showsVerticalScrollIndicator={false} data={itemsForSale} renderItem={item => <BuyerCategoryListRender onPress={productDetailHandler} {...item} />} numColumns={2} />
            }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%',
    },

    categoryContainer: {
        height: 50,
        backgroundColor: colors.primary[0],
        marginTop: '5%',
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