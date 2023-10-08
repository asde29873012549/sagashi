import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({ id, title, description, action, ...props }) {
				return (
					<Toast
						key={id}
						{...props}
						className="from-22% max-w-fit bg-gradient-to-bl from-cyan-800 via-slate-800 via-40% to-slate-950 to-90% text-background"
					>
						<div className="grid gap-1">
							{title && (
								<ToastTitle className="font-light">
									<div className="flex w-full items-center space-x-3">
										<span
											className={`box-border flex h-6 w-6 items-center justify-center rounded-full ${
												props.status === "success" ? "bg-emerald-500" : "bg-red-800"
											} `}
										>
											{props.success ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="18"
													height="18"
													viewBox="0 0 24 24"
													fill="none"
													stroke="black"
													strokeWidth="3"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="lucide lucide-check"
												>
													<polyline points="20 6 9 17 4 12" />
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="18"
													height="18"
													viewBox="0 0 24 24"
													fill="none"
													stroke="black"
													strokeWidth="3"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="lucide lucide-circle-slash"
												>
													<line x1="9" x2="15" y1="15" y2="9" />
													<circle cx="12" cy="12" r="10" />
												</svg>
											)}
										</span>
										<span>{title}</span>
									</div>
								</ToastTitle>
							)}
							{description && (
								<ToastDescription className="ml-9 text-xs font-extralight">
									{description}
								</ToastDescription>
							)}
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
