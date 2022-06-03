import * as React from "react";
import Box from "@mui/material/Box";

export class IntroPage extends React.Component {
  render() {
    return (
      <div>
        <Box p={2}>
          Welcome!
          <br></br>
          This experiment will be done in two parts.
          <br></br>
          <br></br>
          <b>Part 1: Movies</b>
          <br></br>
          <ol>
            <li>Complete a questionnaire</li>
            <li>View a set of movie recommendations</li>
            <li>Rate the movie recommendations.</li>
          </ol>
          <b>Part 2: Mouse pointing</b>
          <br></br>
          
          <br></br>
          <ol>
            <li>Complete a mouse-pointing task</li>
            <li>Repeat the mouse-pointing task</li>
            <li>Rate the pointer acceleration (how fast the cursor moves in response to mouse movement).</li>
          </ol>
          <br></br>
          Click "NEXT" to begin Part 1.
        </Box>
        <Box p={2}>{this.props.nextButton}</Box>
      </div>
    );
  }
}

export default IntroPage;
