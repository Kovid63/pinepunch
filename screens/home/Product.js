import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { colors } from '../../colors';
import { ListRender } from '../../components/ListRender';
import SearchBar from '../../components/SearchBar';
import { itemsForSale } from '../../dummydata/dummydata';

const Product = ({ route, navigation }) => {


    function backPressHandler() {
        navigation.goBack();
    }



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={backPressHandler} style={styles.bellIconContainer}>
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
                <View style={styles.searchBarContainer}>
                    <SearchBar />
                </View>
            </View>
            <View style={styles.middle}>
                <View>
                    <Text style={styles.headingText}>{'Items for sale'}</Text>
                </View>
            </View>
            <FlatList contentContainerStyle={{ alignItems: 'center', paddingBottom: 90 }} showsVerticalScrollIndicator={false} data={route.params.products} renderItem={(item) => <ListRender onPress={() => navigation.navigate('ProductDetail', {
                preview: false
            })} {...item} />} numColumns={2} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '5%',
        marginTop: '15%',
        justifyContent: 'space-between'
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

    searchBarContainer: {
        width: '80%',
        alignSelf: 'center'
    },

    middle: {
        flexDirection: 'row',
        paddingHorizontal: '8%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '5%'
    },

    headingText: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17
    },

    listContainer: {
        paddingHorizontal: '3%',
    }

})

export default Product