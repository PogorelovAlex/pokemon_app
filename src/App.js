import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AllPokemonsPage from "./pages/AllPokemonsPage";
import CaugthPokemonsPage from "./pages/CaugthPokemonsPage";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import PokemonDetails from "./pages/PokemonDetails";
import { Context } from "./context/Context";

function App() {
  const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon";

  const [fetching, setFetching] = useState(true);
  const [pokemonNextUrl, setPokemonNextUrl] = useState(pokemonApiUrl);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemon, setPokemon] = useState([]);
  const [caughtPokemons, setCaughtPokemons] = useState([]);

  useEffect(() => {
    if (fetching) {
      axios
        .get(`${pokemonNextUrl}?_page=${currentPage}&_limit=20`)
        .then((response) => {
          let results = response.data.results;
          setPokemonNextUrl(response.data.next);
          let promisesArray = results.map((result) => {
            return axios.get(result.url);
          });
          return Promise.all(promisesArray);
        })
        .then((data) => {
          const additinalData = data.map((item) => {
            return { ...item, isCaught: false };
          });

          setPokemon([...pokemon, ...additinalData]);
        });

      setCurrentPage((prevPage) => prevPage + 1);
      setFetching(false);
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  return (
    <div>
      <Context.Provider
        value={{
          pokemon,
          setPokemon,
          caughtPokemons,
          setCaughtPokemons,
        }}
      >
        <NavBar />

        <Routes>
          <Route path="/" exact element={<AllPokemonsPage />} />
          <Route path="/:id" element={<PokemonDetails />} />
          <Route
            exact
            path="/CaugthPokemonsPage"
            element={<CaugthPokemonsPage />}
          />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
