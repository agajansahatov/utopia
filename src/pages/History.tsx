import { Button, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const sidebarLinks = [
	{
		id: 0,
		label: "Orders",
	},
	{
		id: 1,
		label: "Favourites",
	},
	{
		id: 2,
		label: "Watchlist",
	},
];

const History = () => {
	const [content, setContent] = useState(0);
	const onContentChange = () => {};
	return (
		<>
			<Sidebar elements={sidebarLinks} onClick={onContentChange} />
			<main className="content">
				<Table bordered hover variant="dark" className="pe-none">
					<thead>
						<tr>
							<th>#</th>
							<th>Image</th>
							<th>Name</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr className="pe-auto">
							<td>1</td>
							<td>
								<img
									src="assets/products/product3.webp"
									style={{ width: "175px" }}
								/>
							</td>
							<td>Otto</td>
							<td>$10</td>
							<td>5</td>
							<td>Paid</td>
						</tr>
						<tr className="pe-auto">
							<td>2</td>
							<td>
								<img
									src="assets/products/product3.webp"
									style={{ width: "175px" }}
								/>
							</td>
							<td>Thornton</td>
							<td>$15</td>
							<td>5</td>
							<td>Paid</td>
						</tr>
						<tr className="pe-auto">
							<td>3</td>
							<td>
								<img
									src="assets/products/product3.webp"
									style={{ width: "175px" }}
								/>
							</td>
							<td>Thornton</td>
							<td>$8</td>
							<td>5</td>
							<td>Paid</td>
						</tr>
					</tbody>
				</Table>
			</main>
		</>
	);
};

export default History;
