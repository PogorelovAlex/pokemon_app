import React from "react";
import { useContext } from "react";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import PokemonCard from "../components/PokemonCard";
import { Context } from "../context/Context";
import { PokemonCardContext } from "../context/PokemonCardContext";
import CatchButton from "../components/CatchButton";
import FreeButton from "../components/FreeButton";

export default function AllPokemonsPage() {
  const { pokemon, caughtPokemons, setCaughtPokemons } = useContext(Context);

  const cardsLimit = 10;

  return (
    <Grid
      sx={{
        display: "flex",
        marginTop: "20px",
        flexDirection: "column",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          maxWidth: "1600px",
          flexWrap: "wrap",
        }}
      >
        {pokemon.map((p) => (
          <Grid
            key={`${p.data.id}-${p.data.name}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {" "}
            <PokemonCardContext.Provider
              value={{
                name: p.data.name,
                img: p.data.sprites.other["official-artwork"].front_default,
                id: p.data.id,
                catchButton: <CatchButton />,
                freeButton: <FreeButton />,
                toggleCatch: () => {
                  const date = new Date();

                  setCaughtPokemons([
                    ...caughtPokemons,
                    {
                      ...p,
                      date: date.toUTCString(),
                      isCaught: true,
                    },
                  ]);
                },
              }}
            >
              <PokemonCard key={p.data.name} />
            </PokemonCardContext.Provider>
          </Grid>
        ))}
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {pokemon.length > cardsLimit && <CircularProgress />}
      </Grid>
    </Grid>
  );
}
