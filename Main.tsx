import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { Home } from "./screens/Home";

export function Main() {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Home />
      </SafeAreaView>
    </>
  );
}
