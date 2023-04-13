import React, {useEffect, useState} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';
import {Text, Button, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EventStyled} from './styles';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const {ContainList, GoogleButton, TextButton} = EventStyled;
const GoogleLoginButton = () => {
  return (
    <GoogleButton>
      <Icon name="google" size={20} color="#fff" />
      <TextButton>Continuar con Google</TextButton>
    </GoogleButton>
  );
};

const LoginScreen = (): ReactElement => {
  const [user, setUser] = useState(null);

  const signIn = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <ContainList>
      <GoogleLoginButton />
    </ContainList>
  );
};

export default LoginScreen;
