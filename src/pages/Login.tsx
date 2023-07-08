import Button from "react-bootstrap/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Col, Form, Row } from "react-bootstrap";
import NavbarBottom from "./../components/NavbarBottom";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

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
			{ message: "Must be a valid email" }
		),
	password: z
		.string()
		.min(6, { message: "Password contains at least 6 characters!" }),
});

//Interface
type FormData = z.infer<typeof schema>;

const Login = () => {
	const [serviceError, setServiceError] = useState("");

	const user = useAuth();
	if (user) {
		return <Navigate to="/" />;
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const onSubmit = (data: FieldValues) => {
		axios
			.post("http://localhost:8080/auth", {
				contact: data.contactInfo,
				password: data.password,
			})
			.then((res) => {
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
				localStorage.removeItem("user");
				if (e.response && e.response.status === 400) {
					setServiceError("Wrong Credentials!");
				} else {
					setServiceError(e.message);
				}
			});
	};

	return (
		<>
			<section className="text-light d-flex flex-column justify-content-center align-items-center login-form__container mb-5">
				<div className="login-form p-5 mx-2 mt-2 mb-3 rounded bg-dark">
					<h2 className="text-center mb-3">LOGIN</h2>
					{serviceError && (
						<p className="text-danger mb-1 text-center">{serviceError}</p>
					)}
					<Form
						onSubmit={handleSubmit((data) => {
							onSubmit(data);
							reset();
						})}
						className="mb-2">
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
						<Row>
							<Col>
								<Form.Group
									className="mb-3 mx-auto"
									controlId="rememberMe"
									aria-checked>
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
						<div className="d-grid gap-4 d-block">
							<Button variant="primary" type="submit" size="lg">
								Login
							</Button>
							<Link
								className="btn btn-outline-info btn-lg d-block"
								to="/register">
								Create account
							</Link>
						</div>
					</Form>
				</div>
			</section>
			<NavbarBottom />
		</>
	);
};

export default Login;
