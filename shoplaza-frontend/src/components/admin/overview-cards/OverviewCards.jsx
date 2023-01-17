import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReportService from '../../../services/Report.service';
import { Loading } from '../../shared';
import './overviewcards.styles.css';

const OverviewCards = () => {
	const [overview, setOverview] = useState({});
	const [loading, setLoading] = useState(true);
	const config = {
		orders: {
      icon: 'fa fa-cart-plus',
      color: 'bg-c-blue'
    },
		products: {
      icon: 'fa fa-cubes',
      color: 'bg-c-green'
    },
		users: {
      icon: 'fa fa-users',
      color: 'bg-c-yellow'
    },
		payments: {
      icon: 'fa fa-credit-card',
      color: 'bg-c-pink'
    }
	};

	useEffect(() => {
		ReportService.getOverview()
			.then((res) => {
				setOverview(res);
			})
			.catch((err) => {
				toast.error('Error fetching overview');
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return (
		<div className='container'>
			{loading ? (
				<div className='text-center'>
					<Loading />
				</div>
			) : (
				<div className='row'>

          {Object.keys(overview).map((key) => {
            console.log(key)
            console.log(overview[key])
            return (
              <OverviewCard key={key} icon={config[key].icon} title={key} count={overview[key]} color={config[key].color}/>
            )
          })}

				</div>
			)}
		</div>
	);
};

const OverviewCard = ({ title, icon, count, color }) => {
	return (
		<div className='col-md-4 col-xl-3'>
			<div className={`card ovcard ${color} order-card`}>
				<div className='card-block'>
					<h5 className='m-b-20'>{title}</h5>
					<h2 className='text-right'>
						<i className={`fa ${icon} f-left pe-2`}></i>
						<span>{count}</span>
					</h2>
				</div>
			</div>
		</div>
	);
};

export default OverviewCards;
