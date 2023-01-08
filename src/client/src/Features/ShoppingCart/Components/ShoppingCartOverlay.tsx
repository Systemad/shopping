import { useState } from "react";
import { Drawer, Button, Group } from "@mantine/core";

interface ShoppingCardOverlayProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export function ShoppingCardOverlay({
  isOpen,
  toggleOpen,
}: ShoppingCardOverlayProps) {
  //const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        position="right"
        transitionDuration={300}
        opened={isOpen}
        onClose={() => toggleOpen()}
        title="Shopping Cart"
        padding="xl"
        size="lg"
      >
        {/* Drawer content */}
      </Drawer>
    </>
  );
}
