import { Grid, Container } from "@mantine/core";

import { FeaturedWidget } from "./Home/Widgets/FeaturedWidget";
import { CategoriesWidget } from "./Home/Widgets/CategoriesWidget";
import { CarouselWidget } from "./Home/Widgets/CarouselWidget";

function Home() {
  return (
    <Container size="lg" my="xl">
      <Grid>
        <Grid.Col xs={12}>
          <CarouselWidget />
        </Grid.Col>

        <Grid.Col xs={12}>
          <FeaturedWidget />
        </Grid.Col>

        <Grid.Col xs={12}>
          <CategoriesWidget />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Home;
