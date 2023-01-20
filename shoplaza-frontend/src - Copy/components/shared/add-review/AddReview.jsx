import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import ProductService from '../../../services/Product.service';
import Loading from '../loading/Loading';

const AddReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
	const changeRating = (newRating, name) => {
		setRating(newRating);
	};

  const submitReview = (e) => {
    e.preventDefault();
    if(rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if(rating <= 3 && comment === '') {
      toast.error('Please write a review');
      return;
    }

    const review = {
      rating,
      comment
    }
    setIsLoading(true);
    ProductService.addReview(productId, review).then((res) => {
      toast.success('Review added successfully, please refresh the page to see the review');
      setRating(0);
      setComment('');
    }).catch((err) => {
      toast.error('Error adding review');
    }).finally(() => {
      setIsLoading(false);
    });
  }
	return (
		<div className='row mt-3'>
			<div className='col-12'>
				<div className='card'>
					<div className='card-body'>
						<form onSubmit={submitReview}>
							<div className='form-group'>
								<label htmlFor='rating' className='mb-1'>
									Rating
								</label>
								<br />
								<StarRatings
									rating={rating}
									starRatedColor='gold'
                  starHoverColor='#bd9f00'
									changeRating={changeRating}
									numberOfStars={5}
									name='rating'
									starDimension='25px'
									starSpacing='2px'
								/>
							</div>
							<div className='form-group my-2'>
								<label htmlFor='review'>Review</label>
								<textarea
									className='form-control'
									id='review'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder='Write your review'
									rows='2'
									required></textarea>
							</div>

							<div className='row'>
								<div className='col-md-12 text-end'>
									<button
										type='submit'
										className='btn btn-primary w-25'
                    disabled={isLoading}>
										{isLoading ? (<Loading/>):('Submit')}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddReview;
