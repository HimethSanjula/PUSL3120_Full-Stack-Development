import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '../../components/shared';
import AddReview from '../../components/shared/add-review/AddReview';
import Breadcrumb from '../../components/shared/breadcrumb/Breadcrumb';
import ProductComments from '../../components/shared/product-comments/ProductComments';
import ProductStarRating from '../../components/shared/product-star-rating/ProductStarRating';
import MainLayout from '../../layouts/MainLayout';
import CartService from '../../services/Cart.service';
import ProductService from '../../services/Product.service';
import { AuthContext } from '../../store/auth';
import { CartContext } from '../../store/cart.store';
import './ProductDetails.styles.css';

const ProductDetails = () => {
	const { isAuthenticated } = useContext(AuthContext);
	const { addItem } = useContext(CartContext);
	const navigate = useNavigate();
	const [isLoading, setIsloading] = useState(true);
	const [product, setProduct] = useState(null);
	const productId = useParams().id;

	const getProduct = async () => {
		ProductService.getProduct(productId)
			.then((res) => {
				setProduct(res);
			})
			.catch((err) => {
				toast.error('Error getting product');
			})
			.finally(() => {
				setIsloading(false);
			});
	};
	useEffect(() => {
		getProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addToCart = () => {
		if (isAuthenticated) {
			CartService.addToCart({ productId: productId, quantity: 1 })
				.then((res) => {
					const { image, name, description, price } = product;
					addItem({
						_id: productId,
						image,
						name,
						description,
						price,
						quantity: 1
					});
					toast.success('Product added to cart');
				})
				.catch((err) => {
					toast.error('Error adding product to cart');
				})
				.finally(() => {});
		} else {
			navigate('/login');
		}
	};
	return (
		<MainLayout>
			{isLoading ? (
				<Loading />
			) : (
				product && (
					<div className='container px-4 px-lg-5 my-5'>
						<Breadcrumb
							paths={[
								{ link: '/', name: 'Home' },
								{ link: '/', name: 'Shop' },
								{
									link: `/category/${product.category._id}/${product.category.name}`,
									name: product.category.name
								},
								{ link: ``, name: product.name }
							]}
						/>

						<div className='row gx-4 gx-lg-5 align-items-center'>
							<div className='col-md-6'>
								<div
									className='card-img-top mb-5 mb-md-0 product-preview-image'
									style={{
										backgroundImage: `url(${product.image})`
									}}
								/>
							</div>
							<div className='col-md-6'>
								<div className='small mb-1'>
									SKU: SHLZ-
									{productId
										.substring(productId.length - 4)
										.toUpperCase()}
								</div>
								<h1 className='display-5 fw-bolder'>
									{product.name}
								</h1>
								<div className='fs-5 mb-5'>
									<ProductStarRating productId={productId} />
									<span>LKR {product.price}</span>
								</div>
								<p className='lead'>{product.description}</p>
								<div className='d-flex'>
									<button
										className='btn btn-outline-dark flex-shrink-0'
										type='button'
										onClick={addToCart}>
										<i className='bi-cart-fill me-1'></i>
										Add to cart
									</button>
								</div>
								<AddReview productId={productId} />
							</div>
						</div>
					</div>
				)
			)}
			<ProductComments productId={productId} />
		</MainLayout>
	);
};

export default ProductDetails;
