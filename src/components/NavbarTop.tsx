import { ReactNode } from "react";
import { getBrand } from "../config/Configuration";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { User } from "./../pages/Account";

interface NavbarLink {
	id: number;
	label: ReactNode;
	url: string;
	auth: number;
}

interface Props {
	links: NavbarLink[];
}

const NavbarTop = ({ links }: Props) => {
	const { logo, name: appName } = getBrand();

	const user: User = useAuth();

	if (user !== null && !user.name) user.name = "Anonymous User";

	const getRelatedLinks = (auth: boolean) => {
		if (auth) {
			return links.map(
				(link) =>
					link.url !== "/login" && (
						<Nav.Link
							as={NavLink}
							to={link.url}
							className="mx-2"
							key={link.id.toString()}>
							{link.label === "Account" ? user.name : link.label}
						</Nav.Link>
					)
			);
		}
		return links.map(
			(link) =>
				link.auth !== 1 && (
					<Nav.Link
						as={NavLink}
						to={link.url}
						className="mx-2"
						key={link.id.toString()}>
						{link.label}
					</Nav.Link>
				)
		);
	};
	return (
		<Navbar
			className="bg-dark px-2 px-md-4"
			bg="dark"
			data-bs-theme="dark"
			fixed="top"
			expand="md">
			<Navbar.Brand as={NavLink} to="/">
				<img
					className="d-inline-block align-middle logo"
					src={logo}
					height="40"
					alt=""
				/>
				<span className="align-middle ms-2">{appName}</span>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ms-auto fs-5">{getRelatedLinks(user != null)}</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarTop;
