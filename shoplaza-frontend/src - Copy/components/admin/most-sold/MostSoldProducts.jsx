import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReportService from '../../../services/Report.service';
import { Loading } from '../../shared';

const MostSoldProducts = ({}) => {
	const [mostSoldProducts, setMostSoldProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		ReportService.getMostSoldProducts()
			.then((res) => {
				setMostSoldProducts(res);
			})
			.catch((err) => {
				toast.error('Error fetching most sold products');
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div className='container mt-5 pt-3'>
			<h3>Most sold items</h3>
			{loading ? (
				<div className='text-center'>
					<Loading />
				</div>
			) : (
				<div className='row mb-3'>
					{mostSoldProducts.map((product) => {
						return (
							<div className='col-md-3'>
								<div className='card'>
									<div className='card-body'>
                    {/* card image */}
                    <img src={product.image} alt={product.name} className='img-fluid'/>

										<h5 className='card-title'>
											{product.name}
										</h5>
										<p className='card-text'>
											Sold {product.total} times
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default MostSoldProducts;
