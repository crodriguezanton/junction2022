import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as React from 'react';
import { LogBox, StatusBar } from "react-native";
import { PluginDetailScreen } from "./src/screens/PluginDetail/PluginDetailScreen";
import { PluginSettingsScreen } from "./src/screens/PluginSettings/PluginSettingsScreen";
import { TabNavigator } from "./src/shared/layout/TabNavigator";

export default function App() {
  const Stack = createStackNavigator();
  StatusBar.setBarStyle("light-content", true);
  LogBox.ignoreAllLogs();

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen
              name="PluginDetailScreen"
              component={PluginDetailScreen}
            />
            <Stack.Screen
              name="PluginSettingsScreen"
              component={PluginSettingsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
