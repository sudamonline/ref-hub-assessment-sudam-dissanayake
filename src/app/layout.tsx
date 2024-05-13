import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "./layout.css";

import Layout from "@/components/layout";
import TanstackProvider from "@/providers/tanstack-provider";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import { theme } from "../../theme";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { RootStyleRegistry } from "../providers/EmotionRootStyleRegistry";
import { Toaster } from "sonner";

export const metadata = {
	title: "Ref hub assignment",
	description: "Ref hub with Next.js!",
};

export default function RootLayout({ children }: { children: any }) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<Toaster position="top-center" richColors />
				<TanstackProvider>
					<RootStyleRegistry>
						<MantineEmotionProvider>
							<MantineProvider theme={theme} stylesTransform={emotionTransform}>
								<Layout>
									<>{children}</>
								</Layout>
							</MantineProvider>
						</MantineEmotionProvider>
					</RootStyleRegistry>
				</TanstackProvider>
			</body>
		</html>
	);
}
