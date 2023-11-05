import { ContextType } from "../App";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const PrivateRoutes = () => {
	const user = useAuth();
	if (!user) return <Navigate to="/login" />;

	const {
		products,
		favourites,
		onAddToCart,
		onLike,
		isSidebarVisible,
		onHideSidebar,
		onShowSidebar,
	} = useOutletContext<ContextType>();

	return (
		<Outlet
			context={
				{
					products,
					favourites,
					onAddToCart,
					onLike,
					isSidebarVisible,
					onHideSidebar,
					onShowSidebar,
				} satisfies ContextType
			}
		/>
	);
};

export default PrivateRoutes;
