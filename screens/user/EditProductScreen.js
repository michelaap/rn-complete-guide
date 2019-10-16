import React, { useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    }
    const updatedValidaties = {
      ...state.inputValidaties,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true;
    for (const key in updatedValidaties) {
      updatedFormIsValid = updatedFormIsValid && updatedValidaties[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidaties: updatedValidaties,
      inputValues: updatedValues
    }
  }
  return state;
};

const EditProductScreen = props => {
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidaties: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  const submitHandler = useCallback(() => {

    if (!formState.inputValues) {
      Alert.alert('Wrong input!', 'Please check the error in the form.', [
        { text: 'Ok' }
      ])
      return;
    }

    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl)
      );
    } else {
      dispatch(
        productsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier,text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    } 
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier
    })
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input 
          label='Title'
          errorText='Please enter a valid title!'
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
        />
        <Input 
          label='Image Url'
          errorText='Please enter a valid image url!'
          keyboardType='default'
          returnKeyType='next'
        />
        {editedProduct ? null : (
          <Input 
            label='Price'
            errorText='Please enter a valid price!'
            keyboardType='decimal-pad'
            returnKeyType='next'
          />
        )}
        <Input 
          label='Description'
          errorText='Please enter a valid description!'
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          multiline
          numberOfLines={3}
        />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },

});

export default EditProductScreen;
