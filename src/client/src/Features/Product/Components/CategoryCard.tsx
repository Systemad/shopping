import { useHover } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { DynamicTablerIcons } from "../../Components/DynamicTablerIcons";

import { Box, Center, Stack, Button, Heading } from "@chakra-ui/react";

interface CategoryCardProps {
  name: string;
}

// TODO: Add Category Object, and subcategories
export function CategoryCard({ name }: CategoryCardProps) {
  const { hovered, ref } = useHover();
  const navigate = useNavigate();
  return (
    <Center>
      <Stack>
        <Heading>{name}</Heading>
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
      </Stack>
    </Center>
  );
}
