import { ReactNode } from "react";
import { getBrand } from "../config/Configuration";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

interface NavbarLink {
	id: number;
	label: ReactNode;
	url: string;
}

interface Props {
	links: NavbarLink[];
}

const NavbarTop = ({ links }: Props) => {
	const { logo, name: appName } = getBrand();

	return (
		<Navbar
			className="bg-body-tertiary px-2 px-md-4"
			bg="dark"
			data-bs-theme="dark"
			fixed="top"
			expand="md">
			<Navbar.Brand as={NavLink} to="/">
				<img
					className="d-inline-block align-middle"
					src={logo}
					height="40"
					alt=""
				/>
				<span className="align-middle ms-2">{appName}</span>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ms-auto fs-5">
					{links.map((link) => (
						<Nav.Link
							as={NavLink}
							to={link.url}
							className="mx-2"
							key={link.id.toString()}>
							{link.label}
						</Nav.Link>
					))}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarTop;
