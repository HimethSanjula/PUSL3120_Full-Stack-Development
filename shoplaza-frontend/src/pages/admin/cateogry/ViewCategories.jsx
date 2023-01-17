import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '../../../components/shared';
import AdminLayout from '../../../layouts/AdminLayout';
import ProductService from '../../../services/Product.service';

const ViewCategories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		ProductService.getCategories()
			.then((res) => {
				setCategories(res);
			})
			.catch((err) => {
				toast.error('Something went wrong, please try again later');
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

  const deleteCategory = (id) => {
    if(window.confirm('Are you sure you want to delete this category?')){
      ProductService.deleteCategory(id)
      .then((res) => {
        toast.success('Category deleted successfully');
        setCategories(categories.filter((category) => category._id !== id));
      })
      .catch((err) => {
        
        toast.error(`Error. ${err.data.message}`);
      })
    }
  };
	return (
		<AdminLayout>
			<h1>View Categories</h1>
			<div className='row my-3'>
				<div className='col-md-12 text-end'>
					{/* add link to add products */}
					<Link
						to='/admin/category/add'
						className='btn btn-primary w-25'>
						Add Category
					</Link>
				</div>
			</div>
			{loading ? (
				<Loading />
			) : (
				categories.length > 0 ? (
					<div style={{ minWidth: '60vw' }}>
					<div className='table-responsive'>
						<table className='table table-success table-striped product-table'>
							<thead>
								<tr>
									<th scope='col-md-1'>ID</th>
									<th scope='col-md-2'>Name</th>
									<th scope='col'>Action</th>
								</tr>
							</thead>
							<tbody>
								{categories.map((category, index) => (
									<tr key={index}>
										<td>{category._id}</td>
										<td>{category.name}</td>
										<td>
											<Link
												to={`/admin/category/edit/${category._id}`}
                        state={category}
												className='btn btn-primary btn-sm me-2'>
												Edit
											</Link>
											<button
												className='btn btn-danger btn-sm'
												onClick={() => deleteCategory(category._id)}>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				) : (
					<div className='text-center'>
						<h3>No categories found</h3>
						<Link to='/admin/category/add' className='btn btn-primary'> Add Category</Link>
					</div>
				)
			)}
		</AdminLayout>
	);
};

export default ViewCategories;
