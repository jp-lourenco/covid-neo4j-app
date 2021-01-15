import React, { useState, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Button,
    BackHandler,
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';

export default function Scan({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [cameraStatus, setCameraStatus] = useState(false);

    const handleNavigation = () => {
        navigation.navigate('Create');
    };

    const covid = async () => {
        const response = await api.post('create_has', { personId: 1 });
        console.log(response);
    };

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => BackHandler.exitApp() },
                ]);
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress,
                );
        }, []),
    );

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const onBarCodeRead = async (e) => {
        setScanned(true);
        setCameraStatus(false);
        const response = await api.post('create_visit', {
            personId: 1,
            placeId: e.data,
        });
        console.log(response);
    };

    const closeCamera = () => {
        setCameraStatus(false);
    };

    const showCamera = () => {
        setCameraStatus(true);
        setScanned(false);
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {cameraStatus ? (
                <View style={styles.container}>
                    <Camera
                        ref={(ref) => {
                            this.camera = ref;
                        }}
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.back}
                        flashMode={'auto'}
                        barCodeScannerSettings={{
                            barCodeTypes: [
                                BarCodeScanner.Constants.BarCodeType.qr,
                            ],
                        }}
                        onBarCodeScanned={scanned ? undefined : onBarCodeRead}
                    ></Camera>
                    <View style={styles.overlay}>
                        <View style={styles.unfocusedContainer}></View>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                height: 25,
                                width: 25,
                                borderRadius: 50,
                                left: 30,
                                right: 0,
                                top: 50,
                                bottom: 0,
                                backgroundColor: '#fff',
                                paddingLeft: 5,
                            }}
                            onPress={closeCamera}
                        >
                            <Ionicons name="md-close" size={25} color="black" />
                        </TouchableOpacity>
                        <View style={styles.middleContainer}>
                            <View style={styles.unfocusedContainer}></View>
                            <View style={styles.focusedContainer}></View>
                            <View style={styles.unfocusedContainer}></View>
                        </View>
                        <View style={styles.unfocusedContainer}></View>
                    </View>
                </View>
            ) : (
                <View style={styles.containerButton}>
                    <View style={styles.button}>
                        <Button onPress={showCamera} title="Show Camera" />
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={handleNavigation}
                            title="Create Place"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={covid} title="I have Covid" />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    containerButton: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cameraIcon: {
        margin: 5,
        height: 40,
        width: 40,
    },
    closeButton: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 20,
        padding: 20,
        backgroundColor: '#fff',
    },
    bottomOverlay: {
        position: 'absolute',
        width: '100%',
        flex: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonCamera: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    button: {
        padding: 10,
        marginTop: 20,
    },
    buttonTorch: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    unfocusedContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    middleContainer: {
        flexDirection: 'row',
        flex: 1.5,
    },
    focusedContainer: {
        flex: 6,
    },
});