import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  createStyles,
  Container,
  Avatar,
  Text,
  Divider,
  Center,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertTriangle } from "@tabler/icons";
import { useCart } from "../ShoppingCart/Hooks/useCart";
import { CartItem } from "../ShoppingCart/API/shoppingCartAPI";

const useStyles = createStyles((theme) => {
  return {
    wrapper: {
      position: "relative",

      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 16,
    },
    title: {
      marginBottom: theme.spacing.xs,
      //fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    icon: {
      color: theme.colors.red[theme.colorScheme === "dark" ? 7 : 6],
    },
  };
});

export function CheckoutPage() {
  const { classes } = useStyles();
  const { cart, removeProductFromCart } = useCart();
  const cartEmpty = cart.length === 0;

  return (
    <Container py={48}>
      <div className={classes.wrapper}>
        {cart.length <= 0 && (
          <Center style={{ height: 200 }}>
            <Text fz="xl" weight={400}>
              Cart is empty
            </Text>
          </Center>
        )}

        {cart.length > 0 && <CheckoutStepper />}
      </div>
    </Container>
  );
}

function CheckoutStepper() {
  const { classes } = useStyles();
  const { cart, totalCost, removeProductFromCart } = useCart();

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      lastname: (value) =>
        value.length < 2 ? "Last name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      adress: (value) =>
        value.length < 2 ? "adress must have at least 2 letters" : null,
      city: (value) =>
        value.length < 2 ? "adress must have at least 2 letters" : null,
      phone: (value) =>
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)
          ? null
          : "invalid phone",
    },
  });

  const shouldAllowSelectStep = (step: number) => {
    if (step === 1) return form.isValid();

    return true;
  };
  //highestStepVisited >= step && active !== step;
  //const checkoutComplete = active == 2 ? form.isValid() : active != 2;
  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Your cart" description="Cart summary">
          {cart.map((cartItem) => (
            <Item item={cartItem} />
          ))}
          <Divider />
          <Text fz={"xl"} weight={500} ta="end">
            Total cost: ${totalCost}
          </Text>
        </Stepper.Step>
        <Stepper.Step label="Details" description="Checkout details">
          <form>
            <Group grow>
              <TextInput label="First name" {...form.getInputProps("name")} />
              <TextInput
                label="Last name"
                {...form.getInputProps("lastname")}
              />
              <TextInput
                label="Email adress"
                placeholder="hello!gmail.com"
                {...form.getInputProps("email")}
              />
            </Group>
            <Group grow>
              <TextInput label="Country" />
              <TextInput label="City" {...form.getInputProps("city")} />
              <TextInput label="Address" {...form.getInputProps("adress")} />
              <TextInput
                label="Phone number"
                {...form.getInputProps("phone")}
              />
            </Group>
          </form>
        </Stepper.Step>
        <Stepper.Step label="Checkout" description="Payment">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button disabled={active == 1 && form.isValid()} onClick={nextStep}>
          Next step
        </Button>
      </Group>
    </>
  );
}
interface ItemProps {
  item: CartItem;
}
function Item({ item }: ItemProps) {
  return (
    <Group mb="lg" position="center">
      <Avatar size={"xl"} src={item.productDetail.imageUrl} />
      <div style={{ flex: 1 }}>
        <Group position="apart">
          <Text size="xl" weight={400}>
            {item.productDetail.name}
          </Text>
          <Text size="xl" weight={500}>
            ${item.productDetail.price}
          </Text>
          <Button color="red" variant="subtle">
            Remove
          </Button>
        </Group>

        <Text color="dimmed" size="lg">
          Quantity: {item.quantity}
        </Text>
      </div>
    </Group>
  );
}
