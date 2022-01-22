import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomRouteHeader } from './components/CustomRouteHeader';

import { StatusBarGradient } from './components/StatusBarGradient';
import { Home } from './screens/Home';
import { NewPurchase } from './screens/NewPurchase';
import { ViewPurchase } from './screens/ViewPurchase';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Main(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBarGradient />

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NewPurchase"
          component={NewPurchase}
          options={{
            header: CustomRouteHeader,
            headerTitle: 'Nova lista de compras',
          }}
        />

        <Stack.Screen
          name="ViewPurchase"
          component={ViewPurchase}
          options={{
            header: CustomRouteHeader,
            headerTitle: 'Visualizar lista',
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
