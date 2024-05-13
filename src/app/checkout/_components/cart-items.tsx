import { TCartItem } from "@/store/cart";
import CartItem, { CartItemSekeleton } from "./cart-item";
import { Box } from "@mantine/core";

export default function CartItems({ cartItems }: { cartItems: TCartItem[] }) {
  return (
    <>
      {cartItems.length
        ? cartItems.map(({ book, quantity }) => (
            <CartItem key={book.id} book={book} quantity={quantity} />
          ))
        : "No items yet"}
    </>
  );
}

export function CartItemsSkeleton() {
  return (
    <Box mt={"20px"}>
      {new Array(3).fill(null).map((_, idx) => (
        <CartItemSekeleton key={idx} />
      ))}
    </Box>
  );
}
