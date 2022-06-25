import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const UserContext = createContext();

const UserProvider = ({children}) => {
  // const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // function onAuthStateChanged(user) {
  //   console.log(user);
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);
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
