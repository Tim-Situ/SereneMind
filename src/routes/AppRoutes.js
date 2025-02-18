import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/AuthContext';

import Splash from '../screens/Splash';
import Welcome1 from '../screens/Welcome1';
import Welcome2 from '../screens/Welcome2';
import SignUp from '../screens/SignUp';
import Personalize from '../screens/Personalize';
import Login from '../screens/Login';
import Home from '../screens/Home';
import VoiceChat from '../screens/VoiceChat';
import TextChat from '../screens/TextChat';
import History from '../screens/History';
import Timeline from '../screens/Timeline';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Settings from '../screens/Settings';
import Help from '../screens/Help';
import Comment from '../screens/Comment';
import Chat from '../screens/Chat';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const {isLoading, userToken} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        {isLoading == true ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : userToken == null ? (
          <>
            <Stack.Screen name="Welcome1" component={Welcome1} />
            <Stack.Screen name="Welcome2" component={Welcome2} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen name="TabNav">
              {() => (
                <Tab.Navigator
                  screenOptions={{
                    tabBarHideOnKeyboard: true,
                    headerShown: false,
                    tabBarInactiveTintColor: '#bdbdbd',
                    tabBarActiveTintColor: '#6a8dff',
                    tabBarStyle: {
                      height: 60,
                      borderTopWidth: 0,
                    },
                    tabBarItemStyle: {
                      padding: 6,
                    },
                  }}>
                  <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                      tabBarIcon: ({color}) => (
                        <Icon name="home-variant" size={30} color={color} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Timeline"
                    component={Timeline}
                    options={{
                      tabBarIcon: ({color}) => (
                        <Icon name="forum" size={30} color={color} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                      tabBarIcon: ({color}) => (
                        <Icon name="account" size={30} color={color} />
                      ),
                    }}
                  />
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Personalize" component={Personalize} />
            <Stack.Screen name="VoiceChat" component={VoiceChat} />
            <Stack.Screen name="TextChat" component={TextChat} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="Comment" component={Comment} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
