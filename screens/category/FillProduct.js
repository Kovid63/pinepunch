import { View, Text, FlatList, ScrollView, Alert, Linking, Platform, PermissionsAndroid, PermissionsIOS, Pressable } from 'react-native'
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
import { BASE_URL, BUYER_ITEMS } from '@env';
import { getAppSettings } from '../../utils/getAppSettings'

const FillProduct = ({ navigation, route }) => {

    const { mode } = useContext(ModeContext);

    const { isEdit } = route.params;

    const { product_name, images, product_description, parameters, quantity_um, quantity, price, id, custom_parameter} = route.params.product || {}


    const [value, setValue] = useState(units[0]);
    const [productParameters, setProductParameters] = useState([]);
    const [productImage, setProductImage] = useState([]);
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);
    const [prodFilters, setProdFilters] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [customParam, setCustomParam] = useState({ name: '', value: '', um: 'na' });

    const [query, setQuery] = useState('');


    useEffect(() => {

        if (isEdit) {
            console.log(route.params.product);
            setProductName(product_name);
            images?.toString()?.replace(/\[/g, '')?.replace(/\]/g, '')?.replace(/"/g, '')?.replace(/\\/g, '')?.split(',')?.forEach((img, index) => {
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
            //setCustomParam(custom_parameter)
        }

        mode === MODE_BUYER ? getBuyerProducts(route.params.type, 0) : <></>

    }, [])

    function addToFilter(filterName, filterValue) {
        let arr = { name: filterName, value: filterValue }
        const index = prodFilters.findIndex(obj => obj.name === arr.name);
        if (index === -1) {
            setProdFilters([...prodFilters, arr])
        } else {
            const newArr = [...prodFilters];
            newArr.splice(index, 1, arr);
            setProdFilters(newArr);
        }
        getFilteredBuyerProducts(route.params.type, 0);
    }

    useEffect(() => {

        const obj = products.filter(obj => obj.product_name.toLowerCase().includes(query.toLowerCase()));

        query.length === 0 ? getBuyerProducts(route.params.type, 0) : setProducts(obj);

    }, [query])

    // const HeaderComponentFlatList = ({ }) => {
    //     return (
    //         <>
    //             <View style={styles.categoryContainer}>
    //                 <Text style={styles.categoryText}>{route.params.type}</Text>
    //             </View>
    //             <View style={{ alignItems: 'center' }}>
    //                 <View style={styles.parameterContainer}>
    //                     <Text style={styles.parameterText}>{'Product Name'}</Text>
    //                     <TextInput onChangeText={(text) => setNamefilteredProducts(text)} style={styles.parameterInput} placeholder='Item Name 1' />
    //                     {mode === MODE_BUYER ? <TouchableOpacity style={{ marginHorizontal: 10 }}>
    //                         {/* <Svg style={{ height: 24, width: 24, transform: [{ rotateZ: '-90deg' }] }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    //                             <Path
    //                                 d="M20 25a1 1 0 0 1-.71-.29l-8-8a1 1 0 0 1 0-1.42l8-8a1 1 0 1 1 1.42 1.42L13.41 16l7.3 7.29a1 1 0 0 1 0 1.42A1 1 0 0 1 20 25Z"
    //                                 data-name="Layer 2"
    //                                 fill={'#000000'}
    //                             />
    //                             <Path
    //                                 style={{
    //                                     fill: "none",
    //                                 }}
    //                                 d="M0 0h32v32H0z"
    //                             />
    //                         </Svg> */}
    //                     </TouchableOpacity> : <></>}
    //                 </View>
    //                 {route.params.parameters ?
    //                     route.params.parameters.map((parameter, index) => {
    //                         return (
    //                             parameter.type === 'options' ?
    //                                 <Pressable key={index} onPress={() => [setProdFilters([]), getBuyerProducts(route.params.type, 0)]} style={styles.parameterContainer}>
    //                                     <Text style={styles.parameterText}>{parameter.name}</Text>
    //                                     <FlatList showsHorizontalScrollIndicator={false} style={{ marginLeft: '2%' }} horizontal renderItem={item => (<OptionRender {...item} selected={prodFilters.find(o => o.name === parameter.name)?.value} onPress={(value) => [addToFilter(parameter.name, value)]} />)} data={parameter.options} />
    //                                 </Pressable>
    //                                 :
    //                                 <View key={index} style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
    //                                     <Pressable onPress={() => [setProdFilters([]), getBuyerProducts(route.params.type, 0)]} style={{
    //                                         width: '45%',
    //                                         paddingVertical: 5,
    //                                         backgroundColor: '#F8F8F8',
    //                                         borderRadius: 5,
    //                                         flexDirection: 'row',
    //                                         alignItems: 'center',
    //                                         paddingHorizontal: '2%',
    //                                         marginTop: '3%'
    //                                     }}>
    //                                         <Text style={{
    //                                             fontFamily: 'Poppins',
    //                                             color: '#B3B1B0',
    //                                             width: '70%'
    //                                         }}>{'Min ' + parameter.name}</Text>
    //                                         <View style={{ paddingVertical: 1, marginHorizontal: 10, width: 35, backgroundColor: '#FFFFFF' }}>
    //                                             <Text style={{ fontFamily: 'Poppins', textAlign: 'center', color: '#B3B1B0' }}>{parameter.min_default}</Text>
    //                                         </View>
    //                                     </Pressable>
    //                                     <Pressable onPress={() => [setProdFilters([]), getBuyerProducts(route.params.type, 0)]} style={{
    //                                         width: '45%',
    //                                         paddingVertical: 5,
    //                                         backgroundColor: '#F8F8F8',
    //                                         borderRadius: 5,
    //                                         flexDirection: 'row',
    //                                         alignItems: 'center',
    //                                         paddingHorizontal: '2%',
    //                                         marginTop: '3%'
    //                                     }}>
    //                                         <Text style={{
    //                                             fontFamily: 'Poppins',
    //                                             color: '#B3B1B0',
    //                                             width: '70%'
    //                                         }}>{'Max ' + parameter.name}</Text>
    //                                         <View style={{ paddingVertical: 1, marginHorizontal: 10, width: 35, backgroundColor: '#FFFFFF' }}>
    //                                             <Text style={{ fontFamily: 'Poppins', textAlign: 'center', color: '#B3B1B0' }}>{parameter.max_default}</Text>
    //                                         </View>
    //                                     </Pressable>
    //                                 </View>
    //                         )
    //                     })
    //                     : <></>}

    //             </View>
    //         </>
    //     )
    // }

    function backPressHandler() {
        navigation.goBack();
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
                        for (const img of result.assets.slice(0, productImage.length === 0 ? 4 : Math.abs(4 - (productImage.length - 1)))) {
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
                        for (const img of result.assets.slice(0, productImage.length === 0 ? 4 : Math.abs(4 - (productImage.length)))) {
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

    function getOptionalParamError() {
        const optionalParams = route.params.parameters.filter((param) => !param.optional);

        return optionalParams.every((param) => {
            return productParameters.map((productParam) => productParam.name).includes(param.name);
        });
    }

    function submitProductHandler() {

        if (!isEdit) {
            if (!getOptionalParamError()) {
                if (Platform.OS === 'android') {
                    return ToastAndroid.show('Please fill required Parameters', ToastAndroid.SHORT);
                }
                else {
                    return Alert.alert('Please fill required Parameters');
                }
            }
        }

        if (productName.length === 0){
            if (Platform.OS === 'android') {
                return ToastAndroid.show('Product name is required.', ToastAndroid.SHORT);
            }
            else {
                return Alert.alert('Product name is required.');
            }

        }

        if (productQuantity.toString().length === 0){
            if (Platform.OS === 'android') {
                return ToastAndroid.show('Product quantity is required.', ToastAndroid.SHORT);
            }
            else {
                return Alert.alert('Product quantity is required.');
            }

        }
        if (productPrice.length === 0){
            if (Platform.OS === 'android') {
                return ToastAndroid.show('Product price is required.', ToastAndroid.SHORT);
            }
            else {
                return Alert.alert('Product price is required.');
            }

        }
        if (productDescription.length === 0){
            if (Platform.OS === 'android') {
                return ToastAndroid.show('Product description is required.', ToastAndroid.SHORT);
            }
            else {
                return Alert.alert('Product is description required.');
            }

        }

        if (refreshing) return;


        navigation.popToTop();
        navigation.navigate('ProductDetail', {
            name: productName,
            parameters: productParameters,
            image: productImage || [],
            quantity: productQuantity,
            price: productPrice,
            description: productDescription,
            unit: value,
            preview: true,
            categoryType: route.params.isEdit ? route.params.product.catogery_type : route.params.type,
            id: id,
            isEdit: isEdit,
            customParameter: customParam,
        })
    }


    async function getBuyerProducts(category, count) {
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        const response = await fetch(BASE_URL + BUYER_ITEMS + `?catogery_type=${category}&count=${count}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-USER-SESSION-ID": sessionId
            },
        })

        const data = await response.json();

        if (data.error) {
            if (Platform.OS === 'android') {
                //return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
            }
            else {
                // return Alert.alert(data.error.description);
            }
        }

        setProducts(data.items);
    }


    async function getFilteredBuyerProducts(category, count) {
        const sessionId = await SecureStore.getItemAsync('SESSION_ID');
        const response = await fetch(BASE_URL + BUYER_ITEMS + `?catogery_type=${category}&parameters[0][name]=${prodFilters[0]?.name}&parameters[0][value]=${prodFilters[0]?.value}&parameters[1][name]=${prodFilters[1]?.name}&parameters[1][value_min]=${prodFilters[1]?.value}&parameters[1][value_max]=150&parameters[2][name]=${prodFilters[2]?.name}&parameters[2][value_min]=${prodFilters[2]?.value}&parameters[2][value_max]=1&page=1&count=${count}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-USER-SESSION-ID": sessionId
            },
        })

        const data = await response.json();

        if (data.error) {
            if (Platform.OS === 'android') {
                //return ToastAndroid.show(data.error.description, ToastAndroid.LONG);
            }
            else {
                // return Alert.alert(data.error.description);
            }
        }

        setProducts(data.items);
    }

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }

        if (mounted) {
            navigation.popToTop();
        }
    }, [mode]);

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
                                <TextInput style={[styles.parameterInput,{ borderRadius: 5 }]} value={productName} placeholder='Item Name 1' onChangeText={(name) => { setProductName(name) }} />
                            </View>

                            {
                                productParameters.map((parameter, index) => {
                                    return (
                                        <ProductFillSlot um={parameter.um} supportedUm={[]} key={index} name={parameter.name} value={parameter.value} productParameters={productParameters} setProductParameters={setProductParameters} />
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
                                <TextInput maxLength={5} value={productQuantity.toString()} style={[styles.parameterInput, { width: '22%', textAlign: 'center', height: 25, borderRadius: 5 }]} onChangeText={(quantity) => { setProductQuantity(quantity) }} />
                                <View style={{ marginLeft: '5%' }}>
                                    <DropDownMenu value={value} setValue={setValue} mapObject={units} />
                                </View>
                            </View>
                            <View style={styles.parameterContainer}>
                                <Text style={styles.parameterText}>{'Price'}</Text>
                                <TextInput value={productPrice.toString()} style={[styles.parameterInput, { fontSize: 14, borderRadius: 5 }]} onChangeText={(price) => { setProductPrice(price) }} />
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
                                            paddingVertical: 2,
                                            borderRadius: 5
                                        }, { height: 80, width: '62%' }]} value={productDescription} onChangeText={(description) => { setProductDescription(description) }} />
                                    </View>

                                    : <></>
                            }
                            <View style={[styles.parameterContainer, { justifyContent: 'space-evenly' }]}>
                                <TextInput style={[{
                                    backgroundColor: 'white',
                                    width: '45%',
                                    paddingHorizontal: '3%',
                                    fontFamily: 'Poppins',
                                    fontSize: 12,
                                    color: '#B3B1B0',
                                    fontSize: 12,
                                    borderRadius: 5
                                }, {}]} placeholder='custom Parameter' onChangeText={(v) => { setCustomParam({ ...customParam, name: v }) }} />
                                <TextInput style={[{
                                    backgroundColor: 'white',
                                    width: '45%',
                                    paddingHorizontal: '3%',
                                    fontFamily: 'Poppins',
                                    fontSize: 12,
                                    color: '#B3B1B0',
                                    fontSize: 12,
                                    borderRadius: 5
                                }, {}]} placeholder='custom Value' onChangeText={(v) => { setCustomParam({ ...customParam, value: v }) }} />
                            </View>
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
                                            <TextInput style={[styles.parameterInput, { borderRadius: 5 }]} placeholder='Item Name 1' onChangeText={(name) => { setProductName(name) }} />
                                        </View>

                                        {route.params.parameters ?
                                            route.params.parameters.map((parameter, index) => {

                                                return (
                                                    <ProductFillSlot um={parameter.default_um} supportedUm={parameter.supported_um} key={index} name={parameter.name} options={parameter.options} productParameters={productParameters} setProductParameters={setProductParameters} />
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
                                            <TextInput maxLength={5} style={[styles.parameterInput, { width: '22%', textAlign: 'center', height: 25, borderRadius: 5 }]} onChangeText={(quantity) => { setProductQuantity(quantity) }} />
                                            <View style={{ marginLeft: '5%' }}>
                                                <DropDownMenu value={value} setValue={setValue} mapObject={units} />
                                            </View>
                                        </View>
                                        <View style={styles.parameterContainer}>
                                            <Text style={styles.parameterText}>{'Price'}</Text>
                                            <TextInput style={[styles.parameterInput, { fontSize: 14, borderRadius: 5 }]} onChangeText={(price) => { setProductPrice(price) }} />
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
                                                        paddingVertical: 2,
                                                        borderRadius: 5
                                                    }, { height: 80, width: '62%' }]} onChangeText={(description) => { setProductDescription(description) }} />
                                                </View>

                                                : <></>
                                        }
                                        <View style={[styles.parameterContainer, { justifyContent: 'space-evenly' }]}>
                                            <TextInput style={[{
                                                backgroundColor: 'white',
                                                width: '45%',
                                                paddingHorizontal: '3%',
                                                fontFamily: 'Poppins',
                                                fontSize: 12,
                                                color: '#B3B1B0',
                                                fontSize: 12,
                                                borderRadius: 5
                                            }, {}]} placeholder='custom Parameter' onChangeText={(v) => { setCustomParam({ ...customParam, name: v }) }} />
                                            <TextInput style={[{
                                                backgroundColor: 'white',
                                                width: '45%',
                                                paddingHorizontal: '3%',
                                                fontFamily: 'Poppins',
                                                fontSize: 12,
                                                color: '#B3B1B0',
                                                fontSize: 12,
                                                borderRadius: 5
                                            }, {}]} placeholder='custom Value' onChangeText={(v) => { setCustomParam({ ...customParam, value: v }) }} />
                                        </View>
                                        <TouchableOpacity onPress={submitProductHandler} activeOpacity={0.6} style={{ alignSelf: 'flex-end', height: 60, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, backgroundColor: colors.primary[0], marginTop: '10%', borderRadius: 16, marginRight: '5%' }}>
                                            <Text style={{ fontFamily: 'Poppins', color: '#FFFFFF' }}>{'Preview and Submit'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                                :
                                <FlatList ListHeaderComponentStyle={{ width: '100%' }} ListHeaderComponent={<>
                                    <View style={styles.categoryContainer}>
                                        <Text style={styles.categoryText}>{route.params.type}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <View style={styles.parameterContainer}>
                                            <Text style={styles.parameterText}>{'Product Name'}</Text>
                                            <TextInput onChangeText={(value) => setQuery(value)}
                                                value={query} style={styles.parameterInput} placeholder='Item Name 1' />
                                            {mode === MODE_BUYER ? <TouchableOpacity style={{ marginHorizontal: 10 }}>
                                                {/* <Svg style={{ height: 24, width: 24, transform: [{ rotateZ: '-90deg' }] }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
                            </Svg> */}
                                            </TouchableOpacity> : <></>}
                                        </View>
                                        {route.params.parameters ?
                                            route.params.parameters.map((parameter, index) => {
                                                return (
                                                    parameter.type === 'options' ?
                                                        <Pressable key={index} onPress={() => [setProdFilters([]), getBuyerProducts(route.params.type, 0)]} style={styles.parameterContainer}>
                                                            <Text style={styles.parameterText}>{parameter.name}</Text>
                                                            <FlatList showsHorizontalScrollIndicator={false} style={{ marginLeft: '2%' }} horizontal renderItem={item => (<OptionRender {...item} selected={prodFilters.find(o => o.name === parameter.name)?.value} onPress={(value) => prodFilters.find(o => o.name === parameter.name)?.value === value ? [setProdFilters([]), getBuyerProducts(route.params.type, 0)] : addToFilter(parameter.name, value)} />)} data={parameter.options} />
                                                        </Pressable>
                                                        :
                                                        <View key={index} style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                                                            <Pressable onPress={() => [setProdFilters([]), getBuyerProducts(route.params.type, 0)]} style={{
                                                                width: '45%',
                                                                paddingVertical: 5,
                                                                backgroundColor: '#F8F8F8',
                                                                borderRadius: 5,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                paddingHorizontal: '2%',
                                                                marginTop: '3%'
                                                            }}>
                                                                <Text style={{
                                                                    fontFamily: 'Poppins',
                                                                    color: '#B3B1B0',
                                                                    width: '70%'
                                                                }}>{'Min ' + parameter.name}</Text>
                                                                <View style={{ paddingVertical: 1, marginHorizontal: 10, width: 35, backgroundColor: '#FFFFFF' }}>
                                                                    <Text style={{ fontFamily: 'Poppins', textAlign: 'center', color: '#B3B1B0' }}>{parameter.min_default}</Text>
                                                                </View>
                                                            </Pressable>
                                                            <Pressable onPress={() => [setProdFilters([]), getBuyerProducts(route.params.type, 0)]} style={{
                                                                width: '45%',
                                                                paddingVertical: 5,
                                                                backgroundColor: '#F8F8F8',
                                                                borderRadius: 5,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                paddingHorizontal: '2%',
                                                                marginTop: '3%'
                                                            }}>
                                                                <Text style={{
                                                                    fontFamily: 'Poppins',
                                                                    color: '#B3B1B0',
                                                                    width: '70%'
                                                                }}>{'Max ' + parameter.name}</Text>
                                                                <View style={{ paddingVertical: 1, marginHorizontal: 10, width: 35, backgroundColor: '#FFFFFF' }}>
                                                                    <Text style={{ fontFamily: 'Poppins', textAlign: 'center', color: '#B3B1B0' }}>{parameter.max_default}</Text>
                                                                </View>
                                                            </Pressable>
                                                        </View>
                                                )
                                            })
                                            : <></>}

                                    </View>
                                </>
                                } style={{ marginTop: 20 }} contentContainerStyle={{ paddingBottom: 90, alignItems: 'center' }} showsVerticalScrollIndicator={false} data={products} renderItem={item => <BuyerCategoryListRender imageUri={item.item.images?.toString()?.replace(/\[/g, '')?.replace(/\]/g, '')?.replace(/"/g, '')?.replace(/\\/g, '')?.split(',')[0]} onPress={() => navigation.navigate('ProductDetail', {
                                    preview: false,
                                    name: item.item.product_name,
                                    description: item.item.product_description,
                                    price: item.item.price,
                                    quantity: item.item.quantity,
                                    unit: item.item.quantity_um,
                                    image: item.item.images?.toString()?.replace(/\[/g, '')?.replace(/\]/g, '')?.replace(/"/g, '')?.replace(/\\/g, '')?.split(','),
                                    id: item.item.id,
                                    merchantId: item.item.merchant_id
                                })} {...item} />} numColumns={2} />
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