import styled from 'styled-components/native';

export const EventStyled = {
  ContainList: styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-top: 10px;
  `,
  ListCategories: styled.View`
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgba(183, 183, 183, 0.272);
    padding-bottom: 20px;
    padding-left: 15px;
    padding-right: 15px;
  `,
  BoxText: styled.View`
    position: absolute;
    bottom: 11px;
    width: 100%;
    height: 20px;
  `,
  Title: styled.Text`
    font-size: 14px;
    color: #535353;
    font-weight: bold;
    padding: 3px;
    min-height: 41px;
  `,
  SubTitle: styled.Text`
    font-size: 13px;
    padding-left: 3px;
  `,
  BtnAsist: styled.TouchableOpacity`
    background-color: ${({distance}: {distance: boolean}) =>
      distance ? '#00338D' : '#F0AB00'};
    padding: 5px;
    padding-left: 15px;
    border-radius: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  IconArrow: styled.View`
    background-color: white;
    padding: 5px;
    border-radius: 20px;
  `,
  TextAssistants: styled.Text`
    color: #b5b3b3d4;
    font-size: 11px;
    margin-top: 10px;
    margin-bottom: 10px;
  `,
  TextAsist: styled.Text`
    text-align: center;
    color: white;
  `,
  DateContent: styled.View`
    margin-bottom: 15px;
    flex-direction: row;
    align-items: center;
  `,
  TextDate: styled.Text`
    margin-left: 10px;
    font-size: 13px;
  `,
};
