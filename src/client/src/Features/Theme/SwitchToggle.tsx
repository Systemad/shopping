import { useColorMode, Button } from "@chakra-ui/react";
import { IconSun, IconMoonStars } from "@tabler/icons";

export function SwitchToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? (
        <IconMoonStars color={"black"} size={20} stroke={1.5} />
      ) : (
        <IconSun color={"white"} size={20} stroke={1.5} />
      )}
    </Button>
  );
}
