import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/User/Dashboard";

function App() {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<HomePage />}
				/>
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/about'
					element={<About />}
				/>
				<Route
					path='/contact'
					element={<Contact />}
				/>
				<Route
					path='/*'
					element={<PageNotFound />}
				/>
			</Routes>
		</>
	);
}

export default App;
