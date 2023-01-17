import React from 'react';
import constants from '../../../utils/constants';

const BillingDetails = ({ data, onChange }) => {
	const { name, deliveryAddress, state, city, zip } = data;

	return (
		<>
			<h4 className='mb-3'>Billing address</h4>
			<form className='needs-validation' noValidate=''>
				<div className='row g-3'>
					<div className='col-sm-12'>
						<label htmlFor='firstName' className='form-label'>
							Name
						</label>
						<input
							type='text'
							className='form-control'
							id='firstName'
							value={name}
							name='name'
							placeholder='name'
							onChange={onChange}
							required=''
						/>
					</div>

					<div className='col-12'>
						<label htmlFor='address' className='form-label'>
							Address
						</label>
						<textarea
							type='text'
							className='form-control'
							id='address'
							rows='3'
							name='deliveryAddress'
							value={deliveryAddress}
							onChange={onChange}
							placeholder='1234 Main St'
							required=''
						/>
					</div>

					<div className='col-md-4'>
						<label htmlFor='state' className='form-label'>
							State
						</label>
						<select
							className='form-select'
							id='state'
							required=''
							name='state'
							onChange={onChange}
							value={state}>
							<option value='' disabled className='d-none'>
								Choose...
							</option>
							{constants.districts.map((district) => (
								<option value={district} key={district}>
									{district}
								</option>
							))}
						</select>
					</div>

					<div className='col-md-5'>
						<label htmlFor='country' className='form-label'>
							City
						</label>
						<input
							type='text'
							className='form-control'
							id='city'
							name='city'
							placeholder='Colombo'
							onChange={onChange}
							value={city}
						/>
					</div>

					<div className='col-md-3'>
						<label htmlFor='zip' className='form-label'>
							Zip
						</label>
						<input
							type='text'
							className='form-control'
							id='zip'
							placeholder=''
							required=''
							name='zip'
							onChange={onChange}
							value={zip}
						/>
					</div>
				</div>

				<hr className='my-4' />
			</form>
		</>
	);
};

export default BillingDetails;
