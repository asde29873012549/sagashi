import "@/styles/globals.css";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false, // default: true
					},
				},
			}),
	);

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Provider store={store}>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</Provider>
				</Hydrate>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</SessionProvider>
	);
}
