import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import api from '../services/api';

export default function Maps({ navigation, route }) {
  const [locations, setLocations] = useState([]);

  let myMap;

  const iniRegion = {
    latitude: -18.281697,
    longitude: -55.7587383,
    latitudeDelta: 50.3,
    longitudeDelta: 50.0121
  };

  const fitMyPoints = () => {
    myMap.fitToSuppliedMarkers(['markers']);
  };

  useEffect(() => {
    async function getLocation() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
    }

    async function getPoints() {
      const response = await api.get(`/listId/${route.params.listId}`);
      let data = response.data[0];

      let arr = [...data.items, ...data.delivered, ...data.visited];
      setLocations(arr);
    }

    getLocation();
    getPoints();
  }, []);

  useEffect(() => {
    fitMyPoints();
  }, [locations]);

  return (
    <View style={styles.container}>
      <MapView
        ref={ref => {
          myMap = ref;
        }}
        style={styles.mapStyle}
        loadingEnabled={true}
        initialRegion={iniRegion}
        showsUserLocation
      >
        {locations.map(marker => (
          <Marker
            key={marker._id}
            identifier="markers"
            draggable
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            title={marker.title}
            onPress={() => {}}
            // description={marker.description}
          />
        ))}
      </MapView>

      <Text style={styles.text}>{route.params.listId}</Text>

      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.text}>{route.params.listId}</Text>
      <TouchableOpacity
        style={styles.fitPointsButton}
        onPress={() => {
          fitMyPoints();
        }}
      >
        <Text style={styles.buttonText}>Centralizar Pontos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  text: {
    position: 'absolute',
    top: 50,
    fontFamily: '',
    fontWeight: 'bold'
  },

  fitPointsButton: {
    position: 'absolute',
    maxWidth: 100,
    top: 10,
    right: 10,
    backgroundColor: '#CCC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5
  },

  fitMyLocationButton: {
    position: 'absolute',
    width: 80,
    height: 80,
    bottom: 10,
    right: 10,
    backgroundColor: '#CCC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100
  },

  goBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#CCC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },

  buttonText: {
    fontFamily: '',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
