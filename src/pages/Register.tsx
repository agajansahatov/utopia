import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import NavbarBottom from "../components/NavbarBottom";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { User } from "../interfaces/User";
import { getBaseURL } from "../config/Configuration";

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
	address: z.string().min(1, { message: "Shipping Address is required" }),
	password1: z
		.string()
		.min(6, { message: "Password contains at least 6 characters!" }),
	password2: z
		.string()
		.min(6, { message: "Password contains at least 6 characters!" }),
});

//Interface
type FormData = z.infer<typeof schema>;

const Register = () => {
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
		if (data.password1 !== data.password2) {
			setServiceError("Passwords doesn't match!");
			return;
		}

		axios
			.post(getBaseURL() + "users", {
				contact: data.contactInfo,
				password: data.password1,
				address: data.address,
			})
			.then((res) => {
				const data: User = res.data;
				if (data.contact) {
					localStorage.setItem("user", JSON.stringify(res.data));
					window.location.pathname = "/";
				} else {
					localStorage.removeItem("user");
					setServiceError("User already exists!");
				}
			})
			.catch((e) => {
				localStorage.removeItem("user");
				setServiceError(e.message);
			});
	};

	return (
		<>
			<section className="text-light d-flex flex-column justify-content-center align-items-center login-form__container mb-5">
				<div className="login-form p-5 mx-2 mt-2 mb-3 rounded bg-dark">
					<h3 className="text-center mb-3 fs-4">CREATE AN ACCOUNT</h3>
					{serviceError && (
						<p className="text-danger mb-0 text-center">{serviceError}</p>
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
								placeholder="Enter your email or phone"
							/>
							{errors.contactInfo ? (
								<p className="text-danger">{errors.contactInfo.message}</p>
							) : (
								<Form.Text className="text-muted">
									We'll never share your Info with anyone else.
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="addressField">
							<Form.Label>Shipping Address</Form.Label>
							<Form.Control
								{...register("address")}
								placeholder="Enter your address"
							/>
							{errors.address && (
								<p className="text-danger">{errors.address.message}</p>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="passwordField1">
							<Form.Label>Password</Form.Label>
							<Form.Control
								{...register("password1")}
								type="password"
								placeholder="Enter a password"
							/>
							{errors.password1 && (
								<p className="text-danger">{errors.password1.message}</p>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="passwordField2">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								{...register("password2")}
								type="password"
								placeholder="Re-enter your password"
							/>
							{errors.password2 && (
								<p className="text-danger">{errors.password2.message}</p>
							)}
						</Form.Group>

						<Button variant="primary" type="submit" className="text-nowrap">
							Create account
						</Button>
					</Form>
				</div>
			</section>
			<NavbarBottom />
		</>
	);
};

export default Register;
