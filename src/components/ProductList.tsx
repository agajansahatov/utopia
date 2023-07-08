import Product, { IProduct } from "./Product";

interface Props {
	products: IProduct[];
}

const ProductList = ({ products }: Props) => {
	if (products.length == 0)
		return (
			<p className="text-danger">
				Couln't get the products list from the database
			</p>
		);
	return (
		<div className="products-list-field">
			{products.map((product) => (
				<Product product={product} key={product.id} />
			))}
		</div>
	);
};

export default ProductList;
