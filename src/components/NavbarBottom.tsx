import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { getBrand } from "../config/Configuration";

const NavbarBottom = () => {
	const { logo, name: appName, copyrightDate } = getBrand();
	return (
		<Navbar
			className={"px-2 px-md-4 py-3 bg-gradient"}
			bg="black"
			data-bs-theme="dark"
			expand="md"
			variant="dark"
			fixed="bottom"
		>
			<Nav className="mx-auto fs-6 text-center">
				<span>
					{appName} &copy; {copyrightDate}
				</span>
				<span>All Rights Reserved</span>
			</Nav>
		</Navbar>
	);
};

export default NavbarBottom;
