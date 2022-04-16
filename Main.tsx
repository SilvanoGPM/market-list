import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PurchaseProvider } from './contexts/PurchaseContext';

import { CustomRouteHeader } from './components/CustomRouteHeader';
import { StatusBarGradient } from './components/StatusBarGradient';
import { Home } from './screens/Home';
import { NewPurchase } from './screens/NewPurchase';
import { ViewPurchase } from './screens/ViewPurchase';
import { Splash } from './screens/Splash';
import { Settings } from './screens/Settings';
import { useColor } from './contexts/ColorsContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Main(): JSX.Element {
  const { color } = useColor();

  const theme: ReactNativePaper.Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color.primary,
      gradient: color.gradient,
      icon: color.icon,
      success: '#4cd137',
      info: '#487eb0',
      error: '#e84118',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <PurchaseProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBarGradient />

            <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false, gestureEnabled: false }}
              />

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

              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                  header: CustomRouteHeader,
                  headerTitle: 'Configurações',
                }}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </PurchaseProvider>
    </PaperProvider>
  );
}
