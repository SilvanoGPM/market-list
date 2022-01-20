import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomRouteHeader } from './components/CustomRouteHeader';

import { StatusBarGradient } from './components/StatusBarGradient';
import { Home } from './screens/Home';
import { NewPurchase } from './screens/NewPurchase';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Main() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBarGradient />

      <Stack.Navigator initialRouteName="NewPurchase">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPurchase"
          component={NewPurchase}
          options={{
            header: (props) => <CustomRouteHeader {...props} />,
            headerTitle: "Nova lista de compras"
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
