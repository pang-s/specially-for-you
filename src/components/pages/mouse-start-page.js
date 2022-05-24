import * as React from 'react';
import Box from '@mui/material/Box';

export class MouseStartPage extends React.Component {
    render() {
        return (
            <div>
                <Box p={2}>
                        You have finished part 1 of the experiment.
                        <br></br>
                        <br></br>
                        <b>Part 2 instructions:</b>
                        <br></br>
                        When you are ready, click the green column target. 
                        Once you have clicked it, the column will jump to the opposite side. 
                        The column position will repeatedly swap until the trial is complete. 
                        Do this as quickly as you can until it has finished. 
                        Every so often during the experiment the column width and the distance between them will change randomly. 
                        There are eight trials, and each trial requires eleven successful clicks. 
                        The exercise should take around 30 seconds to one minute (but don't be worried if you need longer!)
                        <br></br>
                        <br></br>
                        Press next to start.
                </Box>
                <Box p={2}>{this.props.nextButton}</Box>
            </div>
        );
    }

}

export default MouseStartPage;