import { useCallback, useEffect, useState, useRef } from "react";
import { Carousel, Embla } from "@mantine/carousel";
import { Progress, Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";

// https://mantine.dev/others/carousel/#examples
export function CarouselWidget() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const autoplay = useRef(Autoplay({ delay: 7000 }));

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla]);

  return (
    <>
      <Carousel
        getEmblaApi={setEmbla}
        sx={{ width: "100%" }}
        height={275}
        orientation="horizontal"
        slideGap="md"
        controlSize={30}
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <Carousel.Slide>
          <Image
            fit="contain"
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          />
        </Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel>
      <Progress
        value={scrollProgress}
        styles={{ bar: { transitionDuration: "0ms" }, root: { maxWidth: 320 } }}
        size="sm"
        mt="xl"
        mx="auto"
      />
    </>
  );
}
