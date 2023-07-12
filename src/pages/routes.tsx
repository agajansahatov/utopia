import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import History from "./History";
import Balance from "../sections/Balance";
import Account from "./Account";
import Login from "./Login";
import App from "../App";
import Error404 from "./Error404";
import PrivateRoutes from "./PrivateRoutes";
import Register from "./Register";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error404 />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },
			{
				element: <PrivateRoutes />,
				children: [
					{ path: "/history", element: <History /> },
					{ path: "/balance", element: <Balance /> },
					{ path: "/account", element: <Account /> },
					{ path: "/products/add", element: <Account /> },
				],
			},
		],
	},
]);

export default router;
