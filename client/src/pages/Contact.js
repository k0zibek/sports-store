import React from "react";
import Layout from "../components/Layout/Layout";
import { BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
	return (
		<Layout title={"Contact us"}>
			<div className='contactus'>
				<div className='col-md-6'>
					<img
						src='/images/support.jpg'
						alt='contactus'
						style={{ width: "100%" }}
					/>
				</div>
				<div className='col-md-4'>
					<h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
					<p className='text-justify mt-2'>
						Any query and info about product fell free to call anytime we 24/7 vailable
					</p>
					<p className='mt-3'>
						<BiSupport /> : 012-345678
					</p>
					<p className='mt-3'>
						<BiPhoneCall /> : +7777-777-77-77
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default Contact;
