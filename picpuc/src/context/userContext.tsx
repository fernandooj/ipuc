import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const UserContext = createContext();

const UserProvider = ({children}) => {
  const [user, setUser] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
    webClientId:
      '81330883681-ddkeig3ov5hml78um4ijprtade8urdv6.apps.googleusercontent.com',
      offlineAccess: true,
  });
    const user = auth().currentUser;

  }, []);
  // if (initializing) return null;
  const userFlow = {
    user,
    setUser,
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
