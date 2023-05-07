import styled from 'styled-components/native';

export const EventStyled = {
  Contain: styled.View`
    padding: 20px;
  `,
  ContentImage: styled.View`
    border-radius: 10px;
    overflow: hidden;
  `,
  ContentIcon: styled.View`
    margin-right: 10px;
  `,
  Title: styled.Text`
    font-size: 18px;
    margin-bottom: 10px;
  `,
  Description: styled.Text`
    font-size: 15px;
  `,
  Row: styled.Text`
    flex-direction: row;
    margin-top: 10px;
  `,
  Text: styled.Text`
    font-size: 15px;
  `,
};
