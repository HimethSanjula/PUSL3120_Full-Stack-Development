import React, { createContext, useState, useEffect } from 'react';


const CartContext = createContext();
const { Provider } = CartContext;

const INITIAL_CART_STATE = {
	items: []
};

const CartProvider = ({ children }) => {
	const [cartState, setCartState] = useState({ ...INITIAL_CART_STATE });

	useEffect(() => {
		const items = localStorage.getItem('items');
		// check if items is there
		if (items) {
			// parse items
			const parsedItems = JSON.parse(items);
			// check if items is an array
			if (Array.isArray(parsedItems)) {
				// set items
				setCartState({
					...cartState,
					items: parsedItems
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setCartInfo = (items) => {
		localStorage.setItem('items', JSON.stringify(items));
		setCartState({
			...cartState,
			items
		});
	};

	// add item to cart
	const addItem = (item) => {
		// check if item is already in cart
		const itemIndex = cartState.items.findIndex(
			(cartItem) => cartItem.product._id === item._id
		);
		// if item is already in cart
		if (itemIndex !== -1) {
			// update the quantity
			const updatedItems = cartState.items.map((cartItem) => {
				if (cartItem.product._id === item._id) {
					return {
						...cartItem,
						quantity: cartItem.quantity + 1
					};
				}
				return cartItem;
			});
			// set items
			setCartInfo(updatedItems);
		} else {
			// add item to cart
			setCartInfo([
				...cartState.items,
				{
					product: item,
					quantity: 1
				}
			]);
		}
	};

  const removeItem = (itemId) => {
    // filter out the item
    const updatedItems = cartState.items.filter(
      (item) => item.product._id !== itemId
    );
    // set items
    setCartInfo(updatedItems);
  }

  const increaseQuantity = (itemId) => {
    // increase quantity
    const updatedItems = cartState.items.map((item) => {
      if (item.product._id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    // set items
    setCartInfo(updatedItems);
  }

  const decreaseQuantity = (itemId) => {
    // decrease quantity
    const updatedItems = cartState.items.map((item) => {
      if (item.product._id === itemId) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    // set items
    setCartInfo(updatedItems);
  }

	const clear = () => {
		localStorage.removeItem('items');
		setCartState({ ...INITIAL_CART_STATE });
	};

	return (
		<Provider
			value={{
				cartState,
				setCartInfo,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
				clear
			}}>
			{children}
		</Provider>
	);
};


export { CartContext, CartProvider };