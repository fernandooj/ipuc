import {TextStyle, TextInputStyle, ViewStyle, ScrollViewStyle, Dimensions} from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window')
const Content: ViewStyle = {
  flexDirection: 'row',
};

const Gradient: ViewStyle = {
  borderBottomLeftRadius: 70,
  borderBottomRightRadius: 70,
};

const title: TextStyle = {
  width: '25%',
  textAlign: 'center',
  borderColor: 'blue',
  borderStyle: 'dotted',
  borderWidth: 1,
};

const InputSearchBox: ViewStyle = {
  marginTop: 50,
  left: 25,
  width: width - 50,
  backgroundColor: 'white',
  height: 70,
  borderRadius: 30,
  padding: 20,
  flexDirection: 'row',
};

const InputSearch: TextInputStyle = {
  width: width - 120,
};

const ListCategories: ViewStyle = {
  marginRight: 15,
};

const ListCategoriesText: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#5E5992',
};

const ContentEvents = styled.ScrollView`
  max-height: 150px;
`;
const ContentEventsRow = styled.View`
  flex-direction: row;
  padding-horizontal: 20;
`;
const TitleEvents = styled.Text`
  padding-horizontal: 18;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
`;
const ListCategoriesBox = styled.ScrollView`
  flex-direction: row;
  marginVertical: 18;
  left: 20;
`;
export {
  Content,
  title,
  Gradient,
  InputSearch,
  InputSearchBox,
  ListCategories,
  ListCategoriesBox,
  ListCategoriesText,
  ContentEvents,
  ContentEventsRow,
  TitleEvents,
};
