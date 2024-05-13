import React from "react";
import { Title, Text, Box, Skeleton } from "@mantine/core";
import { useCart } from "@/store/cart";

export default function OrderSummary() {
	const cartItems = useCart((state) => state.items);

	const subTotal = cartItems.reduce((acc, curr) => {
		const totalPrice = curr.quantity * parseFloat(curr.book.price);
		return acc + totalPrice;
	}, 0);

	return (
		<Box
			p={"20px"}
			bg={"#ededed"}
			mt={"20px"}
			sx={{
				borderRadius: "5px",
			}}
		>
			<Title order={4}>Order Summary</Title>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "10px 0",
					borderBottom: "1px solid #e0e0e0",
				}}
			>
				<Text c={"gray"} size="sm">
					Sub Total
				</Text>
				<Text fw={500}>${subTotal.toFixed(2)}</Text>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "10px 0",
					borderBottom: "1px solid #e0e0e0",
				}}
			>
				<Text c={"gray"} size="sm">
					Transaction Fee
				</Text>
				<Text fw={500}>$2.00</Text>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "10px 0",
				}}
			>
				<Text fw={500}>Order Total</Text>
				<Text fw={500}>${subTotal ? (subTotal + 2.0).toFixed(2) : "0.00"}</Text>
			</Box>
		</Box>
	);
}

export function OrderSummarySkeleton() {
	return (
		<Box
			p={"20px"}
			mt={"20px"}
			sx={{
				borderRadius: "5px",
				border: "1px solid #d4d4d4",
			}}
		>
			<Skeleton h={27} w={150} />
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "10px 0",
					borderBottom: "1px solid #e0e0e0",
				}}
			>
				<Skeleton h={20} w={56} />
				<Skeleton h={24} w={48} />
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "10px 0",
					borderBottom: "1px solid #e0e0e0",
				}}
			>
				<Skeleton h={20} w={56} />
				<Skeleton h={24} w={48} />
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "10px 0",
				}}
			>
				<Skeleton h={24} w={81} />
				<Skeleton h={24} w={48} />
			</Box>
		</Box>
	);
}
