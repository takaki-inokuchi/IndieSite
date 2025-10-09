import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        field: {
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
        },
      },
    },
  },
});

export default theme;
