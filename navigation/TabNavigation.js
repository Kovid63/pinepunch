import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { View } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { ModeContext } from '../contexts/ModeContext';
import { HomeStack } from './HomeStack';
import { CategoryStack } from './CategoryStack';
import { ProfileStack } from './ProfileStack';
import { FavouriteStack } from './FavouriteStack';
import { EditStack } from './EditStack';
import { UserContext } from '../contexts/UserContext';
import { Platform } from 'react-native';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

    const { mode } = useContext(ModeContext);
    const { initialScreen } = useContext(UserContext);


    function handleBackButton() {
        BackHandler.exitApp();
        return true;
    }

    useEffect(() => {
        if (initialScreen === 'ProfileStack') {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp();
                return true;
            });

            return () => backHandler.remove();
        }
    }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={initialScreen}
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    lazy: true,
                    tabBarStyle: {
                        position: 'absolute',
                        elevation: 0,
                        borderTopWidth: 0,
                        height: 80,
                        paddingHorizontal: 20
                    },
                    tabBarBackground: () => (
                        <View
                            style={{
                                backgroundColor: '#F8F8F8',
                                height: '100%',
                                width: '100%',
                                alignSelf: 'center',
                                elevation: 5,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}></View>
                    ),
                }}>

                {/* Home */}

                <Tab.Screen
                    name="HomeStack"
                    listeners={{
                        tabPress: e => {

                            if (initialScreen === 'ProfileStack') {
                                if (Platform.OS === 'android') {
                                    ToastAndroid.show('This is locked, your account is in review please wait.', ToastAndroid.SHORT);
                                }
                                else {
                                    Alert.alert('This is locked, your account is in review please wait.');
                                }
                                e.preventDefault();
                            }

                        },
                    }}
                    component={HomeStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={styles.tabBarIconContainer}>
                                {focused ? (
                                    <>
                                        <Svg style={styles.tabBarIconImage} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                            <Path
                                                d="M9.135 20.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 0 0 2.443-1 3.41 3.41 0 0 0 1.013-2.422V9.867c0-.735-.328-1.431-.895-1.902l-6.671-5.29a3.097 3.097 0 0 0-3.949.072L3.467 7.965A2.474 2.474 0 0 0 2.5 9.867v8.702C2.5 20.464 4.047 22 5.956 22h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009Z"
                                                fill="#FD9340"
                                                fillRule="nonzero"
                                            />
                                        </Svg>
                                        <View
                                            style={styles.tabBarIconDot}></View>
                                    </>
                                ) : (
                                    <>
                                        <Svg style={styles.tabBarIconImage} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                            <Path
                                                d="M13.717 15.291a2.18 2.18 0 0 1 2.184 2.17v3.075c0 .257.206.463.47.47h1.906c1.502 0 2.723-1.207 2.723-2.689V9.593c-.007-.51-.25-.99-.667-1.309L13.74 3.026a2.416 2.416 0 0 0-3.011.002L4.18 8.282A1.675 1.675 0 0 0 3.5 9.61v8.707c0 1.482 1.22 2.688 2.723 2.688h1.924a.486.486 0 0 0 .49-.479c0-.058.008-.116.02-.17V17.46c0-1.189.974-2.16 2.169-2.169h2.89Zm4.56 7.214h-1.924c-1.102-.026-1.952-.89-1.952-1.969V17.46a.677.677 0 0 0-.684-.669H10.83a.677.677 0 0 0-.674.67v3.065c0 .075-.01.147-.031.215a1.99 1.99 0 0 1-1.98 1.764H6.224C3.893 22.505 2 20.626 2 18.317V9.603A3.154 3.154 0 0 1 3.259 7.1l6.535-5.245a3.912 3.912 0 0 1 4.88-.002l6.582 5.25a3.158 3.158 0 0 1 1.244 2.48v8.734c0 2.31-1.894 4.188-4.223 4.188Z"
                                                fill="#B3B1B0"
                                                fillRule="evenodd"
                                            />
                                        </Svg>
                                    </>
                                )}
                            </View>
                        ),
                    }}
                />

                {/* Category */}

                <Tab.Screen
                    name="CategoryStack"
                    listeners={{
                        tabPress: e => {
                            if (initialScreen === 'ProfileStack') {
                                if (Platform.OS === 'android') {
                                    ToastAndroid.show('This is locked, your account is in review please wait.', ToastAndroid.SHORT);
                                }
                                else {
                                    Alert.alert('This is locked, your account is in review please wait.');
                                }
                                e.preventDefault();
                            }
                        },
                    }}
                    component={CategoryStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={styles.tabBarIconContainer}>
                                {focused ? (
                                    <>
                                        <Svg style={{height: 35, width: 35}} className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                            <Path fill={"#FD9340"} d="M120 48v64a7.995 7.995 0 0 1-8 8H48a7.995 7.995 0 0 1-8-8V48a7.995 7.995 0 0 1 8-8h64a7.995 7.995 0 0 1 8 8Zm88-8h-64a7.995 7.995 0 0 0-8 8v64a7.995 7.995 0 0 0 8 8h64a7.995 7.995 0 0 0 8-8V48a7.995 7.995 0 0 0-8-8Zm-96 96H48a7.995 7.995 0 0 0-8 8v64a7.995 7.995 0 0 0 8 8h64a7.995 7.995 0 0 0 8-8v-64a7.995 7.995 0 0 0-8-8Zm96 0h-64a7.995 7.995 0 0 0-8 8v64a7.995 7.995 0 0 0 8 8h64a7.995 7.995 0 0 0 8-8v-64a7.995 7.995 0 0 0-8-8Z" />
                                        </Svg>
                                        <View
                                            style={styles.tabBarIconDot}></View>
                                    </>
                                ) : (
                                    <>
                                        <Svg style={{height: 35, width: 35}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                            <Path fill={"#B3B1B0"} d="M112 42H48a6 6 0 0 0-6 6v64a6 6 0 0 0 6 6h64a6 6 0 0 0 6-6V48a6 6 0 0 0-6-6Zm-6 64H54V54h52Zm102-64h-64a6 6 0 0 0-6 6v64a6 6 0 0 0 6 6h64a6 6 0 0 0 6-6V48a6 6 0 0 0-6-6Zm-6 64h-52V54h52Zm-90 32H48a6 6 0 0 0-6 6v64a6 6 0 0 0 6 6h64a6 6 0 0 0 6-6v-64a6 6 0 0 0-6-6Zm-6 64H54v-52h52Zm102-64h-64a6 6 0 0 0-6 6v64a6 6 0 0 0 6 6h64a6 6 0 0 0 6-6v-64a6 6 0 0 0-6-6Zm-6 64h-52v-52h52Z" />
                                        </Svg>
                                    </>
                                )}
                            </View>
                        ),
                    }}
                />

                {/* Edit and Liked Sections based on mode */}

                {mode == 'Seller' ? <Tab.Screen
                    name="EditStack"
                    listeners={{
                        tabPress: e => {
                            if (initialScreen === 'ProfileStack') {
                                if (Platform.OS === 'android') {
                                    ToastAndroid.show('This is locked, your account is in review please wait.', ToastAndroid.SHORT);
                                }
                                else {
                                    Alert.alert('This is locked, your account is in review please wait.');
                                }
                                e.preventDefault();
                            }
                        },
                    }}
                    component={EditStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={styles.tabBarIconContainer}>
                                {focused ? (
                                    <>
                                        <Svg style={styles.tabBarIconImage} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                            <Path
                                                d="M16.665 2.01A5.323 5.323 0 0 1 20.591 3.4a5.381 5.381 0 0 1 1.399 3.936v9.33a5.373 5.373 0 0 1-1.389 3.936 5.346 5.346 0 0 1-3.936 1.389h-9.33A5.332 5.332 0 0 1 3.399 20.6a5.332 5.332 0 0 1-1.389-3.936v-9.33A5.332 5.332 0 0 1 3.4 3.399 5.332 5.332 0 0 1 7.335 2.01Zm-.26 4.566a1.58 1.58 0 0 0-2.237 0l-.67.679c-.1.1-.1.27 0 .37l.055.054.246.244.497.496.605.604c.126.126.21.211.216.22.11.12.18.28.18.46 0 .359-.29.659-.66.659-.17 0-.33-.07-.44-.18L12.53 8.524a.217.217 0 0 0-.3 0l-4.765 4.765a1.8 1.8 0 0 0-.53 1.238l-.06 2.368c0 .13.04.25.13.34.09.09.21.14.34.14h2.347c.48 0 .94-.19 1.29-.53l6.722-6.743c.61-.62.61-1.618 0-2.228Z"
                                                fill="#FD9340"
                                                fillRule="nonzero"
                                            />
                                        </Svg>
                                        <View
                                            style={styles.tabBarIconDot}></View>
                                    </>
                                ) : (
                                    <>
                                        <Svg style={styles.tabBarIconImage} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                            <Path
                                                d="M11.492 2.037a.75.75 0 0 1 0 1.5H7.753C5.17 3.537 3.5 5.307 3.5 8.046v8.314c0 2.739 1.67 4.509 4.253 4.509h8.824c2.584 0 4.254-1.77 4.254-4.51v-4.027a.75.75 0 0 1 1.5 0v4.028c0 3.594-2.313 6.009-5.754 6.009H7.753c-3.44 0-5.753-2.415-5.753-6.01V8.047c0-3.594 2.312-6.01 5.753-6.01h3.74Zm8.71.878 1.217 1.217c.593.592.919 1.38.918 2.217 0 .838-.326 1.624-.918 2.215l-7.51 7.51a2.902 2.902 0 0 1-2.064.854H8.099a.75.75 0 0 1-.75-.769l.094-3.779a2.912 2.912 0 0 1 .854-1.992l7.474-7.473a3.14 3.14 0 0 1 4.43 0Zm-5.047 2.736L9.358 11.45a1.413 1.413 0 0 0-.415.968l-.075 3.011h2.977c.38 0 .736-.147 1.005-.416l5.832-5.834-3.527-3.527Zm1.676-1.675-.616.614 3.527 3.528.617-.615c.308-.308.478-.718.478-1.154 0-.437-.17-.848-.478-1.156l-1.217-1.217a1.64 1.64 0 0 0-2.311 0Z"
                                                fill="#B3B1B0"
                                                fillRule="evenodd"
                                            />
                                        </Svg>
                                    </>
                                )}
                            </View>
                        ),
                    }}
                /> : <Tab.Screen
                    name="FavouriteStack"
                    listeners={{
                        tabPress: e => {
                            if (initialScreen === 'ProfileStack') {
                                if (Platform.OS === 'android') {
                                    ToastAndroid.show('This is locked, your account is in review please wait.', ToastAndroid.SHORT);
                                }
                                else {
                                    Alert.alert('This is locked, your account is in review please wait.');
                                }
                                e.preventDefault();
                            }
                        },
                    }}
                    component={FavouriteStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={styles.tabBarIconContainer}>
                                {focused ? (
                                    <>
                                        <Svg style={styles.tabBarIconImage} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                            <Path
                                                d="M8.28 2.5c.63.02 1.24.13 1.83.33h.06c.04.02.07.04.09.06.22.07.43.15.63.26l.38.17c.15.08.33.23.43.29.1.06.21.12.3.19a6.264 6.264 0 0 1 3.85-1.3c.63 0 1.26.09 1.86.29 3.69 1.2 5.02 5.25 3.91 8.79a12.728 12.728 0 0 1-3.01 4.81 38.456 38.456 0 0 1-6.33 4.96l-.25.15-.26-.16a38.094 38.094 0 0 1-6.37-4.96 12.933 12.933 0 0 1-3.01-4.8c-1.13-3.54.2-7.59 3.93-8.81.29-.1.59-.17.89-.21h.12c.28-.04.56-.06.84-.06Zm8.91 3.16a.8.8 0 0 0-1.01.5c-.14.42.08.88.5 1.03.64.24 1.07.87 1.07 1.57v.03a.86.86 0 0 0 .19.62c.14.17.35.27.57.29.41-.01.76-.34.79-.76v-.12a3.3 3.3 0 0 0-2.11-3.16Z"
                                                fill="#FD9340"
                                                fillRule="nonzero"
                                            />
                                        </Svg>
                                        <View
                                            style={styles.tabBarIconDot}></View>
                                    </>
                                ) : (
                                    <>
                                        <Svg style={styles.tabBarIconImage} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                            <Path
                                                d="M12.235 4.039c1.626-1.028 3.786-1.312 5.652-.714 4.059 1.309 5.319 5.734 4.192 9.255-1.74 5.53-9.166 9.655-9.481 9.828a.743.743 0 0 1-.72.002c-.312-.171-7.685-4.235-9.482-9.829l-.001-.001c-1.128-3.522.128-7.948 4.183-9.255a6.729 6.729 0 0 1 5.657.714Zm-5.197.714c-3.281 1.058-4.105 4.587-3.214 7.37 1.402 4.362 6.94 7.889 8.413 8.762 1.477-.882 7.056-4.448 8.413-8.758.89-2.786.064-6.315-3.222-7.374-1.592-.511-3.45-.2-4.731.792a.75.75 0 0 1-.91.006 5.234 5.234 0 0 0-4.75-.798Zm9.43 1.986a3.525 3.525 0 0 1 2.435 3.075.75.75 0 0 1-1.496.122 2.024 2.024 0 0 0-1.4-1.77.75.75 0 0 1 .46-1.427Z"
                                                fill="#B3B1B0"
                                                fillRule="evenodd"
                                            />
                                        </Svg>
                                    </>
                                )}
                            </View>
                        ),
                    }}
                />}

                {/* Profile */}

                <Tab.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    listeners={{
                        blur: () => BackHandler.addEventListener('hardwareBackPress', () => { })
                    }}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={styles.tabBarIconContainer}>
                                {focused ? (
                                    <>
                                        <Svg style={styles.tabBarIconImage} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                            <Path
                                                d="M12 15.174c4.339 0 8 .705 8 3.425C20 21.32 16.315 22 12 22c-4.338 0-8-.705-8-3.425 0-2.721 3.685-3.401 8-3.401ZM12 2a5.273 5.273 0 0 1 5.294 5.291A5.274 5.274 0 0 1 12 12.583a5.275 5.275 0 0 1-5.294-5.292A5.274 5.274 0 0 1 12 2Z"
                                                fill="#FD9340"
                                                fillRule="nonzero"
                                            />
                                        </Svg>
                                        <View
                                            style={styles.tabBarIconDot}></View>
                                    </>
                                ) : (
                                    <>
                                        <Svg style={styles.tabBarIconImage} viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                            <Path
                                                d="M19.84 18.193c0 3.296-4.52 3.677-7.92 3.677h-.242C9.512 21.865 4 21.728 4 18.173c0-3.229 4.338-3.66 7.711-3.676h.453c2.166.005 7.676.141 7.676 3.696Zm-7.92-2.197c-4.26 0-6.42.732-6.42 2.177 0 1.458 2.16 2.197 6.42 2.197s6.42-.732 6.42-2.177c0-1.458-2.16-2.197-6.42-2.197ZM11.92 2a5.315 5.315 0 0 1 5.31 5.31 5.314 5.314 0 0 1-5.31 5.309h-.031a5.3 5.3 0 0 1-5.28-5.312A5.316 5.316 0 0 1 11.922 2Zm0 1.428A3.887 3.887 0 0 0 8.039 7.31a3.873 3.873 0 0 0 3.854 3.882l.029.714v-.714A3.886 3.886 0 0 0 15.8 7.31a3.886 3.886 0 0 0-3.88-3.882Z"
                                                fill="#B3B1B0"
                                                fillRule="evenodd"
                                            />
                                        </Svg>
                                    </>
                                )}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({

    tabBarIconContainer: {
        alignItems: 'center',
        height: '90%',
        justifyContent: 'center',
    },

    tabBarIconImage: {
        height: 30,
        width: 30
    },

    tabBarIconDot: {
        height: 8,
        width: 8,
        backgroundColor: '#FD9340',
        borderRadius: 4,
        marginTop: 5,
    }
})

export default TabNavigation