import React, {FC, useEffect, useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import {EventStyled} from './styles';
import {EvenType} from './event.types';
// import SlideEvents from '../../components/slide-events/slide-events'

const {ImageContent, BoxText, Contain, Title, SubTitle} = EventStyled;


const MapScreeen: FC<EvenType> = ({title, description, image}) => {
  const [coords, SetColrds] = useState()
  useEffect(() => {
    Geolocation.getCurrentPosition(({coords}) => SetColrds(coords));
  }, [])

  if(coords){
    return (
      <Contain>
        {/* <BoxText>
          <MapView
              initialRegion={{
              latitude: 4.6574037,
              longitude: -74.1210833,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0221,
              mapType: "terrain"
            }}
            style={{width: 1500, height: 1500}}
          />
        </BoxText> */}
        {/* <SlideEvents /> */}
      </Contain>
    );
  }else{
    return null
  }
}

export default MapScreeen;