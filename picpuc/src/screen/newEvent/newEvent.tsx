import React, {useState} from 'react';
import {Formik} from 'formik';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {newEventStyled, inputStyles} from './styles';
import {launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native';
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

const GooglePlacesInput = () => {
  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <GooglePlacesAutocomplete
        placeholder="Selecciona la ubicación"
        query={{key: 'AIzaSyCt2xrOG7v01zH7xrOK4VUHcuscFTG3Ej4'}}
        fetchDetails={true}
        onPress={(data, details = null) => console.log(data, details)}
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

const NewEventScreen = () => {
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const handleSubmit = values => {
    console.log(values);
  };
  const Camera = async () => {
    const options = {
      includeBase64: true,
      mediaType: 'photo',
    };

    // You can also use as a promise without 'callback':
    const result = await launchImageLibrary(options);
    console.log(result);
  };
 
  return (
    <Formik
      initialValues={{title: '', description: '', date: '', image: null}}
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
            <StyledText isSelected={values.date}>
              {values.date ? values.date : 'Seleccionar fecha '}
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
              setFieldValue('date', formattedDate);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
          <GooglePlacesInput />
          <StyledButtonInput onPress={Camera}>
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
