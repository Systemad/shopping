import { useNavigate } from "react-router-dom";
import { DynamicTablerIcons } from "../../Components/DynamicTablerIcons";

import { Stack, Button, Heading, Card, CardBody, CardFooter, Divider } from "@chakra-ui/react";
import { cupcake } from "../../Theme/Colors/cupcake";
import { IconArrowRight } from "@tabler/icons-react";

interface CategoryCardProps {
  name: string;
}

export function CategoryCard({ name }: CategoryCardProps) {
  const navigate = useNavigate();
  return (
    <Card borderRadius={"lg"} size="md" align="center">
      <CardBody>
        <Stack align="center">
          <DynamicTablerIcons iconName={name} size={100} />
          <Heading as="h4" size="md">
            {name}
          </Heading>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          outline={"1px solid"}
          outlineColor={cupcake["info-conent"]}
          rightIcon={<IconArrowRight />}
          onClick={() => navigate(name.toLowerCase())}
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
}

/*
        {hovered ? (
          <>
            Render sub category list
            <Button
              onClick={() => navigate(name.toLowerCase())}
              pos={"absolute"}
              bottom="0.5rem"
              right="0.5rem"
              borderRadius={"md"}
              rightIcon={<IconArrowRight />}
            >
              View all products
            </Button>
          </>
        ) : (
          <>
            <DynamicTablerIcons iconName={name} size={100} />
          </>
        )}
*/
