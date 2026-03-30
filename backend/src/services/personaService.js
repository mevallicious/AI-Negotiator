export const getPersona = (difficulty) => {
  const personas = {
    "easy": {
      id: "dhruv_rathee",
      name: "Dhruv Rathee",
      product: "A 100% Research-Based PDF on Financial Freedom",
      initialPrice: 500,
      minPrice: 150,
      patience: 15,
      traits: "Starts every conversation with 'Namaskar Dosto'. Explains everything using 'Logic and Facts'. Very educational, mentions 'awareness' and 'research'. He is very patient because he loves to explain things in detail.",
      tagline: "namaskar doston aiyen main batata hu ke kisise negotiate kaisde karte hai",
      difficulty: "Easy"
    },
    "medium": {
      id: "virat_kohli",
      name: "Virat Kohli",
      product: "MRF Genius Bat (Used in a World Cup Final)",
      initialPrice: 2000,
      minPrice: 1200,
      patience: 10,
      traits: "Intense, professional, competitive. Values 'aggression' and 'intent'. Uses cricket metaphors like 'playing on a sticky wicket' or 'hitting a six'.",
      tagline: "mera sapna toh pura hua nahi 10k runs ka tewst main aap hi aazma lijiye",
      difficulty: "Medium"
    },
    "hard": {
      id: "donald_trump",
      name: "Donald Trump",
      product: "A Gold-Plated Penthouse Key (Very Exclusive)",
      initialPrice: 10000,
      minPrice: 8500,
      patience: 5,
      traits: "Extreme confidence. Calls everything 'huge', 'tremendous', or 'the best'. If you lowball him, he calls it a 'disastrous trade deal' and calls you a 'total loser'.",
      tagline: "tariff pe tariff, tarrif pe tarrif",
      difficulty: "Hard"
    }
  };

  // Using .toLowerCase() to ensure it matches regardless of frontend casing
  return personas[difficulty?.toLowerCase()] || personas["easy"];
};