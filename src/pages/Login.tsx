import Button from "react-bootstrap/Button";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import NavbarBottom from "./../components/NavbarBottom";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { getBaseURL } from "../config/Configuration";
import NavbarTop from "../components/NavbarTop";
import { getNavbarLinks } from "../config/NavbarLinks";

const isPhoneNumber = (val: string) => {
	return /^\d|\+/.test(val);
};

const schema = z.object({
	contactInfo: z
		.string()
		.min(8, { message: "Contact Info contains at least 8 characters!" })
		.refine(
			(value) => {
				if (isPhoneNumber(value)) {
					// Check if value matches phone number pattern
					return true;
				} else {
					const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
					return emailRegex.test(value);
				}
			},
			{ message: "Must be a valid email" },
		),
	password: z
		.string()
		.min(6, { message: "Password contains at least 6 characters!" }),
});

//Interface
type FormData = z.infer<typeof schema>;

const Login = () => {
	const [serviceError, setServiceError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const onSubmit = (data: FieldValues) => {
		setIsLoading(true);
		axios
			.post(`${getBaseURL()}/auth`, {
				contact: data.contactInfo,
				password: data.password,
			})
			.then((res) => {
				setIsLoading(false);
				const data = res.data;
				if (data.contact) {
					localStorage.setItem("user", JSON.stringify(res.data));
					window.location.pathname = "/";
				} else {
					localStorage.removeItem("user");
					setServiceError("Wrong Credentials!");
				}
			})
			.catch((e) => {
				setIsLoading(false);
				localStorage.removeItem("user");
				setServiceError(`Wrong Credentials!`);
			});
	};

	const user = useAuth();
	if (user) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<NavbarTop links={getNavbarLinks()} isFullWidth={true} />

			<main className="wrapper form__container text-light">
				<div className="bg-dark rounded form">
					<h2 className="text-center mb-3">LOGIN</h2>
					{serviceError && (
						<p className="text-danger mb-1 text-center">{serviceError}</p>
					)}
					<Form
						onSubmit={handleSubmit((data) => {
							onSubmit(data);
						})}
						className="mb-2"
					>
						<Form.Group className="mb-3" controlId="contactInfoField">
							<Form.Label>Email or Phone</Form.Label>
							<Form.Control
								{...register("contactInfo")}
								type="text"
								placeholder="Email or Phone"
							/>
							{errors.contactInfo && (
								<p className="text-danger">{errors.contactInfo.message}</p>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="passwordField">
							<Form.Label>Password</Form.Label>
							<Form.Control
								{...register("password")}
								type="password"
								placeholder="Password"
							/>
							{errors.password && (
								<p className="text-danger">{errors.password.message}</p>
							)}
						</Form.Group>
						<Row className="mb-2">
							<Col>
								<Form.Group
									className="mb-3 mx-auto"
									controlId="rememberMe"
									aria-checked
								>
									<Form.Check
										type="checkbox"
										label="Remember Me"
										className="mx-auto text-nowrap"
										defaultChecked={true}
										disabled={true}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Link to={""} className="disabled">
									Forgot password?
								</Link>
							</Col>
						</Row>
						{isLoading ? (
							<div className="d-grid gap-4 d-block">
								<Button variant="primary" disabled>
									<Spinner
										as="span"
										animation="grow"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									Logging in...
								</Button>
								<Button className="btn-outline-info btn-lg d-block" disabled>
									Create account
								</Button>
							</div>
						) : (
							<div className="d-grid gap-4 d-block">
								<Button variant="primary" type="submit" size="lg">
									Login
								</Button>
								<Link
									className="btn btn-outline-info btn-lg d-block"
									to="/register"
								>
									Create account
								</Link>
							</div>
						)}
					</Form>
				</div>
			</main>

			<NavbarBottom />
		</>
	);
};

export default Login;
