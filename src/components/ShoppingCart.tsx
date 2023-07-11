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
import { PurchasedProduct } from "./../interfaces/PurchasedProduct";
import axios, { AxiosError } from "axios";
import { useState } from "react";

interface Props {
	products: Product[];
	visible: boolean;
	onToggle: () => void;
	onClear: () => void;
}

const ShoppingCart = ({ visible, onToggle, products, onClear }: Props) => {
	const [toasterSuccess, setToasterSuccess] = useState(false);
	const [toasterFailure, setToasterFailure] = useState(false);
	const [serviceError, setServiceError] = useState("");

	const user: User | null = useAuth();
	if (!user) return;
	const purchasedProducts = getPurchasedProducts(products, user);

	const onPurchase = () => {
		purchasedProducts.forEach((product) => {
			product.status = "paid";
		});

		axios
			.post(
				"http://192.168.31.8:8080/products/purchased/new",
				purchasedProducts
			)
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
			<ShoppingBasket onClick={onToggle} numberOfProducts={products.length} />
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
					{purchasedProducts.length == 0 ? (
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
								{purchasedProducts.map((p) => (
									<tr className="pe-auto" key={p.id}>
										<td>1</td>
										<td>
											<img src={p.image} style={{ maxWidth: "175px" }} />
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
								{products.length}
							</Badge>
						</h4>
						<Button
							variant="primary"
							onClick={onPurchase}
							disabled={purchasedProducts.length == 0}>
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

const getPurchasedProducts = (products: Product[], user: User) => {
	const pps: PurchasedProduct[] = [];

	for (let i = 0; i < products.length; ++i) {
		const product: Product = products[i];

		if (pps[product.id] !== null && pps[product.id] !== undefined) {
			pps[product.id].quantity += 1;
		} else {
			pps[product.id] = {
				id: product.id,
				user: user.id,
				product: product.id,
				quantity: 1,
				destination: user.address,
				status: "Unpaid",
				date: getDate(),
				image: product.image,
				name: product.name,
				price: product.price,
			};
		}
	}
	const purchasedProducts: PurchasedProduct[] = [];
	for (let i = 0; i < pps.length; ++i) {
		if (pps[i] !== null && pps[i] !== undefined) {
			purchasedProducts.push({ ...pps[i] });
		}
	}

	return purchasedProducts;
};
