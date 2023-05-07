import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Geolocation from '@react-native-community/geolocation';

export const UserContext = createContext();

const UserProvider = ({children}) => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [region, setRegion] = useState<
    | {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
      }
    | undefined
  >();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '81330883681-ddkeig3ov5hml78um4ijprtade8urdv6.apps.googleusercontent.com',
      offlineAccess: true,
    });

    Geolocation.getCurrentPosition(({coords}) => {
      const newRegion = {
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
    });
  }, []);

  const userFlow = {
    user,
    region,
    setUser,
    setRegion,
    login: async (email: string, password: string) => {
      try {
        auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.error(error);
      }
    },
    register: async (email: string, password: string) => {
      try {
        auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.error(error);
      }
    },
    logOut: async () => {
      try {
        auth().signOut();
      } catch (error) {
        console.error(error);
      }
    },
  };

  return (
    <UserContext.Provider value={userFlow}>{children}</UserContext.Provider>
  );
};

export {UserProvider};
