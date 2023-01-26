import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '../../../components/shared';
import MainLayout from '../../../layouts/MainLayout';
import CartService from '../../../services/Cart.service';
import { CartContext } from '../../../store/cart.store';
import './Cart.styles.css';

const Cart = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { setCartInfo, cartState } = useContext(CartContext);

	useEffect(() => {
		if (cartState.items.length <= 0) {
			setIsLoading(true);
			CartService.getCart()
				.then((res) => {
					if (res.products.length > 0) {
						setCartInfo(res.products);
					}else{
            setCartInfo([]);
            toast.info('Cart is empty')
          }
				})
				.catch((err) => {
					toast.error("No items in cart");
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<MainLayout>
			<div className='container px-3 my-5 clearfix'>
				<div className='card'>
					<div className='card-header'>
						<h2>Shopping Cart</h2>
					</div>
					{isLoading ? (
						<Loading />
					) : (
						<div className='card-body'>
							{cartState.items.length > 0 ? (
								<>
									<div className='table-responsive'>
										<table className='table table-bordered m-0'>
											<thead>
												<tr>
													<th
														className='text-center py-3 px-4'
														style={{
															minWidth: '400px'
														}}>
														Product Name &amp;
														Details
													</th>
													<th
														className='text-right py-3 px-4'
														style={{
															width: '100px'
														}}>
														Price
													</th>
													<th
														className='text-center py-3 px-4'
														style={{
															width: '120px'
														}}>
														Quantity
													</th>
													<th
														className='text-right py-3 px-4'
														style={{
															width: '100px'
														}}>
														Total
													</th>
													<th
														className='text-center align-middle py-3 px-0'
														style={{
															width: '40px'
														}}></th>
												</tr>
											</thead>
											<tbody>
												{cartState.items.length > 0 &&
													cartState.items.map(
														(item) => {
															const product =
																item.product;
															return (
																<ProductRow
																	id={
																		product._id
																	}
																	key={
																		product._id
																	}
																	name={
																		product.name
																	}
																	image={
																		product.image
																	}
																	price={
																		product.price
																	}
																	quantity={
																		item.quantity
																	}
																	description={
																		product.description
																	}
																/>
															);
														}
													)}
											</tbody>
										</table>
									</div>

									<div className='d-flex flex-wrap justify-content-end align-items-center pb-4'>
										<div className='d-flex'>
											<div className='text-right mt-4'>
												<label className='text-muted font-weight-normal m-0'>
													Total price
												</label>
												<div className='text-large'>
													<strong>
														LKR{' '}
														{cartState.items.reduce(
															(acc, item) =>
																acc +
																item.product
																	.price *
																	item.quantity,
															0
														)}
													</strong>
												</div>
											</div>
										</div>
									</div>

									<div className='row justify-content-between'>
										<Link
											type='button'
											to='/'
											className='col-md-3 btn btn-lg btn-default md-btn-flat mt-2 mr-3 btn-border border border-1'>
											Back to shopping
										</Link>
										<Link
											type='button'
											className='col-md-3  btn btn-lg btn-primary mt-2'
                      to='/checkout'
                      state={{ cart: cartState.items }}
                      >
											Checkout
										</Link>
									</div>
								</>
							) : (
								<div className='text-center'>
									<h3 className='text-muted'>
										Your cart is empty
									</h3>
									<Link
										to='/'
										className='btn btn-primary mt-3'>
										Back to shopping
									</Link>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</MainLayout>
	);
};

const ProductRow = ({ id, name, image, description, price, quantity }) => {
	const [loading, setLoading] = useState(false);
	const { removeItem } = useContext(CartContext);
	const onDelete = async () => {
		if (window.confirm('Are you sure?')) {
			setLoading(true);
			CartService.deleteItemFromCart(id)
				.then((res) => {
					removeItem(id);
					toast.success('Item deleted from cart');
				})
				.catch((err) => {
					toast.error('Error deleting item from cart');
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};
	return (
		<tr>
			<td className='p-4'>
				<div className='row media align-items-center'>
					{loading ? (
						<Loading />
					) : (
						<img
							src={image}
							className='col-md-4 ui-w-40 ui-bordered mr-4'
							alt=''
						/>
					)}
					<div className='col-md-6 media-body'>
						<Link
							to={`/product/${id}`}
							className='d-block text-dark'
							target='_blank'>
							{name}
						</Link>
						<small>
							<span className='text-muted'>description:</span>
							<span className='text-muted'>
								{/* show 30 characters of description */}
								{description.substring(0, 30)}...
							</span>
						</small>
					</div>
				</div>
			</td>
			<td className='text-right font-weight-semibold align-middle p-4'>
				LKR {price}
			</td>
			<td className='align-middle p-4'>
				<input
					type='number'
					className='form-control text-center'
					value={quantity}
					onChange={() => console.log('hello')}
				/>
			</td>
			<td className='text-right font-weight-semibold align-middle p-4'>
				LKR {price * quantity}
			</td>
			<td className='text-center align-middle px-0'>
				<span
					onClick={onDelete}
					className='shop-tooltip close float-none text-danger'
					title=''
					data-original-title='Remove'>
					×
				</span>
			</td>
		</tr>
	);
};

export default Cart;
