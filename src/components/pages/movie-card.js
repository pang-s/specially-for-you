import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";

const imgWidth = 220*1.1;
const imgHeight = 326*1.1;

export class MovieCard extends React.Component {
  render() {
    return (
      <Box
        sx={{
          m: 1,
        }}
      >
        <Card sx={{ maxWidth: imgWidth }}>
          <CardActionArea>
            <CardMedia component="img" height={imgHeight} image={this.props.image} />
            <CardContent sx={{ height: 320 }}>
              <Typography gutterBottom variant="h5" component="div">
                {this.props.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {this.props.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    );
  }
}
