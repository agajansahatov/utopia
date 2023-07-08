import Button from "react-bootstrap/Button";

export interface IProduct {
	id: number;
	image: string;
	description: string;
	price: number;
	name: string;
}

interface Props {
	product: IProduct;
}

const Product = ({ product }: Props) => {
	return (
		<div className="card mb-4" style={{ width: "23rem" }}>
			<img src={product.image} className="card-img-top" alt="Product image" />
			<div className="card-body">
				<h5 className="card-title">{product.name}</h5>
				<p className="card-text">{product.description}</p>
				<div className="d-flex align-items-center justify-content-between">
					<p className="text-light mt-2">${product.price}</p>
					<Button variant="primary">Add to cart</Button>
				</div>
			</div>
		</div>
	);
};

export default Product;
