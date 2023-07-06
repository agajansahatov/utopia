import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import History from "./History";
import Balance from "./Balance";
import Account from "./Account";
import Settings from "./Settings";
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
			{ path: "settings", element: <Settings /> },
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },
		],
	},
	{
		element: <PrivateRoutes />,
		children: [
			{ path: "history", element: <History /> },
			{ path: "balance", element: <Balance /> },
			{ path: "account", element: <Account /> },
		],
	},
]);

export default router;
