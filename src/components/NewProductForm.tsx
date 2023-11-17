import { Button, Spinner } from "react-bootstrap";
import { Navigate, useOutletContext } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { getBaseURL } from "../config/Configuration";
import { ContextType } from "../App";

const schema = z.object({
	image: z
		.instanceof(FileList)
		.refine((files) => files.length == 1, "Image is required!")
		.refine(
			(files) => files[0]?.size < 5 * 1024 * 1024,
			"Max image size is 5MB",
		)
		.refine(
			(files) =>
				["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
					files[0]?.type,
				),
			"Only jpeg, jpg, png or webp are accepted!",
		),
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.string().min(1),
	category: z.string().min(1),
});

//Interface
type FormData = z.infer<typeof schema>;

const NewProductForm = () => {
	const user = useAuth();
	const { onSuccess } = useOutletContext<ContextType>();
	const [serviceError, setServiceError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

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
		if (data.description.length > 900) {
			setServiceError("Description should be less than 900 characters");
			return;
		}

		const formData = new FormData();
		formData.append("file", data.image[0]);
		formData.append("name", data.name);
		formData.append("image", "");
		formData.append("description", data.description);
		formData.append("price", data.price.toString());
		formData.append("category", data.category);
		formData.append("date", "");
		formData.append("popularity", "");

		setIsLoading(true);
		axios
			.post(getBaseURL() + "products", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				if (res.data) {
					onSuccess("A new product is added!");
					setServiceError("");
					reset();
					setIsLoading(false);
				}
			})
			.catch((e) => {
				setServiceError(e.message);
				setIsLoading(false);
			});
	};

	return (
		<>
			<Form
				onSubmit={handleSubmit((data) => {
					onSubmit(data);
				})}
				className="mt-3 mb-5"
				encType="multipart/form-data"
			>
				<div className="d-flex justify-content-center">
					<div className="p-5 mx-2 mt-2 mb-3 rounded bg-dark">
						<h2 className="text-center mb-3">NEW PRODUCT</h2>
						{serviceError && (
							<p className="text-danger mb-1 text-center">{serviceError}</p>
						)}

						<Form.Group className="mb-3" controlId="imageField">
							<Form.Label>Image</Form.Label>
							<Form.Control {...register("image")} type="file" />
							{errors.image && (
								<p className="text-danger">{errors.image.message}</p>
							)}
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
							{isLoading ? (
								<Button variant="primary" disabled>
									<Spinner
										as="span"
										animation="grow"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									Uploading...
								</Button>
							) : (
								<Button
									variant="primary"
									type="submit"
									className="px-5 ps-auto"
								>
									Add
								</Button>
							)}
						</div>
					</div>
				</div>
			</Form>
		</>
	);
};

export default NewProductForm;
