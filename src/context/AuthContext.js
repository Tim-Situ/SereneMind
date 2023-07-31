import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const session = async () => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      axios
        .get(`${BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res.data == null) {
            logout();
          } else {
            setUserProfile(res.data);
            setUserToken(token);
            setIsLoading(false);
          }
        })
        .catch(err => {
          setUserProfile(null);
          setUserToken(null);
          AsyncStorage.removeItem('userToken');
          setIsLoading(false);
        });
    } catch (error) {
      // handle error
    }
  };

  const logout = () => {
    // axios
    //   .post(`${BASE_URL}/logout`, {
    //     headers: {
    //       Authorization: `Bearer ${userToken}`,
    //     },
    //   })
    //   .then(res => {
    //     setUserProfile(null);
    //     setUserToken(null);
    //     AsyncStorage.removeItem('userToken');
    //   })
    //   .catch(err => {
    //     // handle error
    //   });
    setUserProfile(null);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider
      value={{session, logout, isLoading, userToken, userProfile}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
