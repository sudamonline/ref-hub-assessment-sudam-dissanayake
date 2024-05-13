import { useCart } from "@/store/cart";
import { Box, Button, Modal, Text, Title } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SuccessModal({
  close,
  opened,
}: {
  close: () => void;
  opened: boolean;
}) {
  const router = useRouter();
  const clearCart = useCart((state) => state.clearCart);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.3,
          blur: 5,
        }}
      >
        <Box
          sx={{ fontSize: "30px", textAlign: "center", padding: "20px 10px" }}
        >
          <Image
            src={"/check.png"}
            width={80}
            height={80}
            alt='done-png'
            style={{
              margin: "0 auto",
            }}
          />
          <Title order={3} fw={500}>
            Thank you for ordering!
          </Title>
          <Text size='sm' c={"gray"} my={20}>
            You have successfully ordered the items. Please check your email for
            further information.
          </Text>
          <Button
            onClick={async () => {
              router.push("/");
              new Promise((resolve) =>
                setTimeout(() => {
                  resolve(clearCart());
                }, 1000)
              );
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Modal>
    </>
  );
}
