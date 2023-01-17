import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartService from '../../../services/Cart.service';
import { CartContext } from '../../../store/cart.store';
import { toast } from 'react-toastify';
import './ProductCard.styles.css';

const ProductCard = ({ id, image, name, description, price }) => {
	const { addItem }= useContext(CartContext);

	const addToCart = () => {
		CartService.addToCart({ productId: id, quantity: 1 })
			.then((res) => {
				addItem({_id: id, image, name, description, price, quantity: 1})
				toast.success('Product added to cart');
			})
			.catch((err) => {
				toast.error('Error adding product to cart');
			})
			.finally(() => {
			});
	};

	return (
		<div className='col-xl-3 col-lg-4 col-sm-6'>
			<div className='product text-center'>
				<div className='position-relative mb-3'>
					<div className='badge text-white bg-'></div>
					<Link className='d-block' to={`/product/${id}`}>
						<div
							className='image'
							style={{
								backgroundImage: `url(${image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								height: '300px',
								width: '100%'
							}}></div>
					</Link>
					<div className='product-overlay'>
						<ul className='mb-0 list-inline'>
							<li className='list-inline-item me-1 p-0'>
								<button
									className='btn btn-sm btn-dark'
									onClick={addToCart}>
									Add to cart
								</button>
							</li>
							<li className='list-inline-item me-0'>
								<Link
									className='btn btn-sm btn-outline-dark'
									to={`/product/${id}`} 
									>
									<i className='bi bi-arrows-angle-expand'></i>
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<h6>
					<Link
						className='reset-anchor text-decoration-none'
						to={`/product/${id}}`} 
						style={{color: "#064172"}}
						>
						{name}
					</Link>
				</h6>
				<p className='small text-muted'>LKR {price}</p>
			</div>
		</div>
	);
};

export default ProductCard;
