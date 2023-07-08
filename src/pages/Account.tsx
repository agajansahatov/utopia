import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import NewProductForm from "../components/NewProductForm";
import { useState } from "react";
export interface User {
	id: number;
	name: string;
	contact: string;
	image: string;
	password: string;
	address: string;
}

const Account = () => {
	const [modalShow, setModalShow] = useState(false);

	const onLogout = () => {
		localStorage.removeItem("user");

		window.location.pathname = "/login";
	};

	return (
		<Container className="text-center py-5">
			<h1>Account</h1>
			<Button
				variant="danger"
				size="lg"
				className="my-3 mx-5"
				onClick={onLogout}>
				Logout
			</Button>
			<br />
			<div>
				<Button variant="primary" onClick={() => setModalShow(true)}>
					Add Product
				</Button>
				<NewProductForm
					show={modalShow}
					onHide={() => {
						setModalShow(false);
						return modalShow;
					}}
				/>
			</div>
		</Container>
	);
};

export default Account;
