import * as React from 'react';
import Box from '@mui/material/Box';

export class IntroPage extends React.Component {
    render() {
        return (
            <div>
                <Box p={2}>
                    {/* <Typography variant="h3">Recommendation system</Typography> */}
                        Welcome! 
                        <br></br>
                        Your task is to interact with our recommendation system.
                        <br></br>
                        This will be done in two parts.
                        <br></br>
                        <br></br>
                        <b>Part 1</b>
                        <br></br>
                        The recommendation system will recommend you movies.
                        <ol>
                            <li>Complete a questionnaire</li>
                            <li>View a set of movie recommendations</li>
                            <li>Rate the movie recommendations.</li>
                        </ol>
                        <b>Part 2</b>
                        <br></br>
                        The recommendation system will recommend your mouse movement rate.
                        <ol>
                            <li>Complete a mouse-pointing task</li>
                            <li>Repeat mouse-pointing task</li>
                            <li>Rate the recommended the mouse movement rate.</li>
                        </ol>
                        <br></br>
                        Press next to begin Part 1.
                </Box>
                <Box p={2}>{this.props.nextButton}</Box>
            </div>
        );
    }

}

export default IntroPage;