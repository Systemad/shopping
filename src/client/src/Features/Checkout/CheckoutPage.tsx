import { useState } from "react";

import { useForm } from "@mantine/form";
import { IconAlertTriangle } from "@tabler/icons";
import { useCart } from "../ShoppingCart/Hooks/useCart";
import { CartItem } from "../ShoppingCart/API/shoppingCartAPI";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  useStyles,
  Text,
  Input,
  HStack,
  Flex,
  Stack,
  FormLabel,
  FormControl,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";

export function CheckoutPage() {
  const { cart } = useCart();
  const cartEmpty = cart.length === 0;
  const bg = useColorModeValue("white", "gray.700");

  return (
    <Container bg={bg} shadow={"lg"} borderRadius={"lg"} maxW="5xl" my={48} flex={"1 0 auto"} py={8} mt={20}>
      {cart.length <= 0 && (
        <Center style={{ height: 200 }}>
          <Text size="xl" fontWeight={400}>
            Cart is empty
          </Text>
        </Center>
      )}

      {cart.length > 0 && <CheckoutStepper />}
    </Container>
  );
}

function CheckoutStepper() {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { cart, totalCost, removeProductFromCart } = useCart();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      lastname: "",
      adress: "",
      city: "",
      phone: "",
    },

    validate: {
      name: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
      lastname: (value) => (value.length < 2 ? "Last name must have at least 2 letters" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      adress: (value) => (value.length < 2 ? "adress must have at least 2 letters" : null),
      city: (value) => (value.length < 2 ? "adress must have at least 2 letters" : null),
      phone: (value) =>
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value) ? null : "invalid phone",
    },
  });

  const shouldAllowSelectStep = (step: number) => {
    if (step === 1) return form.isValid();

    return true;
  };
  //highestStepVisited >= step && active !== step;
  //const checkoutComplete = active == 2 ? form.isValid() : active != 2;

  const cartSummary = (
    <>
      <Stack>
        {cart.map((cartItem) => (
          <>
            <Item deleteItem={() => removeProductFromCart(cartItem.productDetail, cartItem.quantity)} item={cartItem} />
            <Divider mt={4} />
          </>
        ))}
      </Stack>
      <Text size={"xl"} fontWeight={500} align="end">
        Total cost: ${totalCost}
      </Text>
    </>
  );

  const details = (
    <>
      <form>
        <HStack align="stretch" spacing={5}>
          <Stack>
            <Text>First name</Text>
            <Input colorScheme="teal" id="First name" {...form.getInputProps("name")} />
          </Stack>
          <Stack>
            <Text>Last name</Text>
            <Input id="Last name" {...form.getInputProps("lastname")} />
          </Stack>

          <Stack>
            <Text>Email</Text>
            <Input id="Email adress" placeholder="hello!gmail.com" {...form.getInputProps("email")} />
          </Stack>
        </HStack>

        <HStack mt={6} align="stretch" spacing={5}>
          <Stack>
            <Text>Country</Text>
            <Input id="Country" />
          </Stack>

          <Stack>
            <Text>City</Text>
            <Input id="City" {...form.getInputProps("city")} />
          </Stack>
          <Stack>
            <Text>Adress</Text>
            <Input id="Address" {...form.getInputProps("adress")} />
          </Stack>
          <Stack>
            <Text>Phone</Text>
            <Input id="Phone number" {...form.getInputProps("phone")} />
          </Stack>
        </HStack>
      </form>
    </>
  );

  const final = <Flex>Hello</Flex>;
  const steps = [
    { label: "Cart", content: cartSummary },
    { label: "Details", content: details },
    { label: "Step Payment", content: final },
  ];

  return (
    <>
      <Steps colorScheme="green" variant="circles" activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            <Box w="100%" rounded="lg" p={6} my="12">
              {content}
            </Box>
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length ? (
        <Flex p={4}>
          <Button mx="auto" size="md" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button isDisabled={activeStep === 0} mr={4} onClick={prevStep} size="md" variant="ghost">
            Prev
          </Button>
          <Button size="md" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
    </>
  );
}
interface ItemProps {
  item: CartItem;
  deleteItem: () => void;
}
function Item({ item, deleteItem }: ItemProps) {
  return (
    <HStack w="full" spacing={10} m="lg" align="center">
      <Avatar size={"lg"} src={item.productDetail.imageUrl} />

      <Stack align="apart">
        <Text size="xl" fontWeight={400}>
          {item.productDetail.name}
        </Text>
        <Text size="xl" fontWeight={500}>
          ${item.productDetail.price}
        </Text>
      </Stack>
      <Spacer />
      <Text color="dimmed" size="lg">
        Quantity: {item.quantity}
      </Text>
      <Button onClick={() => deleteItem()} justifyContent={"flex-end"} color="red" variant="solid">
        Remove
      </Button>
    </HStack>
  );
}
