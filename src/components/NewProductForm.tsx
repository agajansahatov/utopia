import { Button, Modal, ToastContainer } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import Toast from "react-bootstrap/Toast";

const schema = z.object({
	image: z.any(),
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.string().min(1),
	category: z.string().min(1),
});

//Interface
type FormData = z.infer<typeof schema>;

const NewProductForm = () => {
	const [serviceError, setServiceError] = useState("");
	const [toaster, setToaster] = useState(false);

	const user = useAuth();
	if (!user) {
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
			.post("http://192.168.31.8:8080/products", {
				name: data.name,
				image: "assets/products/product1.webp",
				description: data.description,
				price: data.price.toString(),
				category: data.category,
				date: "",
				popularity: "",
			})
			.then((res) => {
				if (res.data) {
					setToaster(!toaster);
				}
			})
			.catch((e) => {
				setServiceError(e.message);
			});
	};

	return (
		<>
			<Form
				onSubmit={handleSubmit((data) => {
					onSubmit(data);
					// reset();
				})}
				className="mb-2">
				<div className="d-flex justify-content-center">
					<div
						className="p-5 mx-2 mt-2 mb-3 rounded bg-dark"
						style={{ minWidth: "500px" }}>
						<h2 className="text-center mb-3">NEW PRODUCT</h2>
						{serviceError && (
							<p className="text-danger mb-1 text-center">{serviceError}</p>
						)}

						<Form.Group className="mb-3" controlId="imageField">
							<Form.Label>Image</Form.Label>
							<Form.Control {...register("image")} type="file" />
						</Form.Group>

						<Form.Group className="mb-3" controlId="nameField">
							<Form.Label>Product Name</Form.Label>
							<Form.Control
								{...register("name")}
								type="text"
								placeholder="Product Name"
							/>
							{errors.name && (
								<p className="text-danger">{errors.name.message}</p>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="descriptionField">
							<Form.Label>Description</Form.Label>
							<Form.Control
								{...register("description")}
								type="text"
								placeholder="Description"
							/>
							{errors.description && (
								<p className="text-danger">{errors.description.message}</p>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="priceField">
							<Form.Label>Price</Form.Label>
							<Form.Control
								{...register("price")}
								type="text"
								placeholder="Price"
							/>
							{errors.price && (
								<p className="text-danger">{errors.price.message}</p>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="categoryField">
							<Form.Label>Category</Form.Label>
							<Form.Control
								{...register("category")}
								type="text"
								placeholder="Category"
							/>
							{errors.category && (
								<p className="text-danger">{errors.category.message}</p>
							)}
						</Form.Group>
						<div className="d-flex justify-content-end">
							<Button variant="primary" type="submit" className="px-5 ps-auto">
								Add
							</Button>
						</div>
					</div>
				</div>
			</Form>
			<ToastContainer
				className="p-3 z-1 position-fixed "
				position="top-end"
				style={{ width: "240px", marginTop: "75px" }}>
				<Toast
					delay={3000}
					autohide
					className="bg-success text-white z-1 toast"
					onClose={() => setToaster(!toaster)}
					show={toaster}
					style={{ boxShadow: "0 0 10px 10px #fff" }}>
					<Toast.Header>
						<strong className="me-auto">Success</strong>
						<small>Just now</small>
					</Toast.Header>
					<Toast.Body>A new product is added!</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default NewProductForm;
