import { View, Text, FlatList, ScrollView, Alert, Linking, Platform, PermissionsAndroid, PermissionsIOS } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import { TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { TextInput } from 'react-native'
import { OptionRender } from '../../components/OptionRender'
import Header from '../../components/Header'
import { ModeContext } from '../../contexts/ModeContext'
import { MODE_BUYER, MODE_SELLER } from '../../constants'
import { ListRender } from '../../components/ListRender'
import { itemsForSale } from '../../dummydata/dummydata'
import { BuyerCategoryListRender } from '../../components/BuyerCategoryListRender'
import { Image } from 'react-native'
import { productImagesIcon } from '../../data/productImagesIcon'
import DropDownMenu from '../../components/DropDownMenu'
import { units } from '../../data/units'
import ProductFillSlot from '../../components/ProductFillSlot'
import * as ImagePicker from 'expo-image-picker';
import { ToastAndroid } from 'react-native';
import { getImageUrl } from '../../utils/getImageUrl'
import * as SecureStore from 'expo-secure-store';
import { RefreshControl } from 'react-native'

const FillProduct = ({ navigation, route }) => {

    const { mode } = useContext(ModeContext);

    const { isEdit } = route.params;

    const { product_name, images, product_description, parameters, quantity_um, quantity, price, id } = route.params.product || {}


    const [value, setValue] = useState(units[0]);
    const [productParameters, setProductParameters] = useState([]);
    const [productImage, setProductImage] = useState([]);
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {

        if (isEdit) {
            setProductName(product_name);
            images.toString().replace(/\[/g, '').replace(/\]/g, '').replace(/"/g, '').replace(/\\/g, '').split(',').forEach((img, index) => {
                setProductImage(prevArray => {
                    const newArray = [...prevArray];
                    newArray[index] = img;
                    return newArray;
                });
            });
            setProductDescription(product_description);
            setProductParameters(parameters);
            setProductQuantity(quantity)
            setProductPrice(price)
            setValue(quantity_um)
        }

    }, [])

    const HeaderComponentFlatList = () => {
        return (
            <>
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>{route.params.type}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.parameterContainer}>
                        <Text style={styles.parameterText}>{'Product Name'}</Text>
                        <TextInput editable={false} style={styles.parameterInput} placeholder='Item Name 1' />
                        {mode === MODE_BUYER ? <TouchableOpacity style={{ marginHorizontal: 10 }}>
                            <Svg style={{ height: 24, width: 24, transform: [{ rotateZ: '-90deg' }] }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
                        </TouchableOpacity> : <></>}
                    </View>
                    {route.params.parameters ?
                        route.params.parameters.map((parameter, index) => {
                            return (
                                <View key={index} style={styles.parameterContainer}>
                                    <Text style={styles.parameterText}>{parameter.param_name}</Text>
                                    {
                                        parameter.predefined ?
                                            <FlatList showsHorizontalScrollIndicator={false} style={{ marginLeft: '2%' }} horizontal renderItem={item => (<OptionRender {...item} onPress={() => console.log('buyer mode category clicked to be made')} />)} data={parameter.options} />
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
        navigation.navigate('ProductDetail', { preview: false })
    }

    async function imagePickHandler(type) {
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');

        if (productImage.length === 4) {
            if (Platform.OS === 'android') {
                return ToastAndroid.show('Images limit reached', ToastAndroid.SHORT);
            }
            else {
                return Alert.alert('Images limit reached');
            }
        }

        const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
        const mediaPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (!cameraPermission.granted || !mediaPermission.granted) {
            if (!cameraPermission.canAskAgain || !mediaPermission.canAskAgain) {
                return Alert.alert('Permission Required', 'Please grant access for camera and media to add photos.', [
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
            await ImagePicker.requestCameraPermissionsAsync();
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        }

        if (type === 'Media') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [16, 9],
                quality: 1,
                base64: true,
                allowsMultipleSelection: true
            });

            if (!result.canceled) {
                if (result.assets.length == 1) {
                    setRefreshing(true);
                    const url = await getImageUrl(result.assets[0].uri, 'item', sessionId)
                    setProductImage([...productImage, url]);
                    setRefreshing(false);
                    // const newArray = [...prevArray];
                    // newArray[index] = { ...newArray[index], uri: result.assets[0].uri };
                    // return newArray;);
                } else {
                    if (result.assets.length >= 5) {
            
                        setRefreshing(true);
                        for (const img of result.assets.slice(0, productImage.length === 0? 4 : Math.abs(4 - (productImage.length-1)))) {
                            const url = await getImageUrl(img.uri, 'item', sessionId)
                            setProductImage(prevArray => {
                                const newArray = [...prevArray];
                                newArray.push(url);
                                return newArray;
                            });
                        }
                        setRefreshing(false);
                    } else {
                        setRefreshing(true);
                        for (const img of result.assets.slice(0, productImage.length === 0? 4 : Math.abs(4 - (productImage.length)))) {
                            const url = await getImageUrl(img.uri, 'item', sessionId)
                            setProductImage(prevArray => {
                                const newArray = [...prevArray];
                                newArray.push(url);
                                return newArray;
                            });
                        }
                        setRefreshing(false);
                    }
                }
                //setProductImage([{name: 'image1', uri: result.assets[0].uri}, {name: 'image2', uri: result.assets[1].uri}, {name: 'image3', uri: result.assets[2].uri}, {name: 'image4', uri: result.assets[3].uri}]);
            }
            return;
        }

        if (type === 'Camera') {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
                base64: true
            });

            if (!result.canceled) {
                if (result.assets.length == 1) {
                    setRefreshing(true);
                    const url = await getImageUrl(result.assets[0].uri, 'item', sessionId)
                    setProductImage([...productImage, url]);
                    setRefreshing(false);
                }
            }
            return;
        }
    }

    function submitProductHandler() {
        navigation.navigate('ProductDetail', {
            name: productName,
            parameters: productParameters,
            image: productImage || '',
            quantity: productQuantity,
            price: productPrice,
            description: productDescription,
            unit: value,
            preview: true,
            categoryType: route.params.isEdit ? route.params.product.catogery_type : route.params.type,
            id: id
        })
    }

    return (
        <View style={styles.container}>
            {
                route.params.isEdit ? <>
                    <Header onPress={backPressHandler} pageTitle={mode === MODE_SELLER ? 'Details Of Item' : 'Category'} />
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.categoryText}>{route.params.product.catogery_type}</Text>
                        </View>
                        <View style={{ alignItems: 'center', paddingBottom: 90 }}>
                            <View style={styles.parameterContainer}>
                                <Text style={styles.parameterText}>{'Product Name'}</Text>
                                <TextInput style={styles.parameterInput} value={productName} placeholder='Item Name 1' onChangeText={(name) => { setProductName(name) }} />
                            </View>

                            {
                                productParameters.map((parameter, index) => {
                                    return (
                                        <ProductFillSlot um={parameter.um} key={index} name={parameter.name} value={parameter.value} productParameters={productParameters} setProductParameters={setProductParameters} />
                                    )
                                })

                            }
                            <View style={{ height: 200, width: '90%', backgroundColor: '#F8F8F8', marginTop: 10, borderRadius: 5 }}>
                                <Text style={[styles.parameterText, { marginHorizontal: '2%', marginTop: 5 }]}>{'Product images'}</Text>
                                <View style={{ height: '65%', width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    {productImage.map((image, index) => (
                                        <View key={index} style={{ height: 75, width: 75, marginTop: '10%' }}>
                                            <Image style={{ height: '100%', width: '100%', backgroundColor: '#B3B1B0' }} source={{ uri: image }} />
                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                const newArray = [...productImage];
                                                newArray.splice(index, 1);
                                                setProductImage(newArray);
                                            }} style={{ height: 15, width: 15, backgroundColor: '#FFFFFF', borderRadius: 8, position: 'absolute', right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                                <Svg style={{ height: 8, width: 8 }} viewBox="0 0 612.043 612.043">
                                                    <Path fill={'#000000'} d="M397.503 306.011 593.08 110.434c25.27-25.269 25.27-66.213 0-91.482-25.269-25.269-66.213-25.269-91.481 0L306.022 214.551 110.445 18.974c-25.269-25.269-66.213-25.269-91.482 0s-25.269 66.213 0 91.482L214.54 306.033 18.963 501.61c-25.269 25.269-25.269 66.213 0 91.481 25.269 25.27 66.213 25.27 91.482 0l195.577-195.576 195.577 195.576c25.269 25.27 66.213 25.27 91.481 0 25.27-25.269 25.27-66.213 0-91.481L397.503 306.011z" />
                                                </Svg>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'center', marginRight: '1%', marginTop: '1%' }}>
                                    {
                                        productImagesIcon.map((icon, index) => {
                                            //const imageNextEmptySlot = productImage.findIndex((emptySlot) => emptySlot.uri === '');
                                            return (
                                                <TouchableOpacity disabled={refreshing} onPress={() => imagePickHandler(icon.type)} key={index} style={{ height: 25, width: 25, marginHorizontal: '1%' }}>
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
                                <TextInput value={productQuantity.toString()} maxLength={5} style={[styles.parameterInput, { width: '22%', textAlign: 'center', height: 25 }]} onChangeText={(quantity) => { setProductQuantity(quantity) }} />
                                <View style={{ marginLeft: '5%' }}>
                                    <DropDownMenu value={value} setValue={setValue} />
                                </View>
                            </View>
                            <View style={styles.parameterContainer}>
                                <Text style={styles.parameterText}>{'Price'}</Text>
                                <TextInput value={productPrice.toString()} style={[styles.parameterInput, { fontSize: 14 }]} onChangeText={(price) => { setProductPrice(price) }} />
                            </View>
                            {
                                route.params.description_required ?
                                    <View style={{
                                        width: '90%',
                                        paddingVertical: 5,
                                        backgroundColor: '#F8F8F8',
                                        borderRadius: 5,
                                        flexDirection: 'row',
                                        paddingHorizontal: '2%',
                                        marginTop: '3%'
                                    }}>
                                        <Text style={styles.parameterText}>{'Description'}</Text>
                                        <TextInput multiline value={productDescription} style={[{
                                            marginLeft: '1%',
                                            backgroundColor: 'white',
                                            width: '50%',
                                            paddingHorizontal: '3%',
                                            fontFamily: 'Poppins',
                                            fontSize: 12,
                                            color: '#B3B1B0',
                                            fontSize: 14,
                                            textAlignVertical: 'top',
                                            paddingVertical: 2
                                        }, { height: 200, width: '62%' }]} onChangeText={(description) => { setProductDescription(description) }} />
                                    </View>
                                    : <></>
                            }
                            <TouchableOpacity onPress={submitProductHandler} activeOpacity={0.6} style={{ alignSelf: 'flex-end', height: 60, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, backgroundColor: colors.primary[0], marginTop: '10%', borderRadius: 16, marginRight: '5%' }}>
                                <Text style={{ fontFamily: 'Poppins', color: '#FFFFFF' }}>{'Preview and Submit'}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </> :
                    <>
                        <Header onPress={backPressHandler} pageTitle={mode === MODE_SELLER ? 'Details Of Item' : 'Category'} />
                        {
                            mode === MODE_SELLER ?
                                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                                    <View style={styles.categoryContainer}>
                                        <Text style={styles.categoryText}>{route.params.type}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', paddingBottom: 90 }}>
                                        <View style={styles.parameterContainer}>
                                            <Text style={styles.parameterText}>{'Product Name'}</Text>
                                            <TextInput style={styles.parameterInput} placeholder='Item Name 1' onChangeText={(name) => { setProductName(name) }} />
                                        </View>

                                        {route.params.parameters ?
                                            route.params.parameters.map((parameter, index) => {

                                                return (
                                                    <ProductFillSlot um={parameter.um} key={index} name={parameter.param_name} options={parameter.options} productParameters={productParameters} setProductParameters={setProductParameters} />
                                                )
                                            })
                                            :
                                            <></>
                                        }
                                        <View style={{ height: 200, width: '90%', backgroundColor: '#F8F8F8', marginTop: 10, borderRadius: 5 }}>
                                            <Text style={[styles.parameterText, { marginHorizontal: '2%', marginTop: 5 }]}>{'Product images'}</Text>
                                            <View style={{ height: '65%', width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                {productImage.map((image, index) => (
                                                    <View key={index} style={{ height: 75, width: 75, marginTop: '10%' }}>
                                                        <Image style={{ height: '100%', width: '100%', backgroundColor: '#B3B1B0' }} source={{ uri: image }} />
                                                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                            const newArray = [...productImage];
                                                            newArray.splice(index, 1);
                                                            setProductImage(newArray);
                                                        }} style={{ height: 15, width: 15, backgroundColor: '#FFFFFF', borderRadius: 8, position: 'absolute', right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Svg style={{ height: 8, width: 8 }} viewBox="0 0 612.043 612.043">
                                                                <Path fill={'#000000'} d="M397.503 306.011 593.08 110.434c25.27-25.269 25.27-66.213 0-91.482-25.269-25.269-66.213-25.269-91.481 0L306.022 214.551 110.445 18.974c-25.269-25.269-66.213-25.269-91.482 0s-25.269 66.213 0 91.482L214.54 306.033 18.963 501.61c-25.269 25.269-25.269 66.213 0 91.481 25.269 25.27 66.213 25.27 91.482 0l195.577-195.576 195.577 195.576c25.269 25.27 66.213 25.27 91.481 0 25.27-25.269 25.27-66.213 0-91.481L397.503 306.011z" />
                                                            </Svg>
                                                        </TouchableOpacity>
                                                    </View>
                                                ))}
                                            </View>
                                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'center', marginRight: '1%', marginTop: '1%' }}>
                                                {
                                                    productImagesIcon.map((icon, index) => {

                                                        // const imageNextEmptySlot = productImage.findIndex((emptySlot) => emptySlot.uri === '');

                                                        return (
                                                            <TouchableOpacity disabled={refreshing} onPress={() => imagePickHandler(icon.type)} key={index} style={{ height: 25, width: 25, marginHorizontal: '1%' }}>
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
                                            <TextInput maxLength={5} style={[styles.parameterInput, { width: '22%', textAlign: 'center', height: 25 }]} onChangeText={(quantity) => { setProductQuantity(quantity) }} />
                                            <View style={{ marginLeft: '5%' }}>
                                                <DropDownMenu value={value} setValue={setValue} />
                                            </View>
                                        </View>
                                        <View style={styles.parameterContainer}>
                                            <Text style={styles.parameterText}>{'Price'}</Text>
                                            <TextInput style={[styles.parameterInput, { fontSize: 14 }]} onChangeText={(price) => { setProductPrice(price) }} />
                                        </View>
                                        {
                                            route.params.description_required ?
                                                <View style={{
                                                    width: '90%',
                                                    paddingVertical: 5,
                                                    backgroundColor: '#F8F8F8',
                                                    borderRadius: 5,
                                                    flexDirection: 'row',
                                                    paddingHorizontal: '2%',
                                                    marginTop: '3%'
                                                }}>
                                                    <Text style={styles.parameterText}>{'Description'}</Text>
                                                    <TextInput multiline style={[{
                                                        marginLeft: '1%',
                                                        backgroundColor: 'white',
                                                        width: '50%',
                                                        paddingHorizontal: '3%',
                                                        fontFamily: 'Poppins',
                                                        fontSize: 12,
                                                        color: '#B3B1B0',
                                                        fontSize: 14,
                                                        textAlignVertical: 'top',
                                                        paddingVertical: 2
                                                    }, { height: 200, width: '62%' }]} onChangeText={(description) => { setProductDescription(description) }} />
                                                </View>
                                                : <></>
                                        }
                                        <TouchableOpacity onPress={submitProductHandler} activeOpacity={0.6} style={{ alignSelf: 'flex-end', height: 60, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, backgroundColor: colors.primary[0], marginTop: '10%', borderRadius: 16, marginRight: '5%' }}>
                                            <Text style={{ fontFamily: 'Poppins', color: '#FFFFFF' }}>{'Preview and Submit'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                                :
                                <FlatList ListHeaderComponentStyle={{ width: '100%' }} ListHeaderComponent={HeaderComponentFlatList} style={{ marginTop: 20 }} contentContainerStyle={{ paddingBottom: 90, alignItems: 'center' }} showsVerticalScrollIndicator={false} data={itemsForSale} renderItem={item => <BuyerCategoryListRender onPress={productDetailHandler} {...item} />} numColumns={2} />
                        }
                    </>
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
        marginLeft: '1%',
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