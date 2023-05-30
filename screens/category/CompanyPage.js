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


    const { name, seller_background_image_url, seller_email, address, seller_contact  } = route.params;

    

    const HeaderComponentFlatlist = () => {
        return (<>
            <View style={{ height: 200, width: '75%', alignSelf: 'center', marginTop: '5%' }}>
                <Image style={{ height: '100%', width: '100%', borderRadius: 16 }} source={{ uri: seller_background_image_url }} />
            </View>
            <View style={{ marginTop: '10%', marginLeft: '13%' }}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Location: '}<Text style={{ fontFamily: 'PoppinsSemiBold' }}>{address}</Text></Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Email: '}<Text style={{ fontFamily: 'PoppinsSemiBold' }}>{seller_email}</Text></Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: '#B3B1B0' }}>{'Contact No: '}<Text style={{ fontFamily: 'PoppinsSemiBold' }}>{seller_contact}</Text></Text>
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
            <Header onPress={backPressHandler} pageTitle={name} />
            <FlatList style={{ marginTop: 20 }} ListHeaderComponentStyle={{ width: '100%' }} ListHeaderComponent={HeaderComponentFlatlist} contentContainerStyle={{ paddingBottom: 90, alignItems: 'center' }} showsVerticalScrollIndicator={false} data={{}} renderItem={item => <BuyerCategoryListRender onPress={productDetailHandler} {...item} />} numColumns={2} />
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