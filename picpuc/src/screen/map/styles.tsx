import styled from 'styled-components/native';

export const EventStyled = {
  Contain: styled.View`
    shadow-opacity: 0.75;
    shadow-radius: 5px;
    shadow-color: grey;
    shadow-offset: 10px 10px;
    width: 130px;
    margin-right: 10px;
    border-radius: 10px;
  `,
  ImageContent: styled.ImageBackground`
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  `,
  BoxText: styled.View`
    position: absolute;
    bottom: 11px;
    width: 100%;
    height: 20px;
  `,
  Title: styled.Text`
    font-size: 11px;
    color: white;
    padding: 3px;
  `,
  SubTitle: styled.Text`
    font-size: 10px;
    color: white;
    padding-left: 3px;
  `,
};
