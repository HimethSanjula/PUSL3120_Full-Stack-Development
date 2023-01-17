import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
import ReportService from '../../../services/Report.service';
import { Loading } from '../../shared';

const SalesGraphs = () => {
	const [sales, setSales] = useState([]);
	const [loading, setLoading] = useState(true);

	const past12MonthsWithYear = () => {
		const months = [];
		const date = new Date();
		for (let i = 0; i < 12; i++) {
			let month = date.getMonth() + 1;
			month = month < 10 ? `0${month}` : month;
			months.push(`${date.getFullYear()}-${month}`);
			date.setMonth(date.getMonth() - 1);
		}
		return months;
	};

	const getMonthlySales = (month) => {
		const sale = sales.find((s) => s._id === month);
		return sale ? sale.total : 0;
	};

	useEffect(() => {
		ReportService.getSales()
			.then((res) => {
				setSales(res);
			})
			.catch((err) => {
				toast.error('Error fetching sales');
			})
			.finally(() => {
				setLoading(false);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getChartData = () => {
		const months = past12MonthsWithYear();
		const data = [];
		months.forEach((month) => {
			data.push({
				name: month,
				sales: getMonthlySales(month)
			});
		});
		// reverse the array so that the latest month is at the end
		return data.reverse();
	};
	return (
		<div
			className='container'
			style={{
				height: '50vh',
				width: '100%'
			}}>
			<h3>Sales for past 12 months</h3>

			<div className='row h-100 w-100'>
				<div className='col-md-12 h-100 w-100'>
					{loading ? (
						<div className='text-center'>
							<Loading />
						</div>
					) : (
						<>
							<ResponsiveContainer
								width='100%'
								height='100%'
								className='h-100 w-100 border border-1'>
								<AreaChart
									width={500}
									height={400}
									data={getChartData()}
									margin={{
										top: 10,
										right: 30,
										left: 0,
										bottom: 0
									}}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									<Area
										type='monotone'
										dataKey='sales'
										stroke='#8884d8'
										fill='#8884d8'
									/>
								</AreaChart>
							</ResponsiveContainer>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default SalesGraphs;
