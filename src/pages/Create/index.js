import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    Dimensions,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import api from '../../services/api.js';

export default function Create({ navigation }) {
    const [name, setName] = useState('');
    const windowWidth = Dimensions.get('window').width;
    const [qrcode, setQrcode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNavigation = async () => {
        try {
            const response = await api.post('/create_place', { name: name });
            console.log(response.data.id);
            Alert.alert(`${response.data.name} created!`);
            setQrcode(response.data.id.toString());
        } catch (err) {
            console.log(err);
            Alert.alert('Something went wrong!');
        }
    };

    return (
        <View styles={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(name) => setName(name)}
                defaultValue={name}
            />
            <Button
                style={styles.buttonContinuar}
                onPress={() => handleNavigation()}
                title="Create"
            />
            {!loading && qrcode != '' ? (
                <>
                    <QRCode size={windowWidth} content={qrcode} />

                    <Button
                        style={styles.buttonContinuar}
                        onPress={() => handleNavigation()}
                        title="Download QRCode"
                    />
                </>
            ) : (
                <ActivityIndicator />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    input: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        borderColor: '#000',
    },
    buttonContinuar: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
});
