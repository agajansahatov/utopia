import Button from "react-bootstrap/Button";
import NewProductForm from "../components/NewProductForm";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
export interface User {
	id: number;
	name: string;
	contact: string;
	image: string;
	password: string;
	address: string;
}

const sidebarLinks = [
	{
		id: 0,
		label: "Profile",
	},
	{
		id: 1,
		label: "Admin",
	},
	{
		id: 2,
		label: "Settings",
	},
	{
		id: 3,
		label: "Fruits",
	},
	{
		id: 4,
		label: "Cars",
	},
];

const Account = () => {
	const [modalShow, setModalShow] = useState(false);

	const onLogout = () => {
		localStorage.removeItem("user");

		window.location.pathname = "/login";
	};
	const onContentChange = () => {};

	return (
		<>
			<Sidebar elements={sidebarLinks} onClick={onContentChange} />
			<main className="content">
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
			</main>
		</>
	);
};

export default Account;
