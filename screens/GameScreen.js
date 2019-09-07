import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const GameScreen = props => {
  const [currentGuess, setCurrentGues] = useState(
    generateRandomBetween(1, 100, props.userChoise)
  );

  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHight = useRef(100);

  const { userChoise, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoise) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoise, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoise) ||
      (direction === 'greater' && currentGuess > userChoise)
    ) {
      Alert.alert(
        'Don\'t lie',
        'You know that this is wrong...',
        [{ text: 'Sorry!', style: 'cancel' }]
      );
      return;
    } 

    if (direction === 'lower') {
      currentHight.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current, currentHight.current, currentGuess
    );

    setCurrentGues(nextNumber);
    setRounds(curRounds => curRounds + 1);
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          LOWER
        </MainButton> 
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          GREATER
        </MainButton>
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  }
});

export default GameScreen;