import React, {FC, useEffect, useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {EventStyled} from './styles';
import {EvenType} from './event.types';

const {ImageContent, BoxText, Contain, Title, SubTitle} = EventStyled;

export const EventComponent: FC<EvenType> = ({title, description, image}) => {
  return (
    <Contain>
      <ImageContent source={{uri: image}} resizeMode="cover">
        <BoxText>
          <LinearGradient colors={['rgba(200,200,200,.5)', 'rgba(0,0,0,.8)']}>
            <Title style={Title}>{title}</Title>
            <SubTitle style={SubTitle}>{description}</SubTitle>
          </LinearGradient>
        </BoxText>
      </ImageContent>
    </Contain>
  );
};
