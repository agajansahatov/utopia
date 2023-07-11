import { TfiShoppingCartFull } from "react-icons/tfi";
import Button from "react-bootstrap/Button";
import { Badge } from "react-bootstrap";

interface Props {
	onClick: () => void;
	numberOfProducts: number;
}

const ShoppingBasket = ({ onClick, numberOfProducts }: Props) => {
	return (
		<div className="shopping-basket">
			<Button variant="dark" className="position-relative" onClick={onClick}>
				<h5>
					<Badge
						bg="danger"
						pill
						className="position-absolute translate-middle"
						style={{ top: "20px", left: "43px" }}>
						{numberOfProducts}
					</Badge>
				</h5>
				<TfiShoppingCartFull color="" size="75" />
			</Button>
		</div>
	);
};

export default ShoppingBasket;
