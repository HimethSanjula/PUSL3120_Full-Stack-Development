import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../store/cart.store';

const CartIcon = () => {
  const { cartState } = useContext(CartContext);
  const { items } = cartState;
	return (
		<Link
			className='border border-1 rounded-5 '
			to='/cart'
			style={{
				width: '40px',
				height: '40px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				cursor: 'pointer',
				borderRadius: '50%',
				backgroundColor: '#fff',
        position: 'relative',
			}}>
			<i className='bi bi-cart-fill' style={{color: "black"}}></i>
      <span className='badge bg-success rounded-pill mb-2 text-light d'
        style={{
          fontSize: '0.7rem',
          fontWeight: 'lighter',
          position: 'absolute',
          bottom: '-15px',
          right: '-5px'
        }}
      >{items.length}</span>
		</Link>
	);
};

export default CartIcon;
