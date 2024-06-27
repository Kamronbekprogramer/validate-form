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
        Main
      </Typography>
      <Typography variant="h6" component="p" sx={{ textAlign: "center" }}>
        Welcome to the main page! Here you can find various features and
        functionalities.
      </Typography>
    </Box>
  );
};

export default Index;
