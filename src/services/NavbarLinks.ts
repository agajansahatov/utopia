let navbarLinks = [
	{
		id: 0,
		auth: 1,
		node: "Home",
	},
	{
		id: 1,
		auth: 1,
		node: "History",
	},
	{
		id: 2,
		auth: 1,
		node: "Balance",
	},
	{
		id: 3,
		auth: 1,
		node: "Account",
	},
	{
		id: 4,
		auth: 0,
		node: "Settings",
	},
];

export function getNavbarLinks() {
	return navbarLinks;
}
