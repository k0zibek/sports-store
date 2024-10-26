import bcrypt from "bcrypt";

export const hashPasword = async (password) => {
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (error) {
		console.log(error);
	}
};

export const comparePassword = async (password, hashedPasword) => {
	return bcrypt.compare(password, hashedPasword);
};
