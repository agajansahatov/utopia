import { Link } from "react-router-dom";
import { getProductVideoURL } from "../config/Configuration";

const ProductInfo = () => {
	return (
		<>
			<span className="d-flex align-items-center justify-content-center pt-3">
				<Link
					to="/"
					className="btn btn-primary"
					style={{ position: "absolute", left: "15px" }}>
					Go Back
				</Link>
				<h3>ProductInfo</h3>
			</span>
			<div className="d-flex justify-content-center mt-2">
				<video
					src={getProductVideoURL("Introducing iPhone 15 Pro - Apple.mp4")}
					width="65%"
					controls={true}
					autoPlay={true}>
					Your browser does not support the video tag.
				</video>
			</div>
		</>
	);
};

export default ProductInfo;
