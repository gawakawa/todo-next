"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Login from "./components/Login";

const LoginPage = async () => {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/dashboard");
	}

	return <Login />;
};

export default LoginPage;
