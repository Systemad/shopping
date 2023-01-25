import { useColorMode, IconButton } from "@chakra-ui/react";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export function SwitchToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Switch theme"
      p={3}
      borderWidth={1}
      borderColor={"gray.500"}
      size="xl"
      borderRadius={"full"}
      onClick={toggleColorMode}
      icon={
        colorMode === "light" ? (
          <IconMoonStars color={"black"} strokeWidth={1.5} />
        ) : (
          <IconSun color={"white"} strokeWidth={1.5} />
        )
      }
    />
  );
}
