import { ContextType } from "../App";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const PrivateRoutes = () => {
	const user = useAuth();
	if (!user) return <Navigate to="/login" />;

	const context = useOutletContext<ContextType>();

	return <Outlet context={context} />;
};

export default PrivateRoutes;
