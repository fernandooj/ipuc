import React, {Fragment, ReactElement} from 'react';
import {View} from 'react-native';
import {CategorieStyled} from './styles';
import {CategorieType} from './categorie.types';

const {ContainList, Title, ListCategories, ImageCategorie} = CategorieStyled;

interface CategorieComponentProps {
  data: CategorieType[];
}

const renderItem = ({name, url_image}: CategorieType) => (
  <ListCategories>
    <ImageCategorie source={{uri: url_image}} />
    <Title>{name}</Title>
  </ListCategories>
);

const EventList = ({data}: CategorieComponentProps) => (
  <ContainList>
    {data.map((e: CategorieType, index: React.Key | null | undefined) => (
      <Fragment key={index}>
        <View style={{width: '50%'}}>{renderItem(e)}</View>
      </Fragment>
    ))}
  </ContainList>
);

const CategorieComponent = ({data}: CategorieComponentProps): ReactElement => {
  return (
    <View>
      <EventList data={data} />
    </View>
  );
};

export default CategorieComponent;
