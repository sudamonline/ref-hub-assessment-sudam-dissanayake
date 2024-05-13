"use client";

import { useCart } from "@/store/cart";
import { useMainStore } from "@/store/main";
import { AppShell, Box, Burger, Button, Container, Group } from "@mantine/core";
import { IconShoppingCartCopy } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import classes from "./styles.module.css";

export default function Header({
	opened,
	toggle,
}: {
	opened: boolean;
	toggle: () => void;
}) {
	const cartCount = useCart((state) =>
		state.items.reduce((acc, curr) => acc + curr.quantity, 0)
	);
	const openSidebarCart = useMainStore((state) => state.openSidebarCart);

	return (
		<AppShell.Header>
			<Container size={"xl"}>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
					<Group justify="space-between" style={{ flex: 1 }}>
						<Image
							src="https://assets-global.website-files.com/62e0ed34b4bd5ea0829a8685/62e3876e800b395b4ea81504_Ref-hub-logo.svg"
							width={150}
							height={60}
							alt="logo"
						/>

						<Group ml="xl" gap={5}>
							<Group visibleFrom="sm">
								<Link
									className={`${classes.control}`}
									style={{ textDecoration: "none" }}
									href="/"
								>
									Home
								</Link>
							</Group>
							<Button
								onClick={openSidebarCart}
								variant="light"
								py={0}
								style={{
									position: "relative",
									padding: "10px",
									display: "inline-block",
									overflow: "visible",
								}}
							>
								<IconShoppingCartCopy stroke={2} />{" "}
								<Box
									sx={{
										position: "absolute",
										top: 0,
										right: "-5px",
										backgroundColor: "green",
										width: "20px",
										height: "20px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: "white",
										borderRadius: "50%",
										fontSize: "12px",
									}}
								>
									{cartCount}
								</Box>
							</Button>
						</Group>
					</Group>
				</Group>
			</Container>
		</AppShell.Header>
	);
}
