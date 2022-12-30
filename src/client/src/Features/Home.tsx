import { Grid, Skeleton, Container } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import LastVisited from "./Components/LastVisited";
import OnSaleSection from "./Components/OnSale";

const child = <Skeleton height={220} radius="md" animate={false} />;
const Home = () => {
  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={12}>
          {" "}
          <Carousel
            sx={{ width: "100%" }}
            mx="auto"
            slideSize="70%"
            height={225}
            align="start"
            orientation="vertical"
            slideGap="md"
            controlSize={30}
            loop
          >
            <Carousel.Slide>1</Carousel.Slide>
            <Carousel.Slide>2</Carousel.Slide>
            <Carousel.Slide>3</Carousel.Slide>
          </Carousel>
        </Grid.Col>

        <Grid.Col xs={8}>
          <OnSaleSection />
        </Grid.Col>
        <Grid.Col xs={4}>
          <LastVisited />
        </Grid.Col>

        <Grid.Col xs={6}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col>

        <Grid.Col xs={12}>{child}</Grid.Col>
        <Grid.Col xs={12}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
