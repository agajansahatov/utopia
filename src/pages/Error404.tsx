import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error404 = () => {
	const error = useRouteError() as Error;
	console.log(error);
	const error404 = (
		<div>
			<h1 className="display-1 fw-bold">404</h1>
			<p className="fs-3">
				<span className="text-danger">Opps!</span> Page not found.
			</p>
			<p className="lead">The page you’re looking for doesn’t exist.</p>
		</div>
	);

	const otherError = (
		<div>
			<h1 className="display-1 fw-bold">Unexpected Error!</h1>
			<p className="fs-3">
				<span className="text-danger">Opps!</span>
			</p>
			<p className="lead">{error.message}</p>
		</div>
	);
	return (
		<div
			className="d-flex align-items-center justify-content-center vh-100"
			style={{ marginTop: "-42px" }}>
			<div className="text-center">
				{isRouteErrorResponse(error) ? error404 : otherError}
				<Link to="/" className="btn btn-primary">
					Go Home
				</Link>
			</div>
		</div>
	);
};

export default Error404;
