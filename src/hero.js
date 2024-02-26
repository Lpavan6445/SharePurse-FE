import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Wrapper({ children }) {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundSize: "100% 40%",
        backgroundRepeat: "no-repeat",
        backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)',
        minHeight: '100vh'
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
            spacing={2} 
            useFlexGap 
            sx={{ width: "100%" }}
        >
         {children}
        </Stack>
      </Container>
    </Box>
  );
}
