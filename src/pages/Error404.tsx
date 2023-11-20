import {
	Link,
	isRouteErrorResponse,
	useLocation,
	useRouteError,
} from "react-router-dom";

interface Props {
	message?: string;
	type?: number;
}

const Error404 = ({ message, type }: Props) => {
	const error = useRouteError() as Error;

	const location = useLocation();
	const locationError = location.state?.error as Error;

	let errorMessage: string;
	if (message) {
		errorMessage = message;
	} else if (locationError) {
		errorMessage = locationError.message;
	} else {
		errorMessage = error.message;
	}

	console.error(errorMessage);

	const error404 = (
		<div>
			<h1 className="display-1 fw-bold">404</h1>
			<p className="fs-3">
				<span className="text-danger">Opps!</span> Page not found.
			</p>
			<p className="lead">
				{errorMessage
					? errorMessage
					: "The page you’re looking for doesn’t exist."}
			</p>
		</div>
	);

	const otherError = (
		<div>
			<h1 className="display-1 fw-bold">Unexpected Error!</h1>
			<p className="fs-3">
				<span className="text-danger">Opps!</span>
			</p>
			<p className="lead">{errorMessage}</p>
		</div>
	);
	return (
		<div className="position-fixed vh-100 w-100 d-flex align-items-center justify-content-center error-page bg-body-tertiary">
			<div className="text-center">
				{isRouteErrorResponse(error) || type === 404 ? error404 : otherError}
				<Link to="/" className="btn btn-primary">
					Go Home
				</Link>
			</div>
		</div>
	);
};

export default Error404;
