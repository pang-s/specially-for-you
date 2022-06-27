import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const factor = 1.1;
const imgWidth = 220 * factor;
const imgHeight = 326 * factor;

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
            <CardMedia
              component="img"
              height={imgHeight}
              image={this.props.image}
            />
            <CardContent sx={{ height: 400 }}>
              <Typography gutterBottom variant="h5" component="div">
                {this.props.title}
              </Typography>
              <Typography variant="subtitle1" component="legend">
                Audience Average Rating:{" "}
              </Typography>
              <Box>
                <Rating
                  precision={0.5}
                  name="read-only"
                  value={this.props.rating}
                  readOnly
                />
              </Box>

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
