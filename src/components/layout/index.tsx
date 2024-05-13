"use client";

import { AppShell, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import Header from "./header";
import classes from "./styles.module.css";
import SidebarCart from "../sidebar-cart";

export default function Layout({ children }: { children: ReactNode }) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { desktop: true, mobile: !opened },
			}}
			padding="md"
		>
			<Header opened={opened} toggle={toggle} />
			<AppShell.Navbar py="md" px={4}>
				<UnstyledButton className={classes.control}>Home</UnstyledButton>
				<UnstyledButton className={classes.control}>Blog</UnstyledButton>
			</AppShell.Navbar>

			<AppShell.Aside>
				<SidebarCart />
			</AppShell.Aside>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}
