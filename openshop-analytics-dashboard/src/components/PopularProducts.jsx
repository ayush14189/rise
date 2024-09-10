import classNames from 'classnames'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'



function PopularProducts() {
	const [applications, setApplications] = React.useState([]);
	useEffect(() => {
		fetchPatents();
	  }, []);
	
	  const fetchPatents = async () => {
		try {
		  const response = await fetch('http://localhost:5000/api/user/patents');
		  const data = await response.json();
		  setApplications(data);
		} catch (error) {
		  console.error('Error fetching patents:', error);
		}
	  };
	return (
		<div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
			<strong className="text-gray-700 font-medium">Your Patents</strong>
			<div className="mt-4 flex flex-col gap-3">
				{applications.map((product) => (
					<div>
						{/* <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
							<img
								className="w-full h-full object-cover rounded-sm"
								src={product.product_thumbnail}
								alt={product.product_name}
							/>
						</div> */}
						<div className="ml-4 flex-1">
							<p className="text-sm text-gray-800">{product.title}</p>
							<span
								className={classNames(
									product.status === 'Pending'
										? 'text-red-500'
										:  'text-green-500',
										
									'text-xs font-medium'
								)}
							>
								{product.status === 'Pending' ? 'Pending' : product.status }
							</span>
						</div>
						{/* <div className="text-xs text-gray-400 pl-1.5">{product.product_price}</div> */}
					</div>
				))}
			</div>
		</div>
	)
}

export default PopularProducts
