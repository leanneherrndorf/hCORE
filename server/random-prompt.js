module.exports = function randomPrompt() {
  // use string interpoloation `hello ${a.noun} me`
  var struc = [
    "What does " + a(noun()) + " and " + a(noun()) + " have in common?",
    "Why did the " + noun() + " cross the road?",
    "Write a tagline for a movie called Beauty And The " + cap(noun()),
    "On the menu tonight is " + s(noun()) + " with a side of " + noun() + ", what's for dessert?",
    "Your boss is now " + a(noun()) + ", how would they fire you?",
    "Complete the rhyme - I like big " + s(noun()) + " and I cannot lie",
    "You're being attacked by an army of " + s(noun()) + ", how do you defend yourself?",
    "If I was " + a(noun()) + " where would I hide?"];

  var strucRandom = Math.floor(Math.random() * (struc.length));
  return (struc[strucRandom]);
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function a(noun){
  if (noun.charAt(0) === "a" || noun.charAt(0) === "e" || noun.charAt(0) === "i" || noun.charAt(0) === "o" || noun.charAt(0) === "u"){
    return ("an " + noun);
  } else {
    return ("a " + noun);
  }
}

function s(noun){
  if (noun.charAt(noun.length-1) === "s"){
    return (noun + "es");
  } else if (noun.charAt(noun.length-1) === "y"){
    return noun.replaceAt((noun.length-1), "ies");
  } else {
    return (noun + "s");
  }
}

function cap(noun){
  var capChar = noun.charAt(0).toUpperCase();
  return noun.replaceAt(0, capChar);
}

function noun(){
  var noun =
    ["aardvark",
    "anteater",
    "asparagus",
    "baboon",
    "baby",
    "bean",
    "bladder",
    "bottom",
    "boy",
    "bra",
    "butter",
    "cabbage",
    "cactus",
    "cake",
    "camel",
    "carp",
    "caterpillar",
    "catsup",
    "cereal",
    "cheese",
    "chicken",
    "daughter",
    "dentist",
    "disease",
    "donkey",
    "duckling",
    "eel",
    "ex-husband",
    "father",
    "father-in-law",
    "fish",
    "giraffe",
    "goldfish",
    "granddaughter",
    "grandfather",
    "hamburger",
    "hippopotamus",
    "hoe",
    "hole",
    "hyena",
    "kamikaze",
    "kangaroo",
    "kitten",
    "lasagna",
    "lettuce",
    "llama",
    "lobster",
    "locust",
    "lotion",
    "mayonnaise",
    "milk",
    "mother-in-law",
    "mustard",
    "octopus",
    "ostrich",
    "pancake",
    "parsnip",
    "pickle",
    "pig",
    "pigeon",
    "pimple",
    "pumpkin",
    "ravioli",
    "shrimp",
    "spaghetti",
    "squid",
    "step-son",
    "sturgeon",
    "tongue",
    "toothpaste",
    "tuna",
    "turnip",
    "vegetable",
    "yak",
    "yam",
    "yogurt"
  ];

  var nounRandom = Math.floor(Math.random() * (noun.length));
    return (noun[nounRandom]);
  }