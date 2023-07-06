import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { getBrand } from "../config/Configuration";

const NavbarBottom = () => {
	const { logo, name: appName, copyrightDate } = getBrand();
	return (
		<Navbar
			className="bg-dark px-2 px-md-4 py-3"
			bg="dark"
			data-bs-theme="dark"
			fixed="bottom"
			expand="md">
			<Nav className="mx-auto fs-6 text-center">
				{appName} &copy; {copyrightDate} &nbsp; All Rights Reserved
			</Nav>
		</Navbar>
	);
};

export default NavbarBottom;
