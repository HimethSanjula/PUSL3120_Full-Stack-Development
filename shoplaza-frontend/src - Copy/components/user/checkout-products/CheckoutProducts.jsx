import React from 'react';

const CheckoutProducts = ({ products }) => {
	return (
		<div className='col-md-5 col-lg-4 order-md-last'>
			<h4 className='d-flex justify-content-between align-items-center mb-3'>
				<span className='text-primary'>Your cart</span>
				<span className='badge bg-primary rounded-pill'>
					{products.length}
				</span>
			</h4>
			<ul className='list-group mb-3'>
				{products.map((item) => {
					const product = item.product;
					console.log(product);
					return (
						<li
							className='list-group-item d-flex justify-content-between lh-sm'
							key={product._id}>
							<div>
								<h6 className='my-0'>{product.name}</h6>
								<small className='text-muted'>
									{item.quantity} x {product.price} LKR
								</small>
							</div>
							<span className='text-muted'>
								LKR {item.quantity * product.price}
							</span>
						</li>
					);
				})}
				<li className='list-group-item d-flex justify-content-between'>
					<span>Total</span>
					<strong>
						LKR {products.reduce((acc, item) => {
							return acc + item.quantity * item.product.price;
						}, 0)}
					</strong>
				</li>
			</ul>
		</div>
	);
};

export default CheckoutProducts;
