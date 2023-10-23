import useAuth from "../hooks/useAuth";
import { Product } from "../interfaces/Product";
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
import { Order } from "./../interfaces/PurchasedProduct";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { getBaseURL, getProductImageURL } from "../config/Configuration";

interface Props {
	orderedProducts: Product[];
	visible: boolean;
	onToggle: () => void;
	onClear: () => void;
}

const ShoppingCart = ({
	visible,
	onToggle,
	orderedProducts,
	onClear,
}: Props) => {
	const [toasterSuccess, setToasterSuccess] = useState(false);
	const [toasterFailure, setToasterFailure] = useState(false);
	const [serviceError, setServiceError] = useState("");

	const user: User | null = useAuth();
	if (!user) return;
	const orders = getOrders(orderedProducts, user);

	const onPurchase = () => {
		orders.forEach((p) => {
			p.status = "paid";
		});

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
				axios
					.post(getBaseURL() + "auth", user)
					.then((res) => {
						const data = res.data;
						if (data.contact) {
							localStorage.setItem("user", JSON.stringify(res.data));
						} else {
							localStorage.removeItem("user");
							window.location.pathname = "/login";
						}
					})
					.catch(() => {
						localStorage.removeItem("user");
						window.location.pathname = "/login";
					});
			})
			.catch((e: AxiosError) => {
				setServiceError(e.message);
				setToasterFailure(!toasterFailure);
			});
	};

	return (
		<>
			<ShoppingBasket
				onClick={onToggle}
				numberOfProducts={orderedProducts.length}
			/>
			<Modal
				show={visible}
				onHide={onToggle}
				backdrop="static"
				keyboard={false}
				fullscreen={true}>
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
									<tr className="pe-auto" key={p.id}>
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
											<Button variant="danger">Delete</Button>
										</td>
										<td>
											<Button variant="primary">Add</Button>
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
								{orderedProducts.length}
							</Badge>
						</h4>
						<Button
							variant="primary"
							onClick={onPurchase}
							disabled={orders.length == 0}>
							BUY NOW
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			<ToastContainer
				className="p-3 z-1 position-fixed "
				position="middle-center"
				style={{ width: "240px" }}>
				<Toast
					delay={3000}
					autohide
					className="bg-success text-white z-1 toast"
					onClose={() => setToasterSuccess(!toasterSuccess)}
					show={toasterSuccess}
					style={{ boxShadow: "0 0 10px 10px #fff" }}>
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
				style={{ width: "240px" }}>
				<Toast
					delay={3000}
					autohide
					className="bg-danger text-white z-1 toast"
					onClose={() => setToasterFailure(!toasterFailure)}
					show={toasterFailure}
					style={{ boxShadow: "0 0 10px 10px #fff" }}>
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

const getDate = (): string => {
	const today: Date = new Date();
	const year: number = today.getFullYear();
	const month: number = today.getMonth() + 1; // Months are zero-based, so we add 1
	const day: number = today.getDate();

	return `${day}.${month}.${year}`;
};

// const getOrders = (orderedProducts: Product[], user: User) => {
// 	const orders: Order[] = [];

// 	for (let i = 0; i < orderedProducts.length; ++i) {
// 		const p: Product = orderedProducts[i];

// 		if (orders[p.id] !== null && orders[p.id] !== undefined) {
// 			orders[p.id].quantity += 1;
// 		} else {
// 			if (user && user.id && user.address) {
// 				orders[p.id] = {
// 					id: p.id,
// 					user: user.id,
// 					p: p.id,
// 					quantity: 1,
// 					destination: user.address,
// 					status: "Unpaid",
// 					date: getDate(),
// 					image: p.image,
// 					name: p.name,
// 					price: p.price,
// 				};
// 			}
// 		}
// 	}
// 	const orders: Order[] = [];
// 	for (let i = 0; i < orders.length; ++i) {
// 		if (orders[i] !== null && orders[i] !== undefined) {
// 			orders.push({ ...orders[i] });
// 		}
// 	}

// 	return orders;
// };

const getOrders = (orderedProducts: Product[], user: User) => {
	const orders: Order[] = [];

	for (let i = 0; i < orderedProducts.length; ++i) {
		const p: Product = orderedProducts[i];

		//There may be many of one p, so need to check
		if (orders[p.id] !== null && orders[p.id] !== undefined) {
			orders[p.id].quantity += 1;
		} else {
			if (user && user.id && user.address) {
				orders[p.id] = {
					id: p.id,
					user: user.id,
					product: p.id,
					quantity: 1,
					destination: user.address,
					status: "Unpaid",
					date: getDate(),
					image: p.image,
					name: p.name,
					price: p.price,
				};
			}
		}
	}
	return orders;
};
