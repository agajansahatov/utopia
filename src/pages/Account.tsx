import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Profile from "../sections/Profile";
import Admin from "../sections/Admin";
import useAuth from "../hooks/useAuth";
export interface User {
	id: number;
	name: string;
	contact: string;
	image: string;
	password: string;
	address: string;
}

let sidebarLinks = [
	{
		id: 0,
		label: "Profile",
	},

	{
		id: 1,
		label: "Balance",
	},
	{
		id: 2,
		label: "Logout",
	},
];

const Account = () => {
	const [content, setContent] = useState(0);

	const user: User = useAuth();
	if (user.id === 1) {
		sidebarLinks = [
			{
				id: 0,
				label: "Admin",
			},
			{
				id: 1,
				label: "Profile",
			},

			{
				id: 2,
				label: "Balance",
			},
			{
				id: 3,
				label: "Logout",
			},
		];
	}

	const onContentChange = (id: number) => {
		if (id === 3) {
			//Logout
			localStorage.removeItem("user");
			window.location.pathname = "/login";
		} else {
			setContent(id);
		}
	};

	return (
		<>
			<Sidebar elements={sidebarLinks} onClick={onContentChange} />
			<main className="content">
				{content == 0 && <Admin />}
				{content == 1 && <Profile />}
			</main>
		</>
	);
};

export default Account;
