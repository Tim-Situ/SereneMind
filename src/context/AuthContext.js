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
          console.log(res.data);
          setUserProfile(res.data);
          setUserToken(token);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setUserProfile(null);
          setUserToken(null);
          AsyncStorage.removeItem('userToken');
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
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
    //     console.log(res.data);
    //     setUserProfile(null);
    //     setUserToken(null);
    //     AsyncStorage.removeItem('userToken');
    //   })
    //   .catch(err => {
    //     console.log(err);
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
