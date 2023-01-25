import { IconHeart } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ProductDetail } from "../API/productAPI";
import { useCart } from "../../ShoppingCart/Hooks/useCart";
import { Card, CardBody, CardFooter, HStack, IconButton, Button, Text, Image, Badge, Stack } from "@chakra-ui/react";

interface ProductCardProps {
  product: ProductDetail;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cart, addProductToCart } = useCart();

  const navigate = useNavigate();

  return (
    <Card borderRadius={"md"}>
      <CardBody>
        <Image borderRadius="lg" src={product.imageUrl} alt={product.name} />
        <HStack mt="6" spacing="3">
          <Text>{product.name}</Text>
          <Stack>
            <Text size="xl">${product.price}</Text>
            <Badge variant="outline">25% off</Badge>
          </Stack>
        </HStack>
      </CardBody>
      <CardFooter justify="space-between" flexWrap="wrap">
        <Button onClick={() => addProductToCart(product, 1)} borderRadius="md" flex="1" variant="ghost">
          Add to cart
        </Button>
        <Button onClick={() => navigate(product.id)} borderRadius="md" flex="1" variant="ghost">
          View
        </Button>
        <IconButton
          aria-label="add-wishlist"
          icon={<IconHeart size={34} />}
          color="red"
          borderRadius="md"
          flex="1"
          variant="ghost"
        />
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
