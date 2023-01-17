import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	Alert,
	Input,
	Loading
} from '../../../components/shared';
import AdminLayout from '../../../layouts/AdminLayout';
import ProductService from '../../../services/Product.service';

const UpdateCategory = () => {
	const [loading, setLoading] = useState(false);
	let data = useLocation();
	const categoryId = useParams().id;
  const navigate = useNavigate();
	const [name, setName] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		if (data.state) {
			const { name } = data.state;
			setName(name);
		} else {
			toast.error('Error fetching category');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (name) {
			setLoading(true);
			ProductService.updateCategory(categoryId, { name })
				.then((res) => {
					// clear form
          toast.success('Category updated successfully');
          setName('');
					setError(null);
          navigate('/admin/categories');
          
				})
				.catch((err) => {
					toast.error("Couldn't add category");
					setError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			toast.error('Please enter a name');
		}
	};

	return (
		<AdminLayout>
			<h1>Add Category</h1>

			<div className='row justify-content-center'>
				<div className='col-md-6 bg-dark text-light p-4 rounded'>
					<h3>Fill the information to add new category</h3>

					<form onSubmit={onSubmit}>
						<Input
							type='text'
							name='name'
							value={name}
							onChange={handleChange}
							label='Name'
							placeholder='Enter Name'
							required
						/>

						<button
							type='submit'
							className='btn btn-primary w-100 mt-3 mb-3'>
							{loading ? <Loading /> : 'Create Category'}
						</button>

						{error && (
							<Alert
								type='danger'
								message={`Error while creating the category. \n Details : ${error}`}
							/>
						)}
					</form>
				</div>
			</div>
		</AdminLayout>
	);
};

export default UpdateCategory;
