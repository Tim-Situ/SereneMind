import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen'
import RegistrationScreen from '../screens/RegistrationScreen'
import PersonalisationScreen from '../screens/PersonalisationScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Personalisation" component={PersonalisationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;