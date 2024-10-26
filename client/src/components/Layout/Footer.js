import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="footer">
			<h4 className="text-center">All rights Reserved &copy; Kaz1</h4>
			<p className="text-center mt-3">
				<Link to="/About">About</Link>|<Link to="/Contact">Contact</Link>
			</p>
		</div>
	);
};

export default Footer;
