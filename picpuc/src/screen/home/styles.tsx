import {TextStyle, TextInputStyle, ViewStyle, Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width} = Dimensions.get('window');
const Content: ViewStyle = {
  backgroundColor: 'white',
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
  height: 50,
  borderRadius: 30,
  paddingVertical: 10,
  paddingHorizontal: 20,
  flexDirection: 'row',
};

const InputSearch: TextInputStyle = {
  width: width - 120,
};

const Gradient: ViewStyle = {
  borderRadius: 10,
  flexDirection: 'row',
  padding: 5,
  left: 25,
  width: width - 50,
};
const Btn = styled.View`
  border-radius: 10;
  background-color: ${(props: {isSelected: boolean}) => props.isSelected ? 'white' : 'transparent'};
  width: 33%;
`;
const Title = styled.Text`
  padding-horizontal: 18;
  font-size: 14px;
  padding: 10px;
  text-align: center;
  color: ${(props: {isSelected: boolean}) => props.isSelected ? '#00338D' : 'rgb(108, 107, 107)'};
`;

export {Content, title, Gradient, InputSearch, InputSearchBox, Btn, Title};
