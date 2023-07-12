import { User } from "../interfaces/User";
import useAuth from "../hooks/useAuth";

const Balance = () => {
	const user: User | null = useAuth();
	return (
		<div className="text-center text-white pt-5">
			<p className="fs-1">Your Balance is &nbsp;</p>
			<h1 className="text-shadow display-1">${user ? user.balance : 0}</h1>
		</div>
	);
};

export default Balance;
