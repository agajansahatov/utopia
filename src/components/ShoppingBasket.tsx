import { TfiShoppingCartFull } from "react-icons/tfi";
import Button from "react-bootstrap/Button";
import { Badge } from "react-bootstrap";

interface Props {
	onClick: () => void;
}

const ShoppingBasket = ({ onClick }: Props) => {
	return (
		<div className="shopping-basket">
			<Button variant="dark" className="position-relative" onClick={onClick}>
				<TfiShoppingCartFull color="" size="75" />
				<Badge
					bg="danger"
					pill
					className="position-absolute translate-middle"
					style={{ top: "13px", left: "43px" }}>
					99+
				</Badge>
			</Button>
		</div>
	);
};

export default ShoppingBasket;
