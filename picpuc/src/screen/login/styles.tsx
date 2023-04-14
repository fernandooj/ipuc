import styled from 'styled-components/native';

export const EventStyled = {
  ContainList: styled.View`
    flex: 1;
    position: relative;
    align-items: center;
  `,
  TextButton: styled.Text`
    color: #fff;
    font-size: 18px;
    margin-left: 10px;
  `,
  GoogleButton: styled.TouchableOpacity`
    background-color: #4285f4;
    border-radius: 5px;
    padding: 20px;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    width: 90%;
  `,
};
