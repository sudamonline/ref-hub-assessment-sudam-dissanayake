"use client";

import { useCart } from "@/store/cart";
import { useMainStore } from "@/store/main";
import { Box, Button, Drawer, Text, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import CartItem from "./cart-item";

export default function SidebarCart() {
	const cartItems = useCart((state) => state.items);
	const opened = useMainStore((state) => state.sidebarCartOpened);
	const closeSidebarCart = useMainStore((state) => state.closeSidebarCart);

	const router = useRouter();

	const itemList = cartItems.map((item) => (
		<CartItem key={item.book.id} book={item.book} quantity={item.quantity} />
	));

	return (
		<>
			<Drawer
				opened={opened}
				position="right"
				withCloseButton={false}
				onClose={closeSidebarCart}
			>
				<Box
					sx={{
						position: "absolute",
						right: "10px",
						top: "10px",
						cursor: "pointer",
					}}
				>
					<IconX stroke={2} onClick={closeSidebarCart} />
				</Box>
				<Box
					sx={{
						height: "calc(100svh - 72px)",
					}}
				>
					<Title ta={"center"} order={2}>
						Cart
					</Title>
					<Box mt={10}>
						{itemList.length ? (
							itemList
						) : (
							<Text size="sm" ta={"center"}>
								No items yet.
							</Text>
						)}
					</Box>
				</Box>
				<Box>
					<Button
						w={"100%"}
						color="teal"
						onClick={() => {
							closeSidebarCart();
							router.push("/checkout");
						}}
						disabled={!cartItems.length}
					>
						Checkout
					</Button>
				</Box>
			</Drawer>
		</>
	);
}
