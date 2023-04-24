import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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
import { Image } from 'react-native'
import { productImagesIcon } from '../../data/productImagesIcon'
import DropDownMenu from '../../components/DropDownMenu'
import { units } from '../../data/units'
import ProductFillSlot from '../../components/ProductFillSlot'

const FillProduct = ({ navigation, route }) => {

    const { mode } = useContext(ModeContext);

    const [value, setValue] = useState(units[0]);
    const [product, setProduct] = useState([]);

    console.log(product);

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
                                            <FlatList showsHorizontalScrollIndicator={false} style={{ marginLeft: '2%' }} horizontal renderItem={item => (<OptionRender {...item} onPress={() => console.log('logged')} />)} data={parameter.options} />
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
                    <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.categoryText}>{route.params.type}</Text>
                        </View>
                        <View style={{ alignItems: 'center', paddingBottom: 90 }}>
                            <View style={styles.parameterContainer}>
                                <Text style={styles.parameterText}>{'Product Name'}</Text>
                                <TextInput style={styles.parameterInput} placeholder='Item Name 1' />
                            </View>

                            {route.params.parameters ?
                                route.params.parameters.map((parameter, index) => {
                                    
                                    return (
                                        <ProductFillSlot name={parameter.param_name} options={parameter.options} product={product} setProduct={setProduct}/>
                                        // <View key={index} style={styles.parameterContainer}>
                                        //     <Text style={styles.parameterText}>{parameter.param_name}</Text>
                                        //     {
                                        //         parameter.predefined ?
                                        //             <View style={{ flexDirection: 'row' }}>
                                        //                 <View style={{ width: '60%' }}>
                                        //                     <FlatList showsHorizontalScrollIndicator={false} style={{ marginRight: '2%' }} horizontal renderItem={item => (<OptionRender {...item} />)} data={parameter.options} />
                                        //                 </View>
                                        //                 <TextInput onFocus={() => {}} style={{
                                        //                     marginLeft: 2,
                                        //                     backgroundColor: '#FFFFFF',
                                        //                     paddingHorizontal: 2,
                                        //                     fontFamily: 'Poppins',
                                        //                     fontSize: 12,
                                        //                     color: '#B3B1B0',
                                        //                     fontSize: 14,
                                        //                     width: 50,
                                        //                     textAlign: 'center'
                                        //                 }} />
                                        //             </View>
                                        //             : <TextInput style={styles.parameterInput} placeholder={parameter.param_name} />
                                        //     }
                                        // </View>
                                    )
                                })
                                :
                                <></>
                            }
                            <View style={{ height: 200, width: '90%', backgroundColor: '#F8F8F8', marginTop: 10, borderRadius: 5 }}>
                                <Text style={[styles.parameterText, { marginHorizontal: '2%', marginTop: 5 }]}>{'Product images'}</Text>
                                <View style={{ height: '65%', width: '90%', alignSelf: 'center' }}>
                                    <Image />
                                </View>
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'center', marginRight: '1%', marginTop: '1%' }}>
                                    {
                                        productImagesIcon.map((icon, index) => {
                                            return (
                                                <TouchableOpacity key={index} style={{ height: 25, width: 25, marginHorizontal: '1%' }}>
                                                    {icon.icon}
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <View style={{
                                width: '90%',
                                paddingVertical: 5,
                                backgroundColor: '#F8F8F8',
                                borderRadius: 5,
                                flexDirection: 'row',
                                paddingHorizontal: '2%',
                                marginTop: '3%'
                            }}>
                                <Text style={styles.parameterText}>{'Quantity'}</Text>
                                <TextInput maxLength={5} style={[styles.parameterInput, { width: '22%', textAlign: 'center', height: 25 }]} />
                                <View style={{ marginLeft: '5%' }}>
                                    <DropDownMenu value={value} setValue={setValue} />
                                </View>
                            </View>
                            <View style={styles.parameterContainer}>
                                <Text style={styles.parameterText}>{'Price'}</Text>
                                <TextInput style={[styles.parameterInput, { fontSize: 14 }]} />
                            </View>
                            <TouchableOpacity activeOpacity={0.6} style={{ alignSelf: 'flex-end', height: 60, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, backgroundColor: colors.primary[0], marginTop: '10%', borderRadius: 16, marginRight: '5%' }}>
                                <Text style={{ fontFamily: 'Poppins', color: '#FFFFFF' }}>{'Preview and Submit'}</Text>
                            </TouchableOpacity>
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
        color: '#B3B1B0',
        width: '36%'
    },

    parameterInput: {
        marginLeft: '5%',
        backgroundColor: 'white',
        width: '50%',
        paddingHorizontal: '3%',
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#B3B1B0',
        fontSize: 14
    }
})

export default FillProduct;