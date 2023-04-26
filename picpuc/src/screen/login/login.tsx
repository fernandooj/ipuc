import React, {ReactElement, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EventStyled} from './styles';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {saveUser} from '../../services/user';
import {UserContext} from '../../context/userContext';

const {ContainList, GoogleButton, TextButton} = EventStyled;

type Props = {
  handleSignIn: Function;
};

const GoogleLoginButton = ({handleSignIn}: Props) => {
  return (
    <GoogleButton onPress={() => handleSignIn()}>
      <Icon name="google" size={20} color="#fff" />
      <TextButton>Continuar con Google</TextButton>
    </GoogleButton>
  );
};

const CloseSesionButton = ({handleSignIn}: Props) => {
  return (
    <GoogleButton onPress={() => handleSignIn()}>
      <TextButton>Cerrar sesión</TextButton>
    </GoogleButton>
  );
};

const LoginScreen = ({navigation}): ReactElement => {
  const {navigate} = navigation;
  const {user} = useContext(UserContext);

  const signIn = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken, user} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    saveUser(user);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  console.log(user);
  const closeSesion = async () => {
    try {
      await auth().signOut();
      navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContainList>
      {user ? (
        <CloseSesionButton handleSignIn={closeSesion} />
      ) : (
        <GoogleLoginButton handleSignIn={signIn} />
      )}
    </ContainList>
  );
};

export default LoginScreen;
