import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { getBrand } from "../config/Configuration";

const NavbarBottom = () => {
	const { logo, name: appName, copyrightDate } = getBrand();
	return (
		<Navbar
			className="px-2 px-md-4 py-3 bg-gradient"
			bg="black"
			data-bs-theme="dark"
			fixed="bottom"
			expand="md"
			variant="dark"
		>
			<Nav className="mx-auto fs-6 text-center">
				{appName} &copy; {copyrightDate} &nbsp; All Rights Reserved
			</Nav>
		</Navbar>
	);
};

export default NavbarBottom;
