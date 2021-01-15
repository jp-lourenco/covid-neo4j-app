import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Button,
} from 'react-native';

export default function Home({ navigation }) {
    const handleNavigation = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>COVID-19 NEO4J</Text>
            <Text style={styles.text}>Seja Bem-vindo</Text>
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
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 30,
    },
    buttonContinuar: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
});
