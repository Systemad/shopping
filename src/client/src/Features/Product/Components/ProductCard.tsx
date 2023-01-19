import { useLocalStorage } from "@mantine/hooks";
import { IconHeart } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { ProductDetail } from "../API/productAPI";
import { useCart } from "../../ShoppingCart/Hooks/useCart";
import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  Button,
  Text,
  Image,
  Badge,
} from "@chakra-ui/react";

interface ProductCardProps {
  product: ProductDetail;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cart, addProductToCart } = useCart();

  const navigate = useNavigate();

  const [lastVisitedIds, setLastVisitedids] = useLocalStorage<string[]>({
    key: "last-visisted",
  });

  const navigateTo = () => {
    setLastVisitedids([...lastVisitedIds, product.id]);
    navigate(product.id);
  };

  return (
    <Card borderRadius={"md"}>
      <Image src={product.imageUrl} alt={product.name} />

      <CardBody>
        <HStack mt="xs">
          <Text>{product.name}</Text>
          <Text size="xl" sx={{ lineHeight: 2 }}>
            ${product.price}
          </Text>
          <Badge variant="outline">25% off</Badge>
        </HStack>
      </CardBody>
      <CardFooter>
        <HStack spacing={30}>
          <Button
            onClick={() => addProductToCart(product, 1)}
            borderRadius="xl"
            style={{ flex: 1 }}
          >
            Add to cart
          </Button>
          <IconButton
            aria-label="add-wishlist"
            icon={<IconHeart size={34} />}
            color="red"
            size="xl"
            borderRadius="xl"
            variant="transparent"
          />
        </HStack>
      </CardFooter>
    </Card>
  );
}

/*

<Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Living room Sofa</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>

*/
