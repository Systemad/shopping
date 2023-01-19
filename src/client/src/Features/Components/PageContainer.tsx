import { Container } from "@chakra-ui/react";

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return <Container centerContent>{children}</Container>;
}
