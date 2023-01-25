import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { DynamicTablerIcons } from "../../Components/DynamicTablerIcons";

import { Box, Center, Stack, Button, Heading, Card, CardHeader, CardBody, CardFooter, Divider } from "@chakra-ui/react";

interface CategoryCardProps {
  name: string;
}

export function CategoryCard({ name }: CategoryCardProps) {
  const navigate = useNavigate();
  return (
    <Card size="md" align="center">
      <CardBody>
        <Stack>
          <DynamicTablerIcons iconName={name} size={100} />
          <Heading as="h4" size="md">
            {name}
          </Heading>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button rightIcon={<IconArrowRight />} onClick={() => navigate(name.toLowerCase())}>
          View products
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
