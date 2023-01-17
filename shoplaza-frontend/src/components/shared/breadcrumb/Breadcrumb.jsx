import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ paths }) => {
	return (
		<div className='d-flex justify-content-between align-items-center mb-4 breadcrumb'>
			<div className='small'>
				{paths.map((path, index) => {
					return (
						<React.Fragment key={index}>
							{index !== paths.length - 1 ? (
								<>
									<Link to={`${path.link}`}>{path.name}</Link>
									<span className='text-muted mx-1'>
										&gt;
									</span>
								</>
							) : (
								path.name
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default Breadcrumb;
