import { Container } from "@mantine/core";

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Container size="lg" my="xl">
      {children}
    </Container>
  );
}
