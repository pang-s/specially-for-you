import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

const movies = [
  {
    name: "The Imitation Game (2014)",
    desc: "Alan Turing, a British mathematician, joins the cryptography team to decipher the German enigma code. With the help of his fellow mathematicians, he builds a machine to crack the codes.",
    image: require("../../assets/imitation.jpg"),
  },
  {
    name: "The Dark Knight (2008)",
    desc: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: require("../../assets/dark.jpg"),
  },
  {
    name: "Spirited Away (2001)",
    desc: "Ten-year-old Chihiro and her parents end up at an abandoned amusement park inhabited by supernatural beings. Soon, she learns that she must work to free her parents who have been turned into pigs.",
    image: require("../../assets/spirited.jpg"),
  },
  {
    name: "The Lion King (2019)",
    desc: "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    image: require("../../assets/lion.jpg"),
  },
  {
    name: "Shrek (2001)",
    desc: "Shrek, an ogre, embarks on a journey with a donkey to rescue Princess Fiona from a vile lord and regain his swamp.",
    image: require("../../assets/shrek.jpg"),
  },
  {
    name: "Parasite (2019)",
    desc: "The struggling Kim family sees an opportunity when the son starts working for the wealthy Park family. Soon, all of them find a way to work within the same household and start living a parasitic life.",
    image: require("../../assets/parasite.jpg"),
  },
];

class MoviePage extends React.Component {

  render() {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Top Picks
        </Typography>
        <List disablePadding>
          {movies.map((product) => (
            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
              <Box m={1}>
                <img src={product.image} alt={product.name} width="100px" />
              </Box>
              <ListItemText primary={product.name} secondary={product.desc} />
            </ListItem>
          ))}
        </List>
        <Box p={2}>{this.props.nextButton}</Box>
      </div>
    );
  }
}

export default MoviePage;
