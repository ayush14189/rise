import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

const popularProducts = [
	{
		id: '3432',
		product_name: 'Macbook M1 Pro 14"',
		product_thumbnail: 'https://source.unsplash.com/100x100?macbook',
		product_price: '$1499.00',
		product_stock: 341
	},
	{
		id: '7633',
		product_name: 'Samsung Galaxy Buds 2',
		product_thumbnail: 'https://source.unsplash.com/100x100?earbuds',
		product_price: '$399.00',
		product_stock: 24
	},
	{
		id: '6534',
		product_name: 'Asus Zenbook Pro',
		product_thumbnail: 'https://source.unsplash.com/100x100?laptop',
		product_price: '$899.00',
		product_stock: 56
	},
	{
		id: '9234',
		product_name: 'LG Flex Canvas',
		product_thumbnail: 'https://source.unsplash.com/100x100?smartphone',
		product_price: '$499.00',
		product_stock: 98
	},
	{
		id: '4314',
		product_name: 'Apple Magic Touchpad',
		product_thumbnail: 'https://source.unsplash.com/100x100?touchpad',
		product_price: '$699.00',
		product_stock: 0
	},
	{
		id: '4342',
		product_name: 'Nothing Earbuds One',
		product_thumbnail: 'https://source.unsplash.com/100x100?earphone',
		product_price: '$399.00',
		product_stock: 453
	}
]

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
