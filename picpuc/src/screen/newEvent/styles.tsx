import styled from 'styled-components/native';

const COLOR = 'rgba(122, 122, 122, 0.829)';

export const inputStyles = {
  marginBottom: 10,
  padding: 10,
  borderWidth: 1,
  borderColor: '#fff',
  backgroundColor: '#F4F7FF',
  borderRadius: 15,
  color: COLOR,
};

export const newEventStyled = {
  FormContainer: styled.View`
    margin-top: 70px;
    padding: 20px;
    background: #fff;
  `,

  StyledTextInput: styled.TextInput`
    ${inputStyles}
  `,
  StyledButtonInput: styled.TouchableOpacity`
    ${inputStyles}
  `,

  StyledText: styled.Text`
    color: ${(props: {isSelected: boolean}) =>
      props.isSelected ? '#333333' : COLOR};
  `,

  StyledButton: styled.Button`
    margin-top: 20px;
  `,
  ErrorText: styled.Text`
    color: red;
  `,
};
