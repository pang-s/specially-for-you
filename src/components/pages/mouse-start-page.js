import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export class MouseStartPage extends React.Component {
    render() {
        return (
            <div>
                <Box p={2}>
                <Typography variant="h5">

                        You have finished part 1 of the experiment.
                        <br></br>
                        <br></br>
                        <b>Part 2 instructions:</b>
                        <br></br>
                        Click anywhere on the green column target as quickly and accurately as possible.
                        <br></br>
                        The task should take about 30 seconds.

                        <br></br>
                        <br></br>                        </Typography>

                        Click "NEXT" to start.
                </Box>
                <Box p={2}>{this.props.nextButton}</Box>
            </div>
        );
    }

}

export default MouseStartPage;