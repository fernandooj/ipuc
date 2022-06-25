import {TextStyle, ImageStyle, ViewStyle, Dimensions} from 'react-native';
console.table(Dimensions.get('window'));
const Content: ViewStyle = {
  marginTop: 100,
  backgroundColor: 'red',

  flexDirection: 'row',
  alignItems: 'center',
};

const title: TextStyle = {
  width: '25%',
  textAlign: 'center',
  borderColor: 'blue',
  borderStyle: 'dotted',
  borderWidth: 1,
};

export {Content, title};
