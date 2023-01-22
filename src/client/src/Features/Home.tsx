import { Grid, GridItem, Container, Button } from "@chakra-ui/react";

import { FeaturedWidget } from "./Home/Widgets/FeaturedWidget";
import { CategoriesWidget } from "./Home/Widgets/CategoriesWidget";
import { PromotionWidget } from "./Home/Widgets/PromotionWidget";

const Home = () => {
  return (
    <Container maxW={"6xl"} flex={"1 0 auto"} py={8} mt={20}>
      <Grid gap={6} h="100vh">
        <GridItem rowSpan={4} w={"100%"}>
          <PromotionWidget />
        </GridItem>

        <GridItem w="100%">
          <FeaturedWidget />
        </GridItem>

        <GridItem w="100%" bg="blue.500" />
      </Grid>
    </Container>
  );
};

export default Home;
