import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  console.log('RE-RENDERING COMPONENT');
  console.log(courseGoals);

  const addGoalHandler = goalTitle => {
    setCourseGoals(prevState => [
      ...prevState, 
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    console.log('TO BE DELETED: ', goalId);
    console.log(courseGoals)
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    }); 
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title='Add New Goal' onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => 
          <GoalItem 
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
      } />
        
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
