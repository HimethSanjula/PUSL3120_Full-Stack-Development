import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import ProductService from '../../../services/Product.service';

const ProductComments = ({ productId }) => {
	const [ratings, setRatings] = useState([]);
	useEffect(() => {
		ProductService.getReivews(productId)
			.then((res) => {
				setRatings(res);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className='container  px-4 px-lg-5 my-5'>
			<h3>Customer Comments</h3>

			<div className='row justify-content-between pt-2 '>
				{ratings.map((rating) => {
					return (
						<div className='col-md-5 border border-1 rounded my-2'>
							<div className='row pt-2'>
								<div className='col-md-2 justify-content-center align-items-center text-center'>
									<img
										src={`https://avatars.dicebear.com/v2/avataaars/${rating.user.id}.svg`}
										width='50'
										height='50'
										className='rounded-circle border border-1'
										alt='profile'
									/>
								</div>
								<div className='col-md-10'>
									<p>
										<span>{rating.user.name}</span>
										<div className='mt-0 pt-0'>
											<StarRatings
												rating={rating.rating}
												starRatedColor='gold'
												numberOfStars={5}
												name='rating'
												starDimension='15px'
												starSpacing='1px'
											/>
										</div>
									</p>
									<div className='clearfix'></div>
								</div>
							</div>
							<div className='row justify-content-end'>
								<div className='col-md-10'>
									<p>
										{rating.comment || (
											<span className='text-muted'>
												no comment
											</span>
										)}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProductComments;
