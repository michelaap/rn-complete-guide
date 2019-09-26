import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartAction from '../../store/actions/cart';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={itemData => 
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            // props.navigation.navigate('ProductDetail', {
            //   productId: itemData.item.id
            // })
            props.navigation.navigate({
              routeName: 'ProductDetail',
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title
              }
            })
          }}
          onAddToCart={() => {
            dispatch(cartAction.addToCart(itemData.item));
          }}
        />
      }
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
}

export default ProductsOverviewScreen;