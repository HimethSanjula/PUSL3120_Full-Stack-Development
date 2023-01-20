import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Loading } from '../../components/shared';
import ProductCard from '../../components/user/product-card/ProductCard';
import MainLayout from '../../layouts/MainLayout';
import ProductService from '../../services/Product.service';

const HomePage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// get products
		ProductService.getProducts()
			.then((res) => {
				setProducts(res);
			})
			.catch((err) => {
				toast.error('Something went wrong, please try again later')
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<MainLayout>
			<div
				className='div'
				style={{
					backgroundImage: `url(https://i.imgur.com/ERZODtl.jpg)`,
					width: '100%',
					height: '65vh',
					backgroundPosition: 'center center',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}></div>
			<div className='container mt-5'>
				<h1 className='my-3 pb-3'>Shoplaza - Shop with confidence</h1>
				{loading ? (
					<Loading />
				) : (
					<div className='row'>
						{products.map((product) => {
							return (
								<ProductCard
									key={product._id}
									id={product._id}
									name={product.name}
									description={product.description}
									price={product.price}
									image={product.image}
								/>
							);
						})}
					</div>
				)}
			</div>
		</MainLayout>
	);
};

export default HomePage;
