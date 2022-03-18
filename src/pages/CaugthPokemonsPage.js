import React from "react";
import { useContext } from "react";
import { Grid } from "@mui/material";
import PokemonCard from "../components/PokemonCard";

import { Context } from "../context/Context";
import { PokemonCardContext } from "../context/PokemonCardContext";
import FreeButton from "../components/FreeButton";

export default function CaughtPokemonPage() {
  const { caughtPokemons, setCaughtPokemons } = useContext(Context);

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
        {caughtPokemons.map((p) => (
          <Grid
            key={`${p.data.id}-${p.data.name}`}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PokemonCardContext.Provider
              value={{
                name: p.data.name,
                img: p.data.sprites.other["official-artwork"].front_default,
                id: p.data.id,
                date: p.date,
                freeButton: <FreeButton />,
                toggleFree: () => {
                  const index = caughtPokemons.indexOf(p);
                  caughtPokemons.splice(index, 1);
                  setCaughtPokemons([
                    ...caughtPokemons,
                    { ...p, isCaught: false },
                  ]);
                  setCaughtPokemons(
                    caughtPokemons.filter((p) => p.isCaught === true)
                  );
                },
              }}
            >
              <PokemonCard />
            </PokemonCardContext.Provider>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
