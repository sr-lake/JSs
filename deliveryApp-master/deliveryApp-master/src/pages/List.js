import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, RefreshControl, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import api from '../services/api';

export default function List({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function getLists() {
      const response = await api.get('/');
      setLists(response.data);
    }

    getLists();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const response = await api.get('/');
    setLists(response.data);
    setRefreshing(false);
  }, [refreshing]);

  return (
    <ScrollView style={styles.scroll} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>Olá, Nome do usuário</Text>
      </View>
      {lists.map(list => (
        <View key={list._id} style={styles.listItem}>
          <TouchableOpacity
            style={styles.listItemButton}
            onPress={() => {
              navigation.navigate('Maps', { listId: list.listId });
            }}
          >
            <View style={styles.listInfo}>
              <Text style={styles.listItemText}>Lista {list.listId}</Text>

              <Text style={styles.listItemSubtext}>Rota {list.route}</Text>

              <Text style={styles.listItemSubtext}>Adicionado {list.createdAt}</Text>

              <Text style={styles.listItemSubtext}>Modificado {list.updatedAt}</Text>
            </View>

            <View style={styles.listItemTotal}>
              <Text style={styles.listItemTotalText}>{list.total}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={styles.buttonText}>Fazer Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#E3E9F0'
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15
  },

  userInfo: {
    paddingVertical: 30,
    paddingHorizontal: 30
  },

  userInfoText: {
    color: '#273049',
    fontFamily: '',
    fontWeight: 'bold',
    fontSize: 22
  },

  button: {
    height: 62,
    backgroundColor: '#e0414e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20
  },

  buttonText: {
    color: '#FFF',
    fontFamily: '',
    fontWeight: 'bold',
    fontSize: 18
  },

  listItem: {
    paddingHorizontal: 15
  },

  listInfo: {
    alignSelf: 'center'
  },

  listItemButton: {
    height: 120,
    backgroundColor: '#EEE',
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    elevation: 10
  },

  listItemText: {
    color: '#273049',
    fontFamily: '',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 5
  },

  listItemTotal: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },

  listItemTotalText: {
    color: '#273049',
    fontFamily: '',
    fontSize: 28,
    fontWeight: 'bold',
    paddingRight: 15
  }
});
