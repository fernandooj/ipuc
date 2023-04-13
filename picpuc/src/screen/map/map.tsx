import React, {FC, useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import {EventStyled} from './styles';
import {EvenType} from './event.types';

// import SlideEvents from '../../components/slide-events/slide-events'

const {width, height} = Dimensions.get('window');
const {ImageContent, BoxText, Contain, Title, SubTitle} = EventStyled;

const MapScreeen: FC<EvenType> = ({title, description, image}) => {
  const [region, setRegion] = useState<
    | {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
      }
    | undefined
  >();

  useEffect(() => {
    Geolocation.getCurrentPosition(({coords}) => setRegion(coords));
  }, [])
  if(region){
    const {latitude, longitude} = region;
    console.log(region)
    return (
      <Contain>
        <BoxText>
          <MapView
            showsUserLocation
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0121,
            }}
            mapType="mutedStandard"
            onRegionChange={setRegion}
            style={{width: width, height: height - 80}}

          />
        </BoxText>
        {/* <SlideEvents />  */}
      </Contain>
    );
  }else{
    return null
  }
}

export default MapScreeen;