import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	return (
		<>
			<h1>Login Page</h1>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					navigate("/");
				}}>
				<Button variant="primary" type="submit">
					Login
				</Button>
			</form>
		</>
	);
};

export default Login;
