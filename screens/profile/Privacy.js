import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Header from '../../components/Header'
import { ScrollView } from 'react-native'

const Privacy = ({ navigation }) => {

    function backPressHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header onPress={backPressHandler} pageTitle={'Privacy'} />
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{'Terms of Use'}</Text>
                </View>
                <Text style={styles.text}>{'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste rem nihil, ratione, deserunt non saepe facere placeat perferendis fugit reprehenderit reiciendis natus modi possimus culpa porro quis suscipit officia illo accusamus? Aspernatur modi beatae voluptas dolorum. Natus fugiat, veritatis eveniet incidunt deserunt aut earum quaerat rerum ducimus quibusdam atque exercitationem nemo aliquam fugit. Magnam deleniti id ex eveniet debitis earum similique aspernatur labore beatae iusto, tenetur dolores accusantium, laboriosam, natus adipisci porro accusamus perspiciatis est ipsam quam corporis minus officiis voluptatibus. Rerum animi magnam officia molestias! Sit ad impedit possimus, adipisci ea eum et suscipit quae magnam perspiciatis, aliquam minima? In animi laudantium minus!'}</Text>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{'PetApp Service'}</Text>
                </View>
                <Text style={styles.text}>{'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste rem nihil, ratione, deserunt non saepe facere placeat perferendis fugit reprehenderit reiciendis natus modi possimus culpa porro quis suscipit officia illo accusamus? Aspernatur modi beatae voluptas dolorum. Natus fugiat, veritatis eveniet incidunt deserunt aut earum quaerat rerum ducimus quibusdam atque exercitationem nemo aliquam fugit. Magnam deleniti id ex eveniet debitis earum similique aspernatur labore beatae iusto, tenetur dolores accusantium, laboriosam, natus adipisci porro accusamus perspiciatis est ipsam quam corporis minus officiis voluptatibus. Rerum animi magnam officia molestias! Sit ad impedit possimus, adipisci ea eum et suscipit quae magnam perspiciatis, aliquam minima? In animi laudantium minus!'}</Text>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: '5%'
    },

    titleContainer: {
        marginTop: '10%',
        marginHorizontal: '3%'
    },

    titleText: {
        fontFamily: 'PoppinsBold',
        fontSize: 16
    },

    text: {
        fontFamily: 'Poppins',
        marginHorizontal: '3%',
        marginTop: '5%',
        color: '#B3B1B0'
    },

    scroll: {
        flex: 1,
        marginBottom: 80
    },

})

export default Privacy;