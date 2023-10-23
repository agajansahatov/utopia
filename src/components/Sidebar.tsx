import Nav from "react-bootstrap/Nav";
import { getBrand } from "../config/Configuration";
import { Link } from "react-router-dom";
import { AppLink } from "../interfaces/AppLink";

interface Props {
	active?: number;
	elements: AppLink[];
	root?: string;
}

const Sidebar = ({ active = 0, elements, root = "/" }: Props) => {
	const { name: appName, copyrightDate } = getBrand();
	return (
		<aside className="sidebar bg-dark" style={{ minWidth: "250px" }}>
			<Nav className="flex-column list-group rounded-0 mt-3">
				{elements.map((element) => (
					<Link
						className={`list-group-item list-group-item-action border-0 sidebar__link ${
							element.id == active ? "active" : ""
						}`}
						key={element.id}
						to={root + element.link}>
						{element.label}
					</Link>
				))}
			</Nav>
			<footer className="d-block text-center footer__brand">
				{appName} &copy; {copyrightDate} <br /> All Rights Reserved
			</footer>
		</aside>
	);
};

export default Sidebar;
