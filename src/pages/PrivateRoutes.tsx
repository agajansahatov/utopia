import App from "../App";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
	const { user } = useAuth();
	if (!user) return <Navigate to="/login" />;
	return <App />;
};

export default PrivateRoutes;
