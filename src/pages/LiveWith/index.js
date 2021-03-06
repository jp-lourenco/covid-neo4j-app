import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';

export default function LiveWith({ navigation }) {
    const [name, setName] = useState('');

    const handleNavigation = (route) => {
        if (name.length < 3) {
            Alert.alert('Alert', 'Please type more then 2 words');
            return;
        }
        navigation.navigate(route, { name: name });
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
                onPress={() => handleNavigation('List')}
                title="Search"
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
