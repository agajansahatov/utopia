import useAuth from "../hooks/useAuth";
import { User } from "../interfaces/User";
import ShoppingBasket from "./ShoppingBasket";
import { Badge, Button, Modal, Toast, ToastContainer } from "react-bootstrap";
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
	let totalPrice = 0;
	orders.forEach((order) => {
		numberOfOrders += order.quantity;
		totalPrice += order.quantity * parseInt(order.price);
	});

	const onPurchase = () => {
		if (!user.balance) {
			setServiceError("No User Info");
			return;
		}

		orders.forEach((p) => {
			p.status = "Paid";
		});

		if (totalPrice > parseInt(user.balance)) {
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
				} else {
					if (user.balance) {
						let balance = parseInt(user.balance) - totalPrice;
						user.balance = balance.toString();
						localStorage.removeItem("user");
						localStorage.setItem("user", JSON.stringify(user));
					}
					onToggle();
					setToasterSuccess(!toasterSuccess);
					onClear();
				}
			})
			.catch((e: AxiosError) => {
				setServiceError(e.message);
				setToasterFailure(!toasterFailure);
			});
	};

	const ordersReversed = orders.slice().reverse();

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
				<Modal.Body className="p-0">
					{ordersReversed.length == 0 ? (
						<p className="text-white">Your UTOPIA Cart is empty!</p>
					) : (
						<div className="orders p-1 p-sm-2 pb-5 mb-5">
							<h1 className="py-1 text-white text-center pb-2">Your Orders</h1>
							{ordersReversed.map((o, i) => (
								<div
									className="order row bg-black m-0 p-2 py-3 mb-3 rounded"
									key={i}
								>
									<div className="col-4">
										<img
											src={getProductImageURL(o.image)}
											alt="Product image"
											className="order__image object-fit-contain"
										/>
									</div>
									<div className="col-8 d-flex flex-column justify-content-between">
										<div className="d-flex justify-content-between">
											<p className="lh-1 m-0 text-wrap">{o.name}</p>
											<p className="d-none d-sm-block text-nowrap">{o.date}</p>
										</div>
										<div className="d-flex flex-column flex-column-reverse flex-sm-row justify-content-between mt-2 mt-sm-0">
											<div className="d-flex flex-row flex-sm-column justify-content-between mt-2 mt-sm-0">
												<p className="mb-0 text-nowrap">${o.price}</p>
												<span className="d-flex justify-content-center align-items-center ms-1 ms-sm-0 mt-sm-2">
													<Button
														className="py-0 px-2 btn-sm"
														variant="dark"
														onClick={() => onDelete(i)}
													>
														-
													</Button>
													<span className="text-nowrap fw-bold mx-1 mx-sm-2">
														x{o.quantity}
													</span>
													<Button
														className="py-0 px-2 btn-sm"
														variant="dark"
														onClick={() => onAdd(i)}
													>
														+
													</Button>
												</span>
											</div>
											<div className="d-flex flex-sm-column justify-content-between justify-content-sm-end align-items-end">
												<span className="d-sm-none text-nowrap me-1">
													{o.date}
												</span>
												<span className="badge rounded-pill text-bg-warning text-nowrap fw-bold">
													{o.status}
												</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</Modal.Body>
				<Modal.Footer className="d-flex align-items-center justify-content-between px-0 px-sm-2">
					<h5>
						<Badge bg="danger" pill>
							{numberOfOrders} items
						</Badge>
					</h5>

					<div>
						<p className="total-price d-inline me-2 text-white fw-bold">
							${totalPrice}
						</p>
						<Button
							className="btn-sm"
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
