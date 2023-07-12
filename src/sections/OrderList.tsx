import { Table } from "react-bootstrap";
import { PurchasedProduct } from "../interfaces/PurchasedProduct";

interface Props {
	orders: PurchasedProduct[];
}

const OrderList = ({ orders }: Props) => {
	if (orders.length === 0) {
		return;
	}

	return (
		<div className="d-flex flex-column align-items-center">
			<h1 className="py-1 text-white">Orders</h1>
			<Table
				bordered
				hover
				variant="dark"
				className="pe-none"
				style={{ maxWidth: "1100px" }}>
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
					{orders.map((order, index) => (
						<tr className="pe-auto" key={index}>
							<td>{index + 1}</td>
							<td>
								<img
									src={order.image}
									style={{ width: "175px", maxHeight: "125px" }}
									className="object-fit-contain"
								/>
							</td>
							<td>{order.name}</td>
							<td>${order.price}</td>
							<td>{order.quantity}</td>
							<td>{order.status}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default OrderList;
