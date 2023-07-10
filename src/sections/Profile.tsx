import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const isPhoneNumber = (val: string) => {
	return /^\d|\+/.test(val);
};

const schema = z.object({
	name: z.string().min(3),
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
			{ message: "Must be a valid email" }
		),
	image: z.any(),
	address: z.string().min(1),
	password1: z.string().min(6),
	password2: z.string().min(6),
});

//Interface
type FormData = z.infer<typeof schema>;

const Profile = () => {
	const [serviceError, setServiceError] = useState("");

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
		console.log(data.image);
	};

	return (
		<>
			<section className="text-light d-flex flex-column justify-content-center align-items-center login-form__container mb-5">
				<div className="login-form p-5 mx-2 mt-2 mb-3 rounded bg-dark">
					<h3 className="text-center mb-3 fs-4">EDIT YOUR PROFILE</h3>
					{serviceError && (
						<p className="text-danger mb-0 text-center">{serviceError}</p>
					)}
					<Form
						onSubmit={handleSubmit((data) => {
							onSubmit(data);
							// reset();
						})}
						className="mb-2">
						<Form.Group className="mb-3" controlId="nameField">
							<Form.Label>Name</Form.Label>
							<Form.Control
								{...register("name")}
								placeholder="Enter Your Name"
							/>
							{errors.name && (
								<p className="text-danger">{errors.name.message}</p>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="contactInfoField">
							<Form.Label>Email or Phone</Form.Label>
							<Form.Control
								{...register("contactInfo")}
								placeholder="Enter your email or phone"
							/>
							{errors.contactInfo && (
								<p className="text-danger">{errors.contactInfo.message}</p>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="imageField">
							<Form.Label>Image</Form.Label>
							<Form.Control {...register("image")} type="file" />
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
							SAVE
						</Button>
					</Form>
				</div>
			</section>
		</>
	);
};

export default Profile;
