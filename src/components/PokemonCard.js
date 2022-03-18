import React from "react";
import { useContext} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { PokemonCardContext } from "../context/PokemonCardContext";


const cardImg = {
  width: "12rem",
  height: "12rem",
};
const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default function PokemonCard(props) {
  const { id,freeButton, catchButton, name, date, img} =
    useContext(PokemonCardContext);
    
   
  return (
    <Grid>
      <Card
        sx={{
          maxWidth: 345,
          margin: "30px 20px 30px 20px",
        }}
        elevation={4}
      >
        <CardActionArea>
          <StyledLink to={`/${id}`}>
            <CardMedia sx={{
              display:"flex",
              justifyContent:"center"
            }}>
              <img style={cardImg} src={img} alt={name} />
            </CardMedia>

            <CardContent>
              <Typography
                textAlign="center"
                color="#706868"
                gutterBottom
                variant="h5"
                component="div"
              >
                {name}
              </Typography>
              <Typography
                textAlign="center"
                color="#989898"
                gutterBottom
                variant="h6"
                component="div"
              >
                {`ID:${id}`}
              </Typography>
            </CardContent>
          </StyledLink>
        </CardActionArea>

        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {date?freeButton:catchButton}
        </CardActions>
        {date && (
          <CardContent>
            <Typography
              textAlign="center"
              color="#706868"
              gutterBottom
              variant="h7"
              component="div"
            >
              {date}
            </Typography>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
}
