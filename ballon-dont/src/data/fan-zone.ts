export const PRONOSTICS = [
  {
    slug: "mens-winner",
    title: "Who lifts the rust ball?",
    prompt: "Pick the Men's Ballon D'ont winner.",
    options: ["Jordan Ayew", "Cristiano Ronaldo", "Jadon Sancho", "Franco Mastantuono"],
  },
  {
    slug: "yashit-winner",
    title: "Who lifts the Yashit?",
    prompt: "One flap. One trophy.",
    options: ["Guglielmo Vicario", "Robert Sanchez", "Luca Zidane", "Altay Bayindir"],
  },
  {
    slug: "club-winner",
    title: "Which crest struck no fear?",
    prompt: "Club Struck No Fear.",
    options: ["Chelsea", "Tottenham Hotshit", "Real Madrid", "Juventus"],
  },
  {
    slug: "coach-winner",
    title: "Which bench takes Coach of the Year?",
    prompt: "They chose the sub.",
    options: ["Dr. Rosenior", "Arne Slot", "Ruben Amorim", "Thomas Frank"],
  },
];

export const CLASSIC_QUIZ = [
  {
    slug: "ayew-age",
    question: "How old is Jordan Ayew on the flyer?",
    options: ["34", "41", "76", "Still running"],
    answer: 2,
  },
  {
    slug: "sancho-club",
    question: "What club did Hater Central print for Jadon Sancho?",
    options: ["Chelsea", "LinkedIn", "Borussia Dortmund", "Unemployed FC"],
    answer: 1,
  },
  {
    slug: "sorloth-job",
    question: "Alexander Sørloths is listed as a…",
    options: ["Striker", "Truck", "False nine", "Delivery driver"],
    answer: 1,
  },
  {
    slug: "tottenham-name",
    question: "The club flyer does not say Tottenham Hotspur. It says…",
    options: ["Spurs", "Tottenham Hotshit", "The Lilywhites", "North London"],
    answer: 1,
  },
];

export const EITHER_OR = [
  {
    slug: "ayew-ronaldo",
    title: "Who bottled the bigger night?",
    left: "Jordan Ayew",
    right: "Cristiano Ronaldo",
  },
  {
    slug: "sancho-garnacho",
    title: "Who is more open to work?",
    left: "Jadon Sancho",
    right: "Alejandro Garnacho",
  },
  {
    slug: "slot-amorim",
    title: "Which sequel year was louder?",
    left: "Arne Slot",
    right: "Ruben Amorim",
  },
];

export const PERSONALITY = [
  {
    slug: "q1",
    question: "A chance arrives. You…",
    options: [
      { label: "Point at space that is not there", result: "Alexander Isak" },
      { label: "Wrestle the defender and miss", result: "Liam Delap" },
      { label: "Post the clip before the shot", result: "Jeremie Frimpong" },
      { label: "Ask for the ball in 2031", result: "Cristiano Ronaldo" },
    ],
  },
  {
    slug: "q2",
    question: "Your club line on the flyer should read…",
    options: [
      { label: "LinkedIn", result: "Jadon Sancho" },
      { label: "Arsenal Opponents", result: "Noni Madueke" },
      { label: "The surname", result: "Luca Zidane" },
      { label: "Tottenham / Juventus", result: "Randal Kolo Muani" },
    ],
  },
  {
    slug: "q3",
    question: "Your official position is…",
    options: [
      { label: "Defensive Forward", result: "Jordan Ayew" },
      { label: "False Ballboy", result: "Eduardo Camavinga" },
      { label: "Pitch Invader", result: "Franco Mastantuono" },
      { label: "N/A", result: "Leon Goretzka" },
    ],
  },
];
