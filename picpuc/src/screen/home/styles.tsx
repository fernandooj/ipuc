import {TextStyle, ViewStyle, Dimensions} from 'react-native';
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

const Gradient: ViewStyle = {
  borderRadius: 10,
  flexDirection: 'row',
  padding: 5,
  left: 25,
  width: width - 50,
};
const BtnAnimate: ViewStyle = {
  width: '33%',
};

const InputSearch = styled.TextInput`
  width: ${width - 120}px;
`;
const Btn = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: ${(props: {isSelected: boolean}) =>
    props.isSelected ? 'white' : 'transparent'};
  width: 100%;
`;
const Title = styled.Text`
  padding-left: 18px;
  padding-right: 18px;
  font-size: 14px;
  padding: 10px;
  text-align: center;
  color: ${(props: {isSelected: boolean}) =>
    props.isSelected ? '#00338D' : 'rgb(108, 107, 107)'};
`;

export {
  Content,
  title,
  Gradient,
  InputSearch,
  InputSearchBox,
  Btn,
  Title,
  BtnAnimate,
};
