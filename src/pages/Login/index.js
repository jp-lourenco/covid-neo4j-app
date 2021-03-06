import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api.js';

export default function Login({ navigation }) {
    const [name, setName] = useState('');

    const [nif, setNif] = useState('');

    const [age, setAge] = useState('');

    const handleNavigation = async () => {
        try {
            const response = await api.post('/create_person', {
                name: name,
                nif: nif,
                age: age,
            });
            console.log(response.data);
            await AsyncStorage.setItem('ID', response.data.id.toString());
            Alert.alert(`${response.data.name} created!`);
            navigation.navigate('Scan');
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
                required
            />
            <TextInput
                style={styles.input}
                placeholder="NIF"
                keyboardType="numeric"
                onChangeText={(nif) => setNif(nif)}
                defaultValue={nif}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                onChangeText={(age) => setAge(age)}
                defaultValue={age}
            />
            <Button
                style={styles.buttonContinuar}
                onPress={() => handleNavigation()}
                title="Continue"
            />
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
