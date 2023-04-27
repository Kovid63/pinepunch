import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import { itemsForSale } from '../../dummydata/dummydata'
import { BuyerCategoryListRender } from '../../components/BuyerCategoryListRender'

const CompanyPage = ({ navigation, route }) => {

    const HeaderComponentFlatlist = () => {
        return (<>
            <View style={{ height: 200, width: '75%', alignSelf: 'center', marginTop: '5%' }}>
                <Image style={{ height: '100%', width: '100%', borderRadius: 16 }} source={{ uri: 'https://i0.wp.com/www.msicertified.com/wp-content/uploads/2022/01/pexels-photo-269077.jpeg?resize=1024%2C682&ssl=1' }} />
            </View>
            <View style={{ marginTop: '10%', marginLeft: '13%' }}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Location: '}<Text style={{ fontFamily: 'PoppinsSemiBold' }}>{'Electronic city, Bangalore'}</Text></Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Email: '}<Text style={{ fontFamily: 'PoppinsSemiBold' }}>{'gmail.com'}</Text></Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Contact No: '}<Text style={{ fontFamily: 'PoppinsSemiBold' }}>{'9898989898'}</Text></Text>
            </View>
            <Text style={{ marginHorizontal: '5%', fontFamily: 'PoppinsSemiBold', marginTop: '5%' }}>{'Products on sale'}</Text>
        </>)
    }

    function backPressHandler() {
        navigation.goBack();
    }

    function productDetailHandler() {
        navigation.navigate('ProductDetail', {
            preview: false
        });
    }


    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'xyz Company'} />
            <FlatList style={{ marginTop: 20 }} ListHeaderComponentStyle={{ width: '100%' }} ListHeaderComponent={HeaderComponentFlatlist} contentContainerStyle={{ paddingBottom: 90, alignItems: 'center' }} showsVerticalScrollIndicator={false} data={itemsForSale} renderItem={item => <BuyerCategoryListRender onPress={productDetailHandler} {...item} />} numColumns={2} />
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: colors.background
    }
})

export default CompanyPage