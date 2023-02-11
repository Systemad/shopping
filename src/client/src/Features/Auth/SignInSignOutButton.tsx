import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { loginRequest } from "./Authconfig";

export const SignInSignOutButton = () => {
  const { instance, inProgress } = useMsal();

  const handleLogin = () => instance.loginRedirect(loginRequest);
  const handleLogout = () => instance.logoutRedirect();

  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      {isAuthenticated && (
        <Menu>
          <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
            <Avatar
              size={"md"}
              src={
                "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
          </MenuButton>
          <MenuList>
            <MenuItem>Wishlist</MenuItem>
            <MenuDivider />
            <MenuItem>
              <Button w="full" variant="auth" onClick={handleLogout}>
                Sign out
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      {!isAuthenticated && (
        <Button variant="auth" onClick={handleLogin} display={{ base: "none", md: "inline-flex" }}>
          Sign In
        </Button>
      )}
    </>
  );
};

/*
        <Button
          onClick={handleLogin}
          display={{ base: "none", md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"pink.400"}
          _hover={{
            bg: "pink.300",
          }}
        >
          Sign In
        </Button>
*/

/*
        <Button onClick={handleLogout} as={"a"} fontSize={"sm"} fontWeight={400}>
          Sign out
        </Button>
*/
