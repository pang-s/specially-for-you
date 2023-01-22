# About the Project
This is the experiment source code for the paper "Specially For You' -- Examining the Barnum Effect's Influence on the Perceived Quality of System Recommendations".

The paper is available at https://doi.org/10.1145/3544548.3580656.


## Prerequisites
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

You may need to install node and npm [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Getting Started
1. In the project directory, you can run `npm start`
2. The app open in the web browser (typically at http://localhost:3000/) saying `Configuration needs to be set up...'
3. Change the URL to one the following to start the experiment
- Non personalised, bad movies	http://localhost:3000/?devUserId=1&p=1
- Non personalised, good movies	http://localhost:3000/?devUserId=1&p=2
- Personalised, bad movies	http://localhost:3000/?devUserId=2&p=3
- Personalised, good movies	http://localhost:3000/?devUserId=2&p=4