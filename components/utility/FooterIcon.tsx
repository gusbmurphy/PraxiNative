import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {appStyles} from '../app-styles';

export const FooterIcon = ({icon}: {icon: IconProp}) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      style={appStyles.screenFooterButton}
      size={30}
    />
  );
};
