import {ReactNode, useContext} from 'react';
import {View} from 'react-native';
import AnotherLogin from './AnotherLogin';
import {globalStyle} from '../../styles/global';

interface Props {
  children: ReactNode;
}

export default function SubmitContainer({children}: Props) {
  return (
    <View>
      {children}
      <AnotherLogin styleContainer={globalStyle.marginTopMediumContainer} />
    </View>
  );
}
