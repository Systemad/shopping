import { ReactNode } from "react";
import { Navigationbar } from "./Navigationbar";

interface AppLayoutProps {
  children: ReactNode;
}
export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Navigationbar />
      {children}
      {/* Footer here */}
    </>
  );
};
