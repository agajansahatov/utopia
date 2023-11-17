import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import useAuth from "../hooks/useAuth";
import { User } from "../interfaces/User";
import axios from "axios";
import { getBaseURL } from "../config/Configuration";

const isPhoneNumber = (val: string) => {
	return /^\d|\+/.test(val);
};

const schema = z.object({
	name: z.string().nullable(),
	contactInfo: z
		.string()
		.min(8)
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
		)
		.nullable(),
	address: z.string().min(1).nullable(),
	password1: z.string().min(6).nullable(),
	password2: z.string().min(6).nullable(),
});

//Interface
type FormData = z.infer<typeof schema>;

const Profile = () => {
	const [serviceError, setServiceError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const user = useAuth();
	if (!user) {
		return;
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
		user.name = data.name;
		user.address = data.address;
		user.contact = data.contactInfo;
		user.password = data.password1;

		setIsLoading(true);
		axios
			.put(getBaseURL() + "users", user)
			.then((res) => {
				const data: User = res.data;
				if (data.contact) {
					localStorage.removeItem("user");
					localStorage.setItem("user", JSON.stringify(res.data));
					setIsLoading(false);
					window.location.pathname = "/account/profile";
				}
			})
			.catch((e) => {
				setServiceError(e.message);
				setIsLoading(false);
			});
	};

	return (
		<>
			<section className="form__container text-light mt-5 mb-5 pb-5">
				<div className="form rounded bg-dark m-0 p-4 p-md-5">
					<h3 className="text-center mb-3 fs-4">EDIT YOUR PROFILE</h3>
					{serviceError && (
						<p className="text-danger mb-0 text-center">{serviceError}</p>
					)}
					<Form
						onSubmit={handleSubmit((data) => {
							onSubmit(data);
							reset();
						})}
					>
						<Form.Group className="mb-3" controlId="nameField">
							<Form.Label>Name</Form.Label>
							<Form.Control
								{...register("name")}
								placeholder="Enter your name"
								defaultValue={user.name !== null ? user.name : ""}
							/>
							{errors.name && (
								<p className="text-danger">{errors.name.message}</p>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="contactInfoField">
							<Form.Label>Email or Phone</Form.Label>
							<Form.Control
								{...register("contactInfo")}
								placeholder="Enter your contact information"
								defaultValue={user.contact !== null ? user.contact : ""}
							/>
							{errors.contactInfo && (
								<p className="text-danger">{errors.contactInfo.message}</p>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="addressField">
							<Form.Label>Shipping Address</Form.Label>
							<Form.Control
								{...register("address")}
								placeholder="Enter your shipping address"
								defaultValue={user.address !== null ? user.address : ""}
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
								defaultValue={user.password !== null ? user.password : ""}
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
								defaultValue={user.password !== null ? user.password : ""}
							/>
							{errors.password2 && (
								<p className="text-danger">{errors.password2.message}</p>
							)}
						</Form.Group>

						<div className="d-flex justify-content-end">
							{isLoading ? (
								<Button variant="primary" disabled>
									<Spinner
										as="span"
										animation="grow"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									Updating...
								</Button>
							) : (
								<Button variant="primary" type="submit" className="text-nowrap">
									SAVE
								</Button>
							)}
						</div>
					</Form>
				</div>
			</section>
		</>
	);
};

export default Profile;
