import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import History from "./History";
import Balance from "./Balance";
import Account from "./Account";
import Settings from "./Settings";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/history", element: <History /> },
	{ path: "/balance", element: <Balance /> },
	{ path: "/account", element: <Account /> },
	{ path: "/settings", element: <Settings /> },
]);

export default router;
