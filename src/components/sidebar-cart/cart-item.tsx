"use client";

import { TBook } from "@/app/hooks/use-books";
import { useCart } from "@/store/cart";
import {
	Box,
	Button,
	Text
} from "@mantine/core";
import { IconCircleMinus, IconCirclePlus, IconTrash } from "@tabler/icons-react";
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

	return (
		<Box
			display={"flex"}
			sx={{
				gap: "5px",
				border: "1px solid #d4d4d4",
				borderRadius: "6px",
				position: "relative",
				alignItems: "center",
			}}
			mb={10}
		>
			<Box
				sx={{
					position: "absolute",
					bottom: "5px",
					right: "5px",
					color: "red",
					cursor: "pointer",
				}}
			>
				<IconTrash width={20} stroke={2} onClick={() => removeBook(book.id)} />
			</Box>
			<Image
				src={book.image}
				width={90}
				height={110}
				alt="book"
				style={{ objectFit: "contain" }}
			/>
			<Box p={"10px"} pl={0}>
				<Text size="sm" fw={500}>
					{book.title}
				</Text>
				<Text size="md" fw={600} c={"green"}>
					${book.price}
				</Text>
				<Text size="xs" c={"gray"}>
					{book.author}
				</Text>
				<Box
					sx={{ display: "flex", gap: "10px", alignItems: "center" }}
					mt={10}
				>
					<Button
						size="compact-sm"
						onClick={() => decreaseQuantity(book.id)}
						color="red"
						title="Decrease Quantity"
					>
						<IconCircleMinus stroke={2} width={15} />
					</Button>
					<Text size="sm" fw={500}>
						{quantity}
					</Text>
					<Button
						size="compact-sm"
						onClick={() => increaseQuantity(book.id)}
						color="green"
						title="Increase Quantity"
					>
						<IconCirclePlus stroke={2} width={15} />
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
