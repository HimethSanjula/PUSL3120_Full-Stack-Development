import React from 'react';

const Payment = ({ data, onChange }) => {
	const { cardType, cardNumber, cardName, cardExpiry, cardCvv } = data;
	console.log(data)
	return (
		<>
			<h4 className='mb-3'>Payment</h4>

			<div className='my-3'>
				<div className='form-check'>
					<input
						id='credit'
						name='cardType'
						type='radio'
						className='form-check-input'
						required=''
						value='credit'
						onChange={onChange}
						checked={cardType === 'credit'}
					/>
					<label className='form-check-label' htmlFor='credit'>
						Credit card
					</label>
				</div>
				<div className='form-check'>
					<input
						id='debit'
						name='cardType'
						type='radio'
						className='form-check-input'
						required=''
						value='debit'
						onChange={onChange}
						checked={cardType === 'debit'}
					/>
					<label className='form-check-label' htmlFor='debit'>
						Debit card
					</label>
				</div>
			</div>

			<div className='row gy-3'>
				<div className='col-md-6'>
					<label htmlFor='cc-name' className='form-label'>
						Name on card
					</label>
					<input
						type='text'
						className='form-control'
						id='cc-name'
						placeholder=''
						required=''
						name='cardName'
						value={cardName}
						onChange={onChange}
					/>
					<small className='text-muted'>
						Full name as displayed on card
					</small>
					<div className='invalid-feedback'>
						Name on card is required
					</div>
				</div>

				<div className='col-md-6'>
					<label htmlFor='cc-number' className='form-label'>
						Credit card number
					</label>
					<input
						type='text'
						className='form-control'
						id='cc-number'
						placeholder=''
						name='cardNumber'
						value={cardNumber}
						onChange={onChange}
						required=''
					/>
				</div>

				<div className='col-md-3'>
					<label htmlFor='cc-expiration' className='form-label'>
						Expiration
					</label>
					<input
						type='text'
						className='form-control'
						id='cc-expiration'
						placeholder='MM/YY'
						required=''
						name='cardExpiry'
						value={cardExpiry}
						onChange={onChange}
					/>
				</div>

				<div className='col-md-3'>
					<label htmlFor='cc-cvv' className='form-label'>
						CVV
					</label>
					<input
						type='text'
						className='form-control'
						id='cc-cvv'
						placeholder=''
						required=''
						name='cardCvv'
						value={cardCvv}
						onChange={onChange}
					/>
					<div className='invalid-feedback'>
						Security code required
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;
