"use client";

import { useCart } from "@/store/cart";
import { Box, Container, Grid, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import CartItems, { CartItemsSkeleton } from "./cart-items";
import OrderSummary, { OrderSummarySkeleton } from "./order-summary";
import ShippingDetailsForm from "./shipping-details-form";
import SuccessModal from "./success-modal";
import { useDisclosure } from "@mantine/hooks";

export default function Checkout() {
	const cartItems = useCart((state) => state.items);
	const [isLoading, setIsLoading] = useState(true);
	const [opened, { open, close }] = useDisclosure(false);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<div>
			<Container size={"xl"}>
				<Title order={2}>Shopping Cart</Title>

				<Grid>
					<Grid.Col span={{ md: 8 }}>
						<Box mt={"20px"}>
							{!isLoading ? (
								<CartItems cartItems={cartItems} />
							) : (
								<CartItemsSkeleton />
							)}
						</Box>
					</Grid.Col>
					<Grid.Col span={{ md: 4 }}>
						<Box
							sx={{
								position: "sticky",
								top: "80px",
							}}
						>
							{!isLoading ? <OrderSummary /> : <OrderSummarySkeleton />}
							<ShippingDetailsForm
								handleSubmit={(data) => {
									console.log(data);
									open();
								}}
							/>
						</Box>
					</Grid.Col>
				</Grid>
			</Container>
			<SuccessModal opened={opened} close={close} />
		</div>
	);
}
