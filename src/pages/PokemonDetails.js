import React from "react";
import { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { Context } from "../context/Context";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

const cardImg = {
  width: "12rem",
  height: "12rem",
};

export default function PokemonDetails() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { pokemon, caughtPokemons } = useContext(Context);
  const { id } = useParams();
  const [name, setName] = useState();
  const [img, setImg] = useState();
  const [abilities, setAbilities] = useState();
  const [types, setTypes] = useState();
  const [weight, setWeight] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
      setName(response.data.name);
      setImg(response.data.sprites.other["official-artwork"].front_default);
      setAbilities(response.data.abilities[0].ability.name);
      setTypes(response.data.types[0].type.name);
      setWeight(response.data.weight);
    });
  }, []);
  useEffect(() => {
    caughtPokemons.map((p) => {
      if (id === p.data.id.toString()) {
        setDate(p.date);
      }
    });
  }, [id]);

  return (
    <Grid sx={{ display: "flex", justifyContent: "center" }}>
      {}
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: "650px",
          minWidth: "300px",
          minHeight: "350px",
          margin: "30px 20px 30px 20px",
        }}
        elevation={4}
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: matches ? "row" : "column",
            justifyContent: "center",
          }}
          disabled={true}
        >
          <CardMedia>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <img style={cardImg} src={img} alt={pokemon.name} />
            </Grid>
          </CardMedia>
          <CardContent>
            <Typography
              textAlign="center"
              color="#706868"
              gutterBottom
              variant="h4"
              component="div"
            >
              {name}
            </Typography>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                disabled={true}
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#c87fe3",
                    color: "#ffff",
                    width: "250px",
                    height: "40px",
                  },
                }}
              >
                Pokemon ID: {id}
              </Button>
              <Button
                variant="contained"
                disabled={true}
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#fccb17",
                    color: "#ffff",
                    width: "250px",
                    height: "40px",
                  },
                }}
              >
                Abilities: {abilities}
              </Button>
              <Button
                variant="contained"
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#43bf66",
                    color: "#ffff",
                    width: "250px",
                    height: "40px",
                  },
                }}
                disabled={true}
              >
                Type: {types}
              </Button>
              <Button
                variant="contained"
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#bf4d0b",
                    color: "#ffff",
                    width: "250px",
                    height: "40px",
                  },
                }}
                disabled={true}
              >
                Weight: {weight}
              </Button>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {" "}
        </CardActions>
        <CardContent>
          {" "}
          <Typography
            textAlign="center"
            color="#706868"
            gutterBottom
            variant="h5"
            component="div"
          >
            {date
              ? `Pokemon is caught : 
          ${date}`
              : `Pokemon is free`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
