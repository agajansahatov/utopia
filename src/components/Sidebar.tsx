import Nav from "react-bootstrap/Nav";
import { getBrand } from "../config/Configuration";
import { ReactNode, useState } from "react";

interface SidebarLink {
	id: number;
	label: ReactNode;
}

interface Props {
	elements: SidebarLink[];
	onClick: (id: number) => void;
}

const Sidebar = ({ elements, onClick }: Props) => {
	const [active, setActive] = useState(0);
	const { name: appName, copyrightDate } = getBrand();

	const handleClick = (id: number) => {
		onClick(id);
		setActive(id);
	};

	return (
		<aside className="sidebar bg-dark" style={{ minWidth: "250px" }}>
			<Nav className="flex-column list-group rounded-0 mt-3">
				{elements.map((element) => (
					<Nav.Link
						className="list-group-item list-group-item-action border-0 sidebar__link"
						active={active === element.id}
						onClick={() => handleClick(element.id)}
						key={element.id}>
						{element.label}
					</Nav.Link>
				))}
			</Nav>
			<footer className="d-block text-center footer__brand">
				{appName} &copy; {copyrightDate} <br /> All Rights Reserved
			</footer>
		</aside>
	);
};

export default Sidebar;
