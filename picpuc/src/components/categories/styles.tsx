// import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

// const {width, height} = Dimensions.get('window');

export const CategorieStyled = {
  ContainList: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-top: 10px;
  `,
  ListCategories: styled.View`
    border-top-style: solid;
    border-top-color: rgba(183, 183, 183, 0.272);
    padding-bottom: 20px;
    padding-left: 15px;
    padding-right: 15px;
  `,
  Title: styled.Text`
    font-size: 14px;
    color: #535353;
    font-weight: bold;
    padding: 3px;
    min-height: 41px;
  `,
  ImageCategorie: styled.Image`
    border-radius: 15px;
    width: 100%;
    height: 150px;
    resize-mode: cover;
  `,
};
