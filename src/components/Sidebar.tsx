import Nav from "react-bootstrap/Nav";
import { getBrand } from "../config/Configuration";
import { useState } from "react";

// const sidebarLinks = [
//     {
//         id: 0,
//         label: "Recommended",
//     },
//     {
//         id: 1,
//         label: "Clothes",
//     },
//     {
//         id: 2,
//         label: "Electronics",
//     },
//     {
//         id: 3,
//         label: "Last Seen",
//     },
//     {
//         id: 4,
//         label: "Last Seen",
//     },
// ];

const Sidebar = () => {
	const [active, setActive] = useState(0);
	const { name: appName, copyrightDate } = getBrand();

	return (
		<aside className="sidebar bg-dark">
			<Nav className="flex-column list-group rounded-0 mt-3">
				<Nav.Link
					className="list-group-item list-group-item-action border-0 sidebar__link"
					active={active === 0}
					onClick={() => setActive(0)}>
					All Products
				</Nav.Link>
				<Nav.Link
					className="list-group-item list-group-item-action border-0 sidebar__link"
					active={active === 1}
					onClick={() => setActive(1)}>
					Books
				</Nav.Link>
				<Nav.Link
					className="list-group-item list-group-item-action border-0 sidebar__link"
					active={active === 2}
					onClick={() => setActive(2)}>
					Coffee Mugs
				</Nav.Link>
				<Nav.Link
					className="list-group-item list-group-item-action border-0 sidebar__link"
					active={active === 3}
					onClick={() => setActive(3)}>
					Luggage Tags
				</Nav.Link>
				<Nav.Link
					className="list-group-item list-group-item-action border-0 sidebar__link"
					active={active === 4}
					onClick={() => setActive(4)}>
					Mouse Pads
				</Nav.Link>
			</Nav>
			<footer className="d-block text-center footer__brand">
				{appName} &copy; {copyrightDate} <br /> All Rights Reserved
			</footer>
		</aside>
	);
};

export default Sidebar;
