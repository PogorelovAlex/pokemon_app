import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useContext } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PokemonCardContext } from "../context/PokemonCardContext";

const CustomisedButton = styled(Button)({
  "&.Mui-disabled": {
    backgroundColor: "#B82CDE",
    color: "#ffff",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#B82CDE",
    opacity: 0.7,
  },
  width: "150px",
  height: "40px",
  backgroundColor: "#B82CDE",
  "&:hover": {
    backgroundColor: "#B82CDE",
    opacity: 0.7,
  },
  color: "#ffff",
});

export default function FreeButton() {
  const { toggleFree } = useContext(PokemonCardContext);
  const [isPressed, setIsPressed] = useState(false);
  const freeHandler = () => {
    setIsPressed(!isPressed);
  };
  return (
    <Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CustomisedButton
          disabled={isPressed}
          variant="contained"
          onClick={() => {
            freeHandler();
            toggleFree();
          }}
        >
          {isPressed ? "Free" : "Release"}
        </CustomisedButton>
      </Grid>
    </Grid>
  );
}
