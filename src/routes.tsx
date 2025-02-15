import React from 'react';

import  { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import OrphamageMap from './pages/OrphamageMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/SelectMapPosition';
import OrphanageData from './pages/OrphanageData';
import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => {
  return(
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen name="OrphanageMap" component={OrphamageMap} />
        <Screen 
          name="OrphanageDetails"
          component={OrphanageDetails} 
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition} 
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }}
        />
        <Screen 
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;