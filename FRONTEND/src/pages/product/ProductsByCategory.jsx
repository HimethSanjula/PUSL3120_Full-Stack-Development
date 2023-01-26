import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '../../components/shared';
import ProductCard from '../../components/user/product-card/ProductCard';
import MainLayout from '../../layouts/MainLayout';
import ProductService from '../../services/Product.service';

const ProductsByCategory = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const category = useParams().id;
	const name = useParams().name;

	useEffect(() => {
		setLoading(true);
		ProductService.getProductsByCategory(category)
			.then((res) => {
				setProducts(res);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				toast.error('Error fetching products');
			})
			.finally(() => {
				setLoading(false);
			});
	}, [category]);

	return (
		<MainLayout>
			<div className='container'>
				<div className='row my-3'>
					<div className='col-12'>
						<h1 className='text-center'>Products by category- {name}</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						{loading ? (
							<div className='text-center'>
								<Loading />
							</div>
						) : (
							<div className='row'>
								{products.map((product) => (
									<ProductCard
										key={product._id}
										id={product._id}
										image={product.image}
										name={product.name}
										description={product.description}
										price={product.price}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProductsByCategory;
