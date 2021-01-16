import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  Button, View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import api from '../../services/api.js';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>Person: {item.name}</Text>
    <Text style={styles.title}>Place: {item.local}</Text>
    <Text style={styles.title}>Date Visit: {item.date1}</Text>
    <Text style={styles.title}>Date Covid: {item.dateCovid}</Text>
    <Text style={styles.title}>Date I visited: {item.date2}</Text>
  </View>
);

export default function LiveWith({ route, navigation }) {
  const [idPerson, setIdPerson] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([{}]);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('ID');
      const response = await api.get(`/get_infected_contact?personId=${value}`, {
        personId: +value,
      });
      // console.log(+value);
      if (response.data.length == 0) {
        Alert.alert('Alert!', 'Empty list!');
        navigation.pop();
      }

      // console.log(response.data);
      setData(response.data);
      console.log(response.data);
      const newData = response.data.map((item) => {
        // console.log(item);
        const obj = {
          id: item.id,
          name: item.name,
          local: item.localName,
          date1: moment(item.visitOther).format('MM/DD/YYYY'),
          date2: moment(item.visitMe).format('MM/DD/YYYY'),
          dateCovid: moment(item.visitCovid).format(
            'MM/DD/YYYY',
          ),
        };
        return obj;
      });
      setData(newData);

      setLoading(false);
    })();
  }, []);

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
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
