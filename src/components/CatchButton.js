import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useContext } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PokemonCardContext } from "../context/PokemonCardContext";

const CustomisedButton = styled(Button)({
  "&.Mui-disabled": {
    backgroundColor: "#fccb17",
    color: "#ffff",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#fccb17",
    opacity: 0.7,
  },
  width: "150px",
  height: "40px",
  backgroundColor: "#428eff",
  "&:hover": {
    backgroundColor: "#428eff",
    opacity: 0.7,
  },
  color: "#ffff",
});

export default function CatchButton() {
  const { toggleCatch } = useContext(PokemonCardContext);
  const [isPressed, setIsPressed] = useState(false);
  const catchHandler = () => {
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
            catchHandler();
            toggleCatch();
          }}
        >
          {isPressed ? "Caught" : "Catch"}
        </CustomisedButton>
      </Grid>
    </Grid>
  );
}
