import useAuth from "../hooks/useAuth";
import { User } from "../interfaces/User";
import ShoppingBasket from "./ShoppingBasket";
import {
	Badge,
	Button,
	Modal,
	Table,
	Toast,
	ToastContainer,
} from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { getBaseURL, getProductImageURL } from "../config/Configuration";
import { Order } from "../interfaces/Order";

interface Props {
	orders: Order[];
	visible: boolean;
	onToggle: () => void;
	onClear: () => void;
	onAdd: (orderIndex: number) => void;
	onDelete: (orderIndex: number) => void;
}

const ShoppingCart = ({
	orders,
	visible,
	onToggle,
	onClear,
	onAdd,
	onDelete,
}: Props) => {
	const [toasterSuccess, setToasterSuccess] = useState(false);
	const [toasterFailure, setToasterFailure] = useState(false);
	const [serviceError, setServiceError] = useState("");
	const user: User | null = useAuth();

	if (!user) return;

	let numberOfOrders = 0;
	orders.forEach((order) => {
		numberOfOrders += order.quantity;
	});

	const onPurchase = () => {
		if (!user.balance) {
			setServiceError("No User Info");
			return;
		}

		let sum: number = 0;
		orders.forEach((p) => {
			p.status = "Paid";
			sum += parseInt(p.price);
		});

		if (sum > parseInt(user.balance)) {
			setServiceError("Your Balance is not enough!!!");
			setToasterFailure(!toasterFailure);
			return;
		}

		axios
			.post(getBaseURL() + "products/purchased/new", orders)
			.then((res) => {
				if (res.data == false) {
					setServiceError("Bad Request!");
					setToasterFailure(!toasterFailure);
				}
				onToggle();
				setToasterSuccess(!toasterSuccess);
				onClear();
			})
			.catch((e: AxiosError) => {
				setServiceError(e.message);
				setToasterFailure(!toasterFailure);
			});
	};

	return (
		<>
			<ShoppingBasket onClick={onToggle} numberOfProducts={numberOfOrders} />
			<Modal
				show={visible}
				onHide={onToggle}
				backdrop="static"
				keyboard={false}
				fullscreen={true}
			>
				<Modal.Header closeButton>
					<Modal.Title className="pe-none">Shopping Cart</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{orders.length == 0 ? (
						<p className="text-white">Your UTOPIA Cart is empty!</p>
					) : (
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
								{orders.map((p, i) => (
									<tr className="pe-auto" key={i}>
										<td>{i + 1}</td>
										<td>
											<img
												src={getProductImageURL(p.image)}
												style={{ maxWidth: "175px", maxHeight: "150px" }}
												className="object-fit-contain"
											/>
										</td>
										<td>{p.name}</td>
										<td>${p.price}</td>
										<td>{p.quantity}</td>
										<td>
											<Button variant="danger" onClick={() => onDelete(i)}>
												Delete
											</Button>
										</td>
										<td>
											<Button variant="primary" onClick={() => onAdd(i)}>
												Add
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Modal.Body>
				<Modal.Footer className="d-flex align-items-center justify-content-between">
					<Button variant="secondary" onClick={onToggle}>
						Close
					</Button>
					<div>
						<h4 className="d-inline me-3">
							<Badge bg="danger" pill>
								{numberOfOrders}
							</Badge>
						</h4>
						<Button
							variant="primary"
							onClick={onPurchase}
							disabled={orders.length == 0}
						>
							BUY NOW
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			<ToastContainer
				className="p-3 z-1 position-fixed "
				position="middle-center"
				style={{ width: "240px" }}
			>
				<Toast
					delay={3000}
					autohide
					className="bg-success text-white z-1 toast"
					onClose={() => setToasterSuccess(!toasterSuccess)}
					show={toasterSuccess}
					style={{ boxShadow: "0 0 10px 10px #fff" }}
				>
					<Toast.Header>
						<strong className="me-auto">Success</strong>
						<small>Just now</small>
					</Toast.Header>
					<Toast.Body>Purchase is successfull!</Toast.Body>
				</Toast>
			</ToastContainer>

			<ToastContainer
				className="p-3 z-5 position-fixed "
				position="middle-center"
				style={{ width: "240px" }}
			>
				<Toast
					delay={3000}
					autohide
					className="bg-danger text-white z-1 toast"
					onClose={() => setToasterFailure(!toasterFailure)}
					show={toasterFailure}
					style={{ boxShadow: "0 0 10px 10px #fff" }}
				>
					<Toast.Header>
						<strong className="me-auto">Failure</strong>
						<small>Just now</small>
					</Toast.Header>
					<Toast.Body>{serviceError}</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default ShoppingCart;
