import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navigationbar } from "./Navigationbar";

interface AppLayoutProps {
  children: ReactNode;
}
export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Navigationbar />
      {children}
      <Footer />
      {/* Footer here */}
    </>
  );
};
