import React, { useState, useRef, useEffect } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
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

const renderListItem = (listLenght, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLenght - itemData.index}</BodyText>
    <BodyText>{itemData.iten}</BodyText>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoise);
  const [currentGuess, setCurrentGues] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHight = useRef(100);

  const { userChoise, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoise) {
      onGameOver(pastGuesses.length);
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
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHight.current,
      currentGuess
    );

    setCurrentGues(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton> 
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
        <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContaier}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
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
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  listContaier: {
    flex: 1,
    width: '60%'
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection:'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default GameScreen;