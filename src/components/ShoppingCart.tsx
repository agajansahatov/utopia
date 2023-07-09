import ShoppingBasket from "./ShoppingBasket";
import { Badge, Button, Modal, Table } from "react-bootstrap";

interface Props {
	visible: boolean;
	onToggle: () => void;
}

const ShoppingCart = ({ visible, onToggle }: Props) => {
	return (
		<>
			<ShoppingBasket onClick={onToggle} />
			<Modal
				show={visible}
				onHide={onToggle}
				backdrop="static"
				keyboard={false}
				fullscreen={true}>
				<Modal.Header closeButton>
					<Modal.Title className="pe-none">
						Your Utopia Shopping Cart
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table bordered hover variant="dark" className="pe-none">
						<thead>
							<tr>
								<th>#</th>
								<th>Image</th>
								<th>Name</th>
								<th>Price</th>
								<th>Quantity</th>
								<th></th>
								<th></th>
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
								<td>
									<Button variant="danger">Delete</Button>
								</td>
								<td>
									<Button variant="primary">Add</Button>
								</td>
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
								<td>
									<Button variant="danger">-</Button>
								</td>
								<td>
									<Button variant="primary">+</Button>
								</td>
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
								<td>
									<Button variant="danger">-</Button>
								</td>
								<td>
									<Button variant="primary">+</Button>
								</td>
							</tr>
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-between">
					<Button variant="secondary" onClick={onToggle}>
						Close
					</Button>
					<div>
						<Badge bg="danger" pill className="me-3">
							99+
						</Badge>
						<Button variant="primary">BUY NOW</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ShoppingCart;
