import React from 'react';
import LottieView from 'lottie-react-native';

export default class EmptyAniomation extends React.Component {
  render() {
    return <LottieView source={require('./emptyanim.json')} autoPlay loop />;
  }
}
