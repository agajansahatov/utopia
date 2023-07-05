import { ReactNode, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo.svg";
import Nav from "react-bootstrap/Nav";

interface NavbarLink {
	id: number;
	node: ReactNode;
}

interface Props {
	links: NavbarLink[];
	selected: number;
}

const NavbarTop = ({ links, selected }: Props) => {
	const [active, setActive] = useState(selected);

	return (
		<Navbar
			className="bg-body-tertiary px-2 px-md-4"
			bg="dark"
			data-bs-theme="dark"
			fixed="top"
			expand="md">
			<Navbar.Brand href="#home">
				<img
					className="d-inline-block align-middle"
					src={logo}
					height="40"
					alt=""
				/>
				<span className="align-middle ms-2">Utopia</span>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ms-auto fs-5">
					{links.map((link) => (
						<Nav.Link
							href="#"
							className="mx-2"
							key={link.id.toString()}
							active={link.id === active}
							onClick={() => setActive(link.id)}>
							{link.node}
						</Nav.Link>
					))}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarTop;
