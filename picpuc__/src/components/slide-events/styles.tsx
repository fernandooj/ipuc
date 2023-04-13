import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export const EventStyled = {
  Contain: styled.View`
    shadow-opacity: 0.75;
    shadow-radius: 5px;
    shadow-color: grey;
    shadow-offset: 10px 10px;
    width: 130px;
    height: 130px;
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
    InputSearchBox: styled.View `
    marginTop: 50,
    left: 25,
    width: width - 50,
    backgroundColor: 'white',
    height: 70,
    borderRadius: 30,
    padding: 20,
    flexDirection: 'row',
    `,
    InputSearch: styled.Text `,
    width: width - 120,
    `,
    ListCategories: styled.View `,
        marginRight: 15,
    `,
    ListCategoriesText: styled.Text `,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5E5992',
    `,
};
