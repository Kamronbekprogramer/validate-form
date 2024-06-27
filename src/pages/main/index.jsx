import React from "react";
import { Box, Typography } from "@mui/material";

const Index = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Typography variant="h1" component="h1" sx={{ mb: 4 }}>
        Salom!
      </Typography>
      <Typography variant="h6" component="p" sx={{ textAlign: "center" }}>
        Himchestka.uz saytiga hush kelibsiz!
      </Typography>
    </Box>
  );
};

export default Index;
