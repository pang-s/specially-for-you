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
  "You spend a lot of your free time exploring various random topics that pique your interest.",
  // "You often make a backup plan for a backup plan.",
  // "At social events, you rarely try to introduce yourself to new people and mostly talk to the ones you already know.",
  // "You prefer to completely finish one project before starting another.",
  // "You are very sentimental.",
  // "You like to use organizing tools like schedules and lists.",
  // "Even a small mistake can cause you to doubt your overall abilities and knowledge.",
  // "You feel comfortable just walking up to someone you find interesting and striking up a conversation.",
  // "You enjoy going to art museums.",
  // "You are more inclined to follow your head than your heart.",
  // "You usually prefer just doing what you feel like at any given moment instead of planning a particular daily routine.",
  // "You rarely worry about whether you make a good impression on people you meet.",
  // "You enjoy participating in group activities.",
  // "Your happiness comes more from helping others accomplish things than your own accomplishments.",
  // "You are interested in so many things that you find it difficult to choose what to try next.",
  // "You are prone to worrying that things will take a turn for the worse.",
  // "You avoid leadership roles in group settings.",
  // "You think the world would be a better place if people relied more on rationality and less on their feelings.",
  // "You prefer to do your chores before allowing yourself to relax.",
  // "You tend to avoid drawing attention to yourself.",
  // "Your mood can change very quickly.",
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
  "An average person spends a lot of their free time exploring various random topics that piques their interest.",
  // "An average person often makes a backup plan for a backup plan.",
  // "At social events, an average person rarely tries to introduce themself to new people and mostly talk to the ones they already know.",
  // "An average person prefers to completely finish one project before starting another.",
  // "An average person is very sentimental.",
  // "An average person likes to use organizing tools like schedules and lists.",
  // "Even a small mistake can cause an average person to doubt their overall abilities and knowledge.",
  // "An average person feels comfortable just walking up to someone they find interesting and striking up a conversation.",
  // "An average person enjoys going to art museums.",
  // "An average person is more inclined to follow their head than their heart.",
  // "An average person usually prefers just doing what they feel like at any given moment instead of planning a particular daily routine.",
  // "An average person rarely worries about whether they make a good impression on people they meet.",
  // "An average person enjoys participating in group activities.",
  // "An average person's happiness comes more from helping others accomplish things than their own accomplishments.",
  // "An average person is interested in so many things that they find it difficult to choose what to try next.",
  // "An average person are prone to worrying that things will take a turn for the worse.",
  // "An average person avoid leadership roles in group settings.",
  // "An average person thinks the world would be a better place if people relied more on rationality and less on their feelings.",
  // "An average person prefers to do their chores before allowing themself to relax.",
  // "An average person tends to avoid drawing attention to themself.",
  // "An average person's mood can change very quickly.",
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
