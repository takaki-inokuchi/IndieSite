import { Box, Stack, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box bg="teal.600" color="white" py={4}>
      <Stack justify="center" align="center">
        <Text>© 2025 IndieSite. All rights reserved.</Text>
      </Stack>
    </Box>
  );
};
