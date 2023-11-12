import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/esm/Button";
import Navbar from "react-bootstrap/esm/Navbar";
import { BsArrowLeft } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { getBrand } from "../config/Configuration";
import { AppLink } from "../interfaces/AppLink";
import Nav from "react-bootstrap/esm/Nav";

interface Props {
	isVisible: boolean;
	onHide: () => void;
	active?: number;
	elements: AppLink[];
	root?: string;
}

const Sidebar = ({
	isVisible,
	onHide,
	active = 0,
	elements,
	root = "/",
}: Props) => {
	const { logo, name: appName, copyrightDate } = getBrand();

	return (
		<aside className="sidebar position-fixed top-0 left-0">
			<Offcanvas
				show={isVisible}
				onHide={onHide}
				responsive="lg"
				scroll={true}
				className="bg-dark text-white vh-100 overflow-hidden sticky-lg-top"
			>
				<Offcanvas.Body className="p-0 m-0 d-block">
					<Navbar
						className="px-3 px-lg-4 bg-gradient justify-content-between"
						bg="black"
						data-bs-theme="dark"
						variant="dark"
						expand={false}
						sticky="top"
					>
						<Navbar.Brand as={NavLink} to="/">
							<img
								className="d-inline-block align-middle logo"
								src={logo}
								height="35"
								alt=""
							/>
							<span className="align-middle ms-2">{appName}</span>
						</Navbar.Brand>
						<Button
							type="button"
							variant="outline-dark"
							className="text-white pb-2 border-0 d-lg-none"
							onClick={onHide}
						>
							<BsArrowLeft />
						</Button>
					</Navbar>
					<div className="sidebar__body">
						<Nav className="flex-column list-group rounded-0 m-3 mt-3 pb-5 mb-4">
							{elements &&
								elements.map((element) => (
									<Link
										className={`list-group-item list-group-item-action border-0 rounded-4 p-3 ps-4 mb-1 ${
											element.id == active ? "active" : ""
										}`}
										key={element.id}
										to={root + element.link}
									>
										{element.label}
									</Link>
								))}
						</Nav>
						<footer className="bg-dark position-absolute w-100 text-center bottom-0 pb-5 mb-4">
							{appName} &copy; {copyrightDate} <br /> All Rights Reserved
						</footer>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</aside>
	);
};

export default Sidebar;
