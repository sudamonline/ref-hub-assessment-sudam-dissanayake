"use client";

import { TBook } from "@/app/hooks/use-books";
import { useCart } from "@/store/cart";
import { Box, Button, Skeleton, Text, useMatches } from "@mantine/core";
import {
	IconCircleMinus,
	IconCirclePlus,
	IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";

export default function CartItem({
	book,
	quantity,
}: {
	book: TBook;
	quantity: number;
}) {
	const removeBook = useCart((state) => state.removeItem);
	const increaseQuantity = useCart((state) => state.increaseQuantity);
	const decreaseQuantity = useCart((state) => state.decreaseQuantity);

	const detailBoxPadding = useMatches({
		base: "15px 10px",
		sm: "20px",
	});

	const titleFontSize = useMatches({
		base: "14px",
		sm: "16px",
	});

	return (
		<Box
			display={"flex"}
			sx={{
				gap: "10px",
				border: "1px solid #d4d4d4",
				borderRadius: "6px",
				position: "relative",
			}}
			mb={10}
		>
			<Box
				sx={{
					position: "absolute",
					bottom: "10px",
					right: "10px",
					color: "red",
					cursor: "pointer",
				}}
			>
				<IconTrash stroke={2} onClick={() => removeBook(book.id)} />
			</Box>
			<Image
				src={book.image}
				width={120}
				height={170}
				alt="book"
				style={{ objectFit: "contain" }}
			/>
			<Box p={detailBoxPadding}>
				<Text size={titleFontSize} fw={500}>
					{book.title}
				</Text>
				<Text size="lg" fw={600} c={"green"}>
					${book.price}
				</Text>
				<Text size="sm" c={"gray"}>
					{book.author}
				</Text>
				<Box
					sx={{ display: "flex", gap: "10px", alignItems: "center" }}
					mt={10}
				>
					<Button
						size="xs"
						onClick={() => decreaseQuantity(book.id)}
						color="red"
						title="Decrease Quantity"
					>
						<IconCircleMinus stroke={2} width={18} />
					</Button>
					<Text size="sm" fw={500}>
						{quantity}
					</Text>
					<Button
						size="xs"
						onClick={() => increaseQuantity(book.id)}
						color="green"
						title="Increase Quantity"
					>
						<IconCirclePlus stroke={2} width={18} />
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export function CartItemSekeleton() {
	return (
		<Box
			display={"flex"}
			sx={{
				gap: "20px",
				border: "1px solid #d4d4d4",
				borderRadius: "6px",
				position: "relative",
			}}
			mb={10}
		>
			<Box
				sx={{
					position: "absolute",
					top: "20px",
					right: "20px",
					color: "red",
					cursor: "pointer",
				}}
			>
				<Skeleton h={24} w={24} />
			</Box>
			<Skeleton w={150} h={200} />
			<Box p={"20px"}>
				<Skeleton h={24} w={200} mb={10} />
				<Skeleton h={29} w={40} mb={10} />
				<Skeleton h={21} w={80} mb={10} />
				<Box
					sx={{ display: "flex", gap: "10px", alignItems: "center" }}
					mt={10}
				>
					<Skeleton h={30} w={54} />
					<Skeleton h={25} w={15} />
					<Skeleton h={30} w={54} />
				</Box>
			</Box>
		</Box>
	);
}
