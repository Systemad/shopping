import { useColorMode, IconButton } from "@chakra-ui/react";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export function SwitchToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Switch theme"
      variant="iconUtil"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <IconMoonStars /> : <IconSun />}
    />
  );
}
