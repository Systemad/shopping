import { Grid, Skeleton, Container, Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import LastVisited from "./Components/LastVisited";
import { OnSaleSection } from "./Components/OnSale";
import { Categories } from "./Components/Categories";
import { SwitchToggle } from "./Theme/SwitchToggle";
import { Campaign } from "./Components/Campaign";

const child = <Skeleton height={220} radius="md" animate={false} />;
const Home = () => {
  return (
    <Container size="lg" my="xl">
      <Grid>
        <Grid.Col xs={8}>
          <Carousel
            sx={{ width: "100%" }}
            mx="auto"
            slideSize="70%"
            height={225}
            align="start"
            orientation="horizontal"
            slideGap="md"
            controlSize={30}
            loop
          >
            <Carousel.Slide>1</Carousel.Slide>
            <Carousel.Slide>2</Carousel.Slide>
            <Carousel.Slide>3</Carousel.Slide>
          </Carousel>
        </Grid.Col>
        <Grid.Col xs={4}>
          <LastVisited />
        </Grid.Col>

        <Grid.Col xs={6}>
          <OnSaleSection />
        </Grid.Col>
        <Grid.Col xs={6}>
          <Campaign />
        </Grid.Col>

        <Grid.Col xs={12}>
          <Categories />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
