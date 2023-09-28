import { signIn } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { userSelector, toggleRegisterForm } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";

export default function RegisterForm() {
	const dispatch = useDispatch();
	const registerFormStatus = useSelector(userSelector).isRegisterFormActive;
	const [error, setError] = useState("");
	const [formInput, setFormInput] = useState({
		username: "",
		password: "",
	});

	const onToggleRegisterForm = () => dispatch(toggleRegisterForm());

	const onFormInput = (e, form) => {
		setFormInput({ ...formInput, [form]: e.target.value });
		if (error) setError("");
	};

	const onSignIn = async () => {
		const result = await signIn("credentials", {
			username: formInput.username,
			password: formInput.password,
			redirect: false,
		});

		if (result.error) {
			setError(result.error);
		} else {
			dispatch(toggleRegisterForm());
			setFormInput({ username: "", password: "" });
		}
	};

	const onGoogleSignIn = async () => {
		const result = await signIn("google");

		if (result && result.error) {
			setError(result.error);
		} else {
			dispatch(toggleRegisterForm());
		}
	};

	return (
		<div>
			<Tabs
				defaultValue="login"
				className={
					"opacity-1 visible fixed inset-0 z-30 m-auto h-4/6 max-h-max w-9/12 min-w-fit max-w-max transition-opacity duration-1000 " +
					(!registerFormStatus && "invisible opacity-0")
				}
			>
				<TabsList
					className={`grid w-full grid-cols-2 ${!registerFormStatus && "invisible opacity-0"}`}
				>
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="register">Register</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<Card className="h-4/6 max-h-max w-9/12 min-w-fit max-w-max">
						<CardHeader className="mb-2 flex items-center justify-center">
							<CardTitle>LOGIN</CardTitle>
							<div className="text-xs text-red-700">{error}</div>
						</CardHeader>
						<CardContent>
							<div className="mb-2 space-y-1 md:mb-6">
								<Label htmlFor="username">USERNAME</Label>
								<Input
									id="username"
									placeholder="username"
									className="w-80 text-base placeholder:text-gray-500"
									onChange={(e) => onFormInput(e, "username")}
									value={formInput.username}
								/>
							</div>
							<div className="mb-5 space-y-1 md:mb-8">
								<Label htmlFor="password">PASSWORD</Label>
								<Input
									id="password"
									placeholder="password"
									className="w-80 text-base placeholder:text-gray-500"
									type="password"
									value={formInput.password}
									onChange={(e) => onFormInput(e, "password")}
								/>
							</div>
							<Button className="mb-2 w-full md:mb-4" onClick={onSignIn}>
								SIGN IN
							</Button>
							<div className="flex items-center justify-center">
								<div className="space-y-1">OR</div>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col">
							<Button variant="outline" className="mb-2 w-full" onClick={onGoogleSignIn}>
								Sign in With Google
							</Button>
							<Button variant="outline" className="w-full">
								Sign in With FaceBook
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="register">
					<Card className="h-4/6">
						<CardHeader className="mb-2 flex items-center justify-center">
							<CardTitle>REGISTER</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-1 md:mb-6">
								<Label htmlFor="username">USERNAME</Label>
								<Input id="username" placeholder="username" className="w-80 text-base" />
							</div>
							<div className="space-y-1 md:mb-6">
								<Label htmlFor="password">PASSWORD</Label>
								<Input
									id="password"
									placeholder="password"
									className="w-80 text-base"
									type="password"
								/>
							</div>
							<div className="space-y-1 md:mb-6">
								<Label htmlFor="email">EMAIL</Label>
								<Input id="email" placeholder="yourEmail@example.com" className="w-80 text-base" />
							</div>
						</CardContent>
						<CardFooter>
							<Button className="w-full">SIGN IN</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
			<div
				className={
					"opacity-1 visible fixed z-20 h-screen w-screen bg-[rgba(0,0,0,0.7)] transition-opacity duration-700 " +
					(!registerFormStatus && "invisible opacity-0")
				}
				onClick={onToggleRegisterForm}
			></div>
		</div>
	);
}
