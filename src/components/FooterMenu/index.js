import React from 'react';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import IconM from '@expo/vector-icons/MaterialIcons';
import IconA from '@expo/vector-icons/AntDesign';

import {Footer, FooterItem} from './styles';

export default function FooterMenu() {
  return (
    <Footer>
      <FooterItem>
        <Icon name="home-outline" size={30} />
      </FooterItem>
      <FooterItem>
        <IconM name="search" size={30} />
      </FooterItem>
      <FooterItem>
        <IconA name="plussquareo" size={30} />
      </FooterItem>
      <FooterItem>
        <IconA name="hearto" size={25} />
      </FooterItem>
      <FooterItem>
        <IconM name="person-outline" size={30} />
      </FooterItem>
    </Footer>
  );
}
