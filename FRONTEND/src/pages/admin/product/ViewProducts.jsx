import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductRow from '../../../components/admin/product-row/ProductRow';
import { Loading } from '../../../components/shared';
import AdminLayout from '../../../layouts/AdminLayout';
import ProductService from '../../../services/Product.service';
import './product.styles.css';

const ViewProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		ProductService.getProductsAdmin()
			.then((res) => {
				setProducts(res);
			})
			.catch((err) => {
				toast.error('Something went wrong, please try again later');
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<AdminLayout>
			<h1>View Products</h1>
			<div className='row my-3'>
				<div className='col-md-12 text-end'>
					{/* add link to add products */}
					<Link
						to='/admin/products/add'
						className='btn btn-primary w-25'>
						Add Products
					</Link>
				</div>
			</div>
			{loading ? (
				<Loading />
			) : products.length > 0 ? (
				<div style={{ minWidth: '80vw' }}>
					<div className='table-responsive'>
						<table className='table table-success table-striped product-table'>
							<thead>
								<tr>
									<th scope='col-md-1'>ID</th>
									<th scope='col-md-2'>Image</th>
									<th scope='col'>Name</th>
									<th scope='col'>Price</th>
									<th scope='col'>QTY</th>
									<th scope='col'>Description</th>
									<th scope='col'>Category</th>
									<th scope='col'>Action</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product, index) => (
									<ProductRow
										key={product._id}
										id={product._id}
										index={index}
										image={product.image}
										name={product.name}
										price={product.price}
										qty={product.quantity}
										description={product.description}
										category={product.category}
										isDeleted={product.isDeleted}
										onDelete={(id) => {
											// set isDeleted to true in the product array
											const newProducts = products.map(
												(product) => {
													if (product._id === id) {
														product.isDeleted = true;
													}
													return product;
												}
											);
											setProducts(newProducts);
										}}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<div className='text-center'>
					<h3>No products found</h3>
					<Link to='/admin/products/add' className='btn btn-primary'>
						{' '}
						Add Product{' '}
					</Link>
				</div>
			)}
		</AdminLayout>
	);
};

export default ViewProducts;
