import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import TitleText from '../components/TitleText';
import Colors from '../constants/colors';

const Header = props => {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Header;