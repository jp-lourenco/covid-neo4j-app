import React, { useState, useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import api from '../../services/api.js';
import AsyncStorage from '@react-native-community/async-storage';
const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
);

export default function LiveWith({ route, navigation }) {
    const [selectedId, setSelectedId] = useState(null);
    const [idPerson1, setIdPerson1] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([{}]);

    useEffect(() => {
        (async () => {
            const response = await api.get(
                `/get_people?filter=${route.params.name}`,
            );
            if (response.data.length < 0) {
                Alert.alert('Alert!', 'Empty list!', {
                    text: 'OK',
                    onPress: () => navigation.pop(),
                });
            }
            console.log(response.data);
            setData(response.data);
            const value = await AsyncStorage.getItem('ID');
            if (value) {
                setIdPerson1(+value);
            }
            setLoading(false);
        })();
    }, []);

    const liveWith = async () => {
        try {
            if (selectedId != null) {
                console.log(selectedId);
                const response = await api.post('/create_liveWith', {
                    personId1: idPerson1,
                    personId2: selectedId,
                });
                Alert.alert('Created live with!');
            } else {
                Alert.alert('Alert', 'Please select a person');
                return;
            }
        } catch (err) {
            console.log(err);
            Alert.alert('Something went wrong!');
        }
    };

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#04ee8f' : '#00ffff';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {!loading && (
                <>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={selectedId}
                    />
                    <Button
                        style={styles.buttonContinuar}
                        onPress={() => liveWith()}
                        title="Live with"
                    />
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
