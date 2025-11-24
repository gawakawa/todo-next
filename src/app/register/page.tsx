"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Register() {
	const router = useRouter();
	const { data, status } = useSession();

	useEffect(() => {
		status === "unauthenticated" && router.push("/login");
	}, [router, status]);

	return (
		<div>
			<h1>Register</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
