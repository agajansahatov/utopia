import App, { ContextProducts, ContextType } from "../App";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const PrivateRoutes = () => {
	const user = useAuth();
	if (!user) return <Navigate to="/login" />;

	const { products } = useOutletContext<ContextType>();
	return <Outlet context={{ products } satisfies ContextProducts} />;
};

export default PrivateRoutes;
