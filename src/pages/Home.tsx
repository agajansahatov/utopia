import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";
import { IProduct } from "../components/Product";
import axios from "axios";

const Home = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:8080/products")
			.then((res) => {
				setProducts(res.data);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	return (
		<>
			<Sidebar />;
			<main style={{ marginLeft: "250px" }}>
				<p className="text-danger">{error}</p>
				<ProductList products={products} />
			</main>
		</>
	);
};

export default Home;
