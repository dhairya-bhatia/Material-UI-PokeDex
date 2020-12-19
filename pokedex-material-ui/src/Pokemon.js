import React, { useState, useEffect } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  pokemonContainer: {
    color: "green",
    textAlign: "center",
    justifyContent: "center",
  },
  pokemonImage: {
    transition: "all .4s ease-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  backBtnContainer: {
    marginTop: "10px",
    textAlign: "center",
  },
});

const Pokemon = (props) => {
  const classes = useStyles();
  const { history } = props;
  const { pokemonId } = props.match.params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => {
        const { data } = response;
        setPokemon(data);
      })
      .catch((error) => {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonData = () => {
    const { name, species, height, types, weight, sprites } = pokemon;
    const { front_default } = sprites;
    const full_image_url = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`;

    return (
      <div className={classes.pokemonContainer}>
        <Typography variant="h2">
          {`${pokemonId}: ${name}`}
          <img src={front_default} alt="Pokemon Small" />
        </Typography>
        <img
          width="400"
          height="400"
          className={classes.pokemonImage}
          src={full_image_url}
          alt="Pokemon Big"
        />
        <Typography variant="h3">Pokemon Info : </Typography>
        <Typography variant="h5">
          Species <Link href={species.url}>{species.name}</Link>
        </Typography>
        <Typography variant="h5">Weight: {weight}</Typography>
        <Typography variant="h5">Height: {height}</Typography>
        <Typography variant="h5">
          Types:
          {types.map((typeInfo) => {
            const { name } = typeInfo.type;
            return (
              <Typography color="textSecondary" key={name}>
                {name}
              </Typography>
            );
          })}
        </Typography>
      </div>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonData()}
      {pokemon === false && (
        <Typography align="center" variant="h4">
          {" "}
          Pokemon not found !
        </Typography>
      )}
      <div className={classes.backBtnContainer}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push("/")}
        >
          Back to Pokedex
        </Button>
      </div>
    </>
  );
};

export default Pokemon;
