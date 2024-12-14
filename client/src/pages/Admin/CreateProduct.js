import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [quantity, setQuantity] = useState("");
	const [shipping, setShipping] = useState("");
	const [photo, setPhoto] = useState("");

	// get all category
	const getAllCategories = async () => {
		try {
			const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
			if (data?.success) {
				setCategories(data?.category);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong in getting categories");
		}
	};

	useEffect(() => {
		getAllCategories();
	}, []);

	// create product function
	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			const productData = new FormData();
			productData.append("name", name);
			productData.append("description", description);
			productData.append("price", price);
			productData.append("quantity", quantity);
			productData.append("photo", photo);
			productData.append("category", category);
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/api/v1/product/create-product`,
				productData
			);
			if (data?.success) {
				toast.success("Product Created Successfully");
				setTimeout(() => {
					navigate("/dashboard/admin/products");
				}, 100);
			} else {
				toast.error(data?.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("something went wrong");
		}
	};

	return (
		<Layout title={"Dashboard - Create Product"}>
			<div className='continer-fluid m-3 p-3'>
				<div className='row'>
					<div className='col-md-3'>
						<AdminMenu />
					</div>
					<div className='col-md-9'>
						<h1>Create Product</h1>
						<div className='m-1'>
							<Select
								showSearch
								variant={false}
								placeholder='Select a category'
								size='large'
								className='form-control mb-3'
								onChange={(value) => {
									setCategory(value);
								}}
								options={categories?.map((c) => ({
									key: c._id,
									value: c._id,
									label: c.name,
								}))}></Select>
							<div className='mb-3'>
								<label className='btn btn-outline-secondary col-md-12'>
									{photo ? photo.name : "Upload Photo"}
									<input
										type='file'
										name='photo'
										accept='image/*'
										onChange={(e) => setPhoto(e.target.files[0])}
										hidden
									/>
								</label>
							</div>
							<div className='mb-3'>
								{photo && (
									<div className='text-center'>
										<img
											src={URL.createObjectURL(photo)}
											alt='product_photo'
											height={"200px"}
											className='img img-responsive'
										/>
									</div>
								)}
							</div>
							<div className='mb-3'>
								<input
									type='text'
									value={name}
									placeholder='write a name'
									className='form-control'
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className='mb-3'>
								<div className='input-group'>
									<textarea
										className='form-control'
										aria-label='With textarea'
										placeholder='write a description'
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>
							</div>
							<div className='mb-3'>
								<input
									type='text'
									value={price}
									placeholder='write a price'
									className='form-control'
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
							<div className='mb-3'>
								<input
									type='text'
									value={quantity}
									placeholder='write a quantity'
									className='form-control'
									onChange={(e) => setQuantity(e.target.value)}
								/>
							</div>
							<div className='mb-3'>
								<Select
									showSearch
									variant={false}
									placeholder='select shipping'
									size='large'
									className='form-control mb-3'
									onChange={(value) => setShipping(value)}
									options={[
										{
											value: 0,
											label: "No",
										},
										{
											value: 1,
											label: "Yes",
										},
									]}></Select>
							</div>
							<div className='mb-3'>
								<button className='btn btn-primary' onClick={handleCreate}>
									CREATE PRODUCT
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CreateProduct;
