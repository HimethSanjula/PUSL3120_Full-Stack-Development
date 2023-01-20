import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import ProductService from '../../../services/Product.service';

const ProductStarRating = ({ productId }) => {
	const [ratings, setRatings] = useState([]);
	useEffect(() => {
		ProductService.getReivews(productId)
			.then((res) => {
				setRatings(res);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className='d-flex align-items-center mb-2'>
			<StarRatings
				rating={
					ratings.length > 0
						? ratings.reduce((acc, item) => item.rating + acc, 0) /
						  ratings.length
						: 0
				}
				starRatedColor='gold'
				numberOfStars={5}
				name='rating'
				starDimension='20px'
				starSpacing='2px'
			/>
			<span className='ms-2 mt-2'>
				(
				{ratings.length > 0
					? ratings.reduce((acc, item) => item.rating + acc, 0) /
					  ratings.length
					: 0}{' '}
				stars from {ratings.length} reviews)
			</span>
		</div>
	);
};

export default ProductStarRating;
