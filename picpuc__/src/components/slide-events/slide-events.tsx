import React, {Fragment, ReactElement, useEffect, useRef, useState} from 'react';
import {Text, TextInput, View, ScrollView} from 'react-native';
import axios from 'axios';
import { EventStyled } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import BottomSheet from "react-native-gesture-bottom-sheet";
import {events} from "../../../__mocks__/events/event.json"

const {InputSearch, ListCategories, ListCategoriesText, Contain, Title, InputSearchBox, Gradient} = EventStyled;


const SlideEvents = (): ReactElement => {

    const bottomSheet = useRef();
  const onChangeText = () => {};
  const renderItem = ({title}) => (
    <View style={ListCategories}>
      <Text style={ListCategoriesText}>{title}</Text>
    </View>
  );
  const RenderEvents = () => {
    return (
      <Contain horizontal={true}>
        {events.map(e => {
          return renderItem(e);
        })}
      </Contain>
    );
  };
  return (
    <Fragment>
    <Contain>
    <BottomSheet hasDraggableIcon ref={bottomSheet} height={600} />
      <LinearGradient colors={['#E5F6FE', '#E7F5FC']} style={Gradient}>
        <View style={InputSearchBox}>
          <TextInput
            style={InputSearch}
            onChangeText={onChangeText}
            // value="hola mundo"
            placeholderTextColor="grey"
            placeholder="Buscar Eventos"
          />
          <Icon name="aperture" size={30} color="#F7D78C" />
        </View>
        <RenderEvents />
        </LinearGradient>
        </Contain>
 
        </Fragment>  
      
    
  );
};

export default SlideEvents;
