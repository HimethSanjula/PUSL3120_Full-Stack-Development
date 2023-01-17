import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	Alert,
	CustomSelect,
	Input,
	Loading
} from '../../../components/shared';
import AdminLayout from '../../../layouts/AdminLayout';
import ProductService from '../../../services/Product.service';

const UpdateProduct = () => {
	const navigate = useNavigate();
	const productId = useParams().id;
  let data = useLocation();
	const [imageFile, setImageFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState({
		name: '',
		description: '',
		price: 1,
		category: '',
		image: '',
		quantity: 1
	});
	const [error, setError] = useState(null);


	const { name, description, price, category, image, quantity } = product;

  useEffect(() => {
    if (data.state) {
      const { name, description, price, image, quantity } = data.state;
      const category = data.state.category._id;
      setProduct({ name, description, price, category, image, quantity });
    } else {
      ProductService.getProduct(productId)
        .then((res) => {
	        const { name, description, price, category, image, quantity } = res;

          setProduct({ name, description, price, category, image, quantity });
        })
        .catch((err) => {
					toast.error('Error fetching product');
        });
    }
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
    let imageURL = image;
		if(imageFile){
      imageURL = await uploadImage();
    }
    if (imageURL) {
			const payload = { ...product, image: imageURL };
			setLoading(true);
			ProductService.updateProduct(productId, payload)
				.then((res) => {
					toast.success('Product updated successfully');
					// clear form
					setProduct({
						name: '',
						description: '',
						price: 1,
						category: '',
						image: '',
						quantity: 1
					});

					// clear image
					setImageFile(null);
					// clear error
					setError(null);
					navigate('/admin/products');

				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
					// navigate to products page using react-router-dom
				});
		} else {
			setError("Couldn't upload image");
		}
		
	};
	const uploadImage = async () => {
		const data = new FormData();
		data.append('file', imageFile);
		data.append('upload_preset', 'r7q9vqqw');
		data.append('cloud_name', 'dujg3zbcd');
		let tempImageURL = null;
		await fetch('https://api.cloudinary.com/v1_1/dujg3zbcd/image/upload', {
			method: 'post',
			body: data
		})
			.then((res) => res.json())
			.then((data) => {
				tempImageURL = data.url;
				return data.url;
			})
			.catch((err) => {
				return null;
			})
			.finally(() => {
				return tempImageURL;
			});
		return tempImageURL;
	};
	return (
		<AdminLayout>
			<h1>Update Product</h1>

			<div className='row justify-content-center'>
				<div className='col-md-6 bg-dark text-light p-4 rounded'>
					<h3>update the information to update the product</h3>

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
						<label className='form-label'>
							Description <span className='text-danger'>*</span>
						</label>
						<textarea
							className='form-control p-13-px mb-3'
							value={description}
							name='description'
							id=''
							onChange={handleChange}
							placeholder='Enter Description'
							cols='30'
							rows='4'
						/>
						<div className='row'>
							<Input
								type='number'
								name='price'
								value={price}
								onChange={handleChange}
								label='Price'
								className={'col-md-6'}
								required
							/>
							<Input
								type='number'
								name='quantity'
								value={quantity}
								onChange={handleChange}
								label='Quantity'
								className={'col-md-6'}
								required
							/>
						</div>
						<CustomSelect
							value={category}
							asyncDataLoader={ProductService.getCategories}
							isAsync={true}
							dataPath='res'
							valuePath='_id'
							labelPath='name'
							label={'Category'}
							required
							onSelect={(e) =>
								setProduct({ ...product, category: e })
							}
						/>
						{/* image preview */}
						<div className="row justify-content-center">
            <div className='col-md-12'>
							{!imageFile && image && (
								<div
									style={{
										margin: 'auto',
										width: '400px',
										height: '400px',
										backgroundImage: `url(${image})`,
										backgroundSize: 'contain',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat'
									}}
								/>
							)}
						</div>
            <div className='col-md-12'>
							{imageFile && (
								<div
									style={{
										margin: 'auto',
										width: '400px',
										height: '400px',
										backgroundImage: `url(${URL.createObjectURL(
											imageFile
										)})`,
										backgroundSize: 'contain',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat'
									}}
								/>
							)}
						</div>
            </div>
						<Input
							type='file'
							name='image'
							onChange={(e) => {
								setImageFile(e.target.files[0]);
							}}
							label='Image'
							
						/>

						<button
							type='submit'
							className='btn btn-primary w-100 mt-3 mb-3'>
							{loading ? <Loading /> : 'Update Product'}
						</button>

						{error && (
							<Alert
								type='danger'
								message={`Error while creating the product. \n Details : ${error}`}
							/>
						)}
					</form>
				</div>
			</div>
		</AdminLayout>
	);
};

export default UpdateProduct;
