import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CreateForm from "../../components/Form/CreateForm";
import { Modal } from "antd";

const CreateCategory = () => {
	const [categories, setCategories] = useState([]);
	const [name, setName] = useState("");
	const [selected, setSelected] = useState(null);
	const [updatedName, setUpdatedName] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	// form submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
			if (data?.success) {
				toast.success(`${data.category.name} is created`);
				getAllCategories();
				setName("");
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("something went wrong in input form");
		}
	};

	//get All categories
	const getAllCategories = async () => {
		try {
			const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
			if (data.success) {
				setCategories(data.category);
				console.log(data.category);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong in getting categories");
		}
	};

	useEffect(() => {
		getAllCategories();
	}, []);

	// update Category
	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
				{ name: updatedName }
			);
			if (data.success) {
				toast.success(`${updatedName} is updated`);
				setSelected(null);
				setUpdatedName("");
				setIsModalOpen(false);
				getAllCategories();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	// delete Category
	const handleDelete = async (pid) => {
		try {
			const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`);
			if (data.success) {
				toast.success("category is deleted");
				getAllCategories();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	return (
		<Layout title={"Dashboard - Create Category"}>
			<div className='continer-fluid m-3 p-3'>
				<div className='row'>
					<div className='col-md-3'>
						<AdminMenu />
					</div>
					<div className='col-md-9'>
						<h1>Manage Category</h1>
						<div className='p-3 w-50'>
							<CreateForm handleSubmit={handleSubmit} value={name} setValue={setName} />
						</div>
						<div className='w-75'>
							<table className='table'>
								<thead>
									<tr>
										<th scope='col'></th>
										<th scope='col'>Name</th>
										<th scope='col'>Actions</th>
									</tr>
								</thead>
								<tbody>
									{categories?.map((c, index) => (
										<tr key={c._id}>
											<th>{index + 1}</th>
											<td className='m-1'>{c.name}</td>
											<td>
												<button
													className='btn btn-sm btn-primary ms-2'
													onClick={() => {
														setIsModalOpen(true);
														setUpdatedName(c.name);
														setSelected(c);
													}}>
													Edit
												</button>
												<button
													className='btn btn-sm btn-danger ms-2'
													onClick={() => {
														handleDelete(c._id);
													}}>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<Modal
							title='Edit category name'
							onCancel={() => setIsModalOpen(false)}
							footer={null}
							open={isModalOpen}>
							<CreateForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
						</Modal>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CreateCategory;
