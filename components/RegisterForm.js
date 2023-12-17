import { signIn } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SmallSpinner from "./SmallSpinner";
import { Checkbox } from "./ui/checkbox";

import { userSelector, toggleRegisterForm } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import register from "@/lib/queries/fetchQuery";

import { useState } from "react";
import * as DOMPurify from "dompurify";
import CheckSvg from "./checkSvg";

export default function RegisterForm() {
	const dispatch = useDispatch();
	const registerFormStatus = useSelector(userSelector).isRegisterFormActive;
	const [currentTab, setCurrentTab] = useState("login");
	const [loginBtnText, setLoginBtnText] = useState("SIGN IN");
	const [registerBtnText, setRegisterBtnText] = useState("REGISTER");
	const [error, setError] = useState("");
	const [info, setInfo] = useState("");
	const [loading, setLoading] = useState(false);
	const [isChecked, setIsChecked] = useState(true);
	const [formInput, setFormInput] = useState({
		username: typeof window !== "undefined" ? localStorage.getItem("username") ?? "" : "",
		password: "",
	});

	const [registerFormInput, setRegisterFormInput] = useState({
		username: "",
		password: "",
		email: "",
	});

	const onToggleRegisterForm = () => dispatch(toggleRegisterForm());

	const onFormInput = (e, form) => {
		setFormInput({ ...formInput, [form]: e.target.value });
		if (error || info) {
			setError("");
			setInfo("");
		}
	};

	const onRegisterFormInput = (e, form) => {
		setRegisterFormInput({ ...registerFormInput, [form]: e.target.value });
		if (error || info) {
			setError("");
			setInfo("");
		}
	};

	const onSignIn = async () => {
		setLoading(true);
		setLoginBtnText(<SmallSpinner />);
		if (isChecked) localStorage.setItem("username", formInput.username);
		try {
			const result = await signIn("credentials", {
				username: DOMPurify.sanitize(formInput.username),
				password: formInput.password,
				redirect: false,
			});

			if (result.error) {
				throw new Error(result.error);
			} else {
				dispatch(toggleRegisterForm());
				setFormInput({ username: "", password: "" });
			}
		} catch (error) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoginBtnText("LOGIN");
			setLoading(false);
		}
	};

	const onGoogleSignIn = async () => {
		try {
			const result = await signIn("google", {
				redirect: false,
			});

			if (result.error) {
				throw new Error(result.error);
			} else {
				dispatch(toggleRegisterForm());
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const onRegister = async () => {
		setLoading(true);
		setRegisterBtnText(<SmallSpinner />);
		try {
			const result = await register({
				uri: "/user/register",
				method: "POST",
				body: registerFormInput,
			});

			if (result.error) {
				throw new Error(result.error);
			} else {
				// dispatch(toggleRegisterForm());
				setRegisterFormInput({ username: "", password: "", email: "" });
				setTimeout(() => {
					setRegisterBtnText(<CheckSvg />);
					setLoading(false);
					setTimeout(() => {
						setCurrentTab("login");
						setInfo("WELCOME ! PLEASE LOGIN !");
						setRegisterBtnText("REGISTER");
					}, 750);
				}, 1000);
			}
		} catch (error) {
			setError(error.name);
			setRegisterBtnText("REGISTER");
		}
	};

	const onCheckedChange = () => {
		setIsChecked((c) => !c);
		localStorage.removeItem("username");
	};

	return (
		<div>
			<Tabs
				value={currentTab}
				onValueChange={setCurrentTab}
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
							<div className={`text-xs ${error ? "text-red-700" : "text-emerald-500"}`}>
								{error || info}
							</div>
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
							<Button className="mb-2 w-full" onClick={onSignIn} disabled={loading}>
								{loginBtnText}
							</Button>
							<div className="mb-3 flex w-full justify-between text-xs">
								<span className="flex items-center">
									<Checkbox
										className="mr-2"
										id="rememberMe"
										checked={isChecked}
										onCheckedChange={onCheckedChange}
									/>
									<label htmlFor="rememberMe" className="cursor-pointer">
										REMEMBER ME
									</label>
								</span>
								<span className="ml-1 cursor-pointer hover:underline">FORGOT PASSWORD ?</span>
							</div>
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
								<Label htmlFor="rg_username">USERNAME</Label>
								<Input
									id="rg_username"
									placeholder="username"
									className="w-80 text-base placeholder:text-gray-500"
									value={registerFormInput.username}
									onChange={(e) => onRegisterFormInput(e, "username")}
								/>
							</div>
							<div className="space-y-1 md:mb-6">
								<Label htmlFor="rg_password">PASSWORD</Label>
								<Input
									id="rg_password"
									placeholder="password"
									className="w-80 text-base placeholder:text-gray-500"
									value={registerFormInput.password}
									type="password"
									onChange={(e) => onRegisterFormInput(e, "password")}
								/>
							</div>
							<div className="space-y-1 md:mb-6">
								<Label htmlFor="rg_email">EMAIL</Label>
								<Input
									id="rg_email"
									placeholder="yourEmail@example.com"
									className="w-80 text-base placeholder:text-gray-500"
									value={registerFormInput.email}
									onChange={(e) => onRegisterFormInput(e, "email")}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button className="w-full" onClick={onRegister} disabled={loading}>
								{registerBtnText}
							</Button>
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
