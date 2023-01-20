import { Container } from "@chakra-ui/react";

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Container maxW={"7xl"} flex={"1 0 auto"} py={8} mt={20}>
      {children}
    </Container>
  );
}
