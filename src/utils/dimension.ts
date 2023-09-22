import {Dimensions} from 'react-native';

export const isTablet = (): boolean => {
  const width = Dimensions.get('screen').width;
  return width >= 400;
};
