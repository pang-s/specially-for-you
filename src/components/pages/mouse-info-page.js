import * as React from 'react';
import Box from '@mui/material/Box';

export class MouseInfoPage extends React.Component {
    render() {
        return (
            <div>
                <Box p={2}>
                    The system has optimised pointer acceleration based on your pointing performance.
                    Next, you will repeat the same task with this optimisation.
                    Press next to continue.
                </Box>
                <Box p={2}>{this.props.nextButton}</Box>
            </div>
        );
    }

}

export default MouseInfoPage;