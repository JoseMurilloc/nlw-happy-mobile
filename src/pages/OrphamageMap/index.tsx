import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'

import MapMarker from '../../images/map-marker.png';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { or } from 'react-native-reanimated';

interface OrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphamageMap() {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, [])


  function handleNavigationToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigationToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }


  const [fontLoad] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  if (!fontLoad) return null;

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -9.3638924,
          longitude: -40.5432299,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
      {orphanages.map(orphanage => (
        <Marker
          icon={MapMarker}
          key={orphanage.id}
          calloutAnchor={{
            x: 2.7,
            y: 0.0
          }}
          coordinate={{
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
          }}
        >
          <Callout tooltip={true} onPress={() => handleNavigationToOrphanageDetails(orphanage.id)}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{orphanage.name}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
      </MapView>


      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos foram encontrados</Text>
      
          <RectButton 
            style={styles.createOrphanageButton}
            onPress={handleNavigationToCreateOrphanage} >
              <Feather name="plus" size={20} color="#fff" />
            </RectButton>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242127',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 66,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',

    elevation: 3,
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',

  },
  footerContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 28,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 28,

    justifyContent: 'center',
    alignItems: 'center',
  },

});
