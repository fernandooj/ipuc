import React, {FC, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import MapView from 'react-native-maps';
import {EventStyled} from './styles';
import {MapType} from './map.types';
// import SlideEvents from '../../components/slide-events/slide-events'

const {width, height} = Dimensions.get('window');
const {BoxText, Contain} = EventStyled;

const MapScreeen: FC<MapType> = () => { 
  const {latitude, longitude} = region;
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
};

export default MapScreeen;
