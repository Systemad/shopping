import { FeaturedWidget } from "./Home/Widgets/FeaturedWidget";
import { CategoriesWidget } from "./Home/Widgets/CategoriesWidget";
import { CarouselWidget } from "./Home/Widgets/CarouselWidget";
import { Grid, GridItem, Container } from "@chakra-ui/react";

const Home = () => {
  return (
    <Container centerContent my="xl" py={{ base: 14, sm: 20, md: 32 }}>
      <Grid>
        <GridItem w="100%">
          <CarouselWidget />
        </GridItem>

        <GridItem w="100%">
          <FeaturedWidget />
        </GridItem>

        <GridItem w="100%">
          <CategoriesWidget />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Home;
