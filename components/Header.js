import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Path, Svg } from 'react-native-svg'

const Header = ({pageTitle, onPress}) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onPress} style={styles.backIconContainer}>
                <Svg style={styles.backIcon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
                <Text style={styles.titleText}>{pageTitle}</Text>
            </View>
            <View style={{ width: '10%' }} />
        </View>
    )
}

const styles = StyleSheet.create({
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

    backIconContainer: {
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 15,
        elevation: 1
    },

    backIcon: {
        height: 30,
        width: 30
    },
})

export default Header;