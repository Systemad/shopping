import { Grid, Skeleton, Container } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { LastVisitedWidget } from "./Home/Widgets/LastVisitedWidget";
import { OnSaleWidget } from "./Home/Widgets/OnSaleWidget";
import { CategoriesWidget } from "./Home/Widgets/CategoriesWidget";
import { CampaignWidget } from "./Home/Widgets/CampaignWidget";

const Home = () => {
  // Extract to own hook?
  const [lastVisitedIds, setLastVisitedids] = useLocalStorage<string[]>({
    key: "last-visisted",
  });
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
          <LastVisitedWidget productIds={lastVisitedIds} />
        </Grid.Col>

        <Grid.Col xs={6}>
          <OnSaleWidget />
        </Grid.Col>
        <Grid.Col xs={6}>
          <CampaignWidget />
        </Grid.Col>

        <Grid.Col xs={12}>
          <CategoriesWidget />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
