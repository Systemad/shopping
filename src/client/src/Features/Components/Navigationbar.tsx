import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { NavItem, NAV_ITEMS } from "./NavigationData";
import { ShoppingCartMenu } from "../ShoppingCart/Components/ShoppingCartMenu";
import { SwitchToggle } from "../Theme/SwitchToggle";
import { SignInSignOutButton } from "../Auth/SignInSignOutButton";
import { palette } from "../Theme/Colors/colors";

export function Navigationbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        as={"header"}
        pos="fixed"
        top="0"
        w={"full"}
        //w={"calc(100% - 30px)"}
        bg={useColorModeValue("#edf5f5", "#1c2626")}
        color={useColorModeValue(palette.light.onPrimaryContainer, palette.dark.onPrimary)}
        minH={"75px"}
        py={{ base: 3 }}
        px={{ base: 5 }}
        shadow="xs"
        //borderRadius="lg"
        align={"center"}
      >
        <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={6} h={6} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack align={"center"} flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          <SignInSignOutButton />
          <ShoppingCartMenu />
          <SwitchToggle />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link as={NavLink} variant="navbar" to={navItem.href ?? ""}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow={"xl"} bg={popoverContentBgColor} p={4} rounded={"xl"} minW={"sm"}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const linkHoverColor = useColorModeValue("gray.800", "white");
  return (
    <Link
      as={NavLink}
      to={href ?? ""}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        color: linkHoverColor,
      }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box _hover={{ bgColor: "white", opacity: "90%", borderRadius: "full", padding: 2 }}>
          <Text transition={"all .2s ease"} _groupHover={{ color: linkHoverColor }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} as={NavLink} to={child.href ?? ""} py={2}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
