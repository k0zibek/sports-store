import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
	return (
		<Layout>
			<div className="aboutus">
				<div className="col-md-6">
					<img
						src="/images/about.jpg"
						alt="aboutus"
						style={{ width: "100%" }}
					/>
				</div>
				<div className="col-md-4">
					<p className="text-justify mt-2">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
						the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
						of type and scrambled it to make a type specimen book. It has survived not only five centuries,
						but also the leap into electronic typesetting, remaining essentially unchanged. It was
						popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus PageMaker including versions of
						Lorem Ipsum.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default About;
