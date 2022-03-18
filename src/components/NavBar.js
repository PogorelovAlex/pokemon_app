import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    appBarBg: {
      main: "#f7f7f7",
    },
  },
});

const CustomisedButton = styled(Button)({
  "&.MuiButton-text": {
    fontSize: "25px",
    "&:hover": {
      background: "none",
    },
  },
});

const CustomisedLink = styled(Link)({
  textDecoration: "none",
  color: "primary",
  "&:hover": {
    color: "primary",
  },
});

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="appBarBg" position="sticky">
          <Toolbar>
            <Link to="/">
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <CatchingPokemonIcon fontSize="large" />
              </IconButton>
            </Link>

            <CustomisedButton
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              POKEDEX
            </CustomisedButton>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <CustomisedLink to="/CaugthPokemonsPage">
                {" "}
                <MenuItem onClick={handleClose}>Caught Pokemons Page</MenuItem>
              </CustomisedLink>
              <CustomisedLink to="/">
                <MenuItem onClick={handleClose}>All Pokemons</MenuItem>
              </CustomisedLink>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
