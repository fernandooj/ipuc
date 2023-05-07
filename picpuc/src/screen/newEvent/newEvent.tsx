import React, {useContext, useEffect, useState} from 'react';
import {Formik} from 'formik';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {newEventStyled, inputStyles} from './styles';
import {launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native';
import {saveEvent} from '../../services/event';
import {UserContext} from '../../context/userContext';

const {
  FormContainer,
  StyledTextInput,
  StyledButtonInput,
  StyledButton,
  ErrorText,
  StyledText,
} = newEventStyled;

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date().required('Date is required'),
});

const COLOR = 'rgba(122, 122, 122, 0.829)';

const GooglePlacesInput = ({callback}) => {
  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <GooglePlacesAutocomplete
        placeholder="Selecciona la ubicación"
        query={{key: 'AIzaSyCt2xrOG7v01zH7xrOK4VUHcuscFTG3Ej4'}}
        fetchDetails={true}
        onPress={(data, details = null) =>
          callback(data.description, details.geometry.location)
        }
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        currentLocation={true}
        enableHighAccuracyLocation={true}
        minLength={2}
        nearbyPlacesAPI="GooglePlacesSearch"
        styles={{
          listView: {
            backgroundColor: '#000',
            zIndex: 9999,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 20,
          },
          textInput: inputStyles,
        }}
      />
    </ScrollView>
  );
};

const NewEventScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const {navigate} = navigation;
  const {user} = useContext(UserContext);

  const handleSubmit = values => {
    console.log(values);
    saveEvent(values);
  };
  const Camera = async ({callback, setFieldValue}) => {
    const options = {
      includeBase64: true,
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);

    setFieldValue('image', result.assets[0].base64);
    callback(result);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!user) navigate('Login');
    });

    return unsubscribe;
  }, [navigate, navigation, user]);

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        event_date: '',
        image: null,
        category_id: 3,
        location: '4.6230545, -74.1910443',
        place_name: 'Casa',
      }}
      onSubmit={handleSubmit}
      // validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <FormContainer>
          <StyledTextInput
            placeholder="Titulo evento"
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
            placeholderTextColor={COLOR}
          />
          {touched.title && errors.title && (
            <ErrorText>{errors.title}</ErrorText>
          )}
          <StyledTextInput
            placeholder="Descripción"
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            placeholderTextColor={COLOR}
          />
          {touched.description && errors.description && (
            <ErrorText>{errors.description}</ErrorText>
          )}
          <StyledButtonInput onPress={() => setOpenDate(true)}>
            <StyledText isSelected={values.event_date}>
              {values.event_date ? values.event_date : 'Seleccionar fecha '}
            </StyledText>
          </StyledButtonInput>
          <DatePicker
            modal={true}
            // mode="date"
            open={openDate}
            date={date}
            onConfirm={dateResponse => {
              const formattedDate = dateResponse
                .toISOString()
                .replace('T', ' ')
                .replace(/\.\d{3}Z$/, '');
              setOpenDate(false);
              setDate(date);
              setFieldValue('event_date', formattedDate);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
          <GooglePlacesInput
            callback={(place_name, location) => {
              setFieldValue('place_name', place_name);
              setFieldValue('location', location);
            }}
          />
          <StyledButtonInput
            onPress={() => Camera({callback: () => {}, setFieldValue})}>
            <StyledText>Subir imagen</StyledText>
          </StyledButtonInput>

          {/* {touched.date && errors.date && <ErrorText>{errors.date}</ErrorText>} */}
          <StyledButton title="Guardar Evento" onPress={handleSubmit} />
        </FormContainer>
      )}
    </Formik>
  );
};

export default NewEventScreen;
