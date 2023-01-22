// Questions from https://www.16personalities.com/free-personality-test
const personalisedQuestions = [
  "You like books and movies that make you come up with your own interpretation of the ending.",
  "You feel more drawn to places with busy, bustling atmospheres than quiet, intimate places.",
  "You usually stay calm, even under a lot of pressure.",
  "Seeing other people cry can easily make you feel like you want to cry too.",
  "You enjoy watching people argue.",
  "You become bored or lose interest when the discussion gets highly theoretical.",
  "You are very intrigued by things labeled as controversial.",
  "You often end up doing things at the last possible moment.",
  "After a long and exhausting week, a lively social event is just what you need.",
  "You spend a lot of your free time exploring various random topics that pique your interest."
];

const nonPersonalisedQuestions = [
  "An average person likes books and movies that makes them come up with their own interpretation of the ending.",
  "An average person feels more drawn to places with busy, bustling atmospheres than quiet, intimate places.",
  "An average person usually stays calm, even under a lot of pressure.",
  "Seeing other people cry can easily make an average person feel like they want to cry too.",
  "An average person enjoys watching people argue.",
  "An average person will become bored or lose interest when the discussion gets highly theoretical.",
  "An average person is very intrigued by things labeled as controversial.",
  "An average person often ends up doing things at the last possible moment.",
  "After a long and exhausting week, a lively social event is just what an average person needs.",
  "An average person spends a lot of their free time exploring various random topics that piques their interest."
];

export const surveyQuestions = [
  "The system showed useful recommendations.",
  "I liked the movies recommended by the system.",
  "The recommendations contained a lot of variety.",
  "The recommendations represent mainstream tastes instead of my own.",
  "The recommended movies are familiar to me.",
  "The recommended movies fit my preference.",
  "I am a movie lover.",
];


export function getQuestions(isPersonalised) {
  if (isPersonalised) {
    return personalisedQuestions;
  }

  return nonPersonalisedQuestions;
}
