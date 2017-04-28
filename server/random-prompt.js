module.exports = function randomPrompt() {
  // use string interpoloation `hello ${a.noun} me`
  var struc = [
    "Your boss is now " + a(noun()) + ", how would they fire you?",
    "You're being attacked by an army of " + s(noun()) + ", how do you defend yourself?",
    "Write the script for Star Wars Episode 9: Return Of The " + cap(noun()),
    "Your house is now full of " + s(noun()) + ", how do you get them out?",
    "Give an elevator pitch for a movie called Passion Of The " + cap(noun()),
    "How would you use " + a(noun()) + " to smuggle " + s(noun()) + " across the border?",
     A(noun()) + " and " + a(noun()) + " are on a dinner date, who pays the bill?",
     "Who would win in a fight, " + a(noun()) + " or " + a(noun()) + " and why?",
     "You're on a hunt for a rare " + noun() + ", how do lure and capture them?",
     "What's the best way to impress " + a(noun()) + " on a date?",
     A(noun()) + " and " + a(noun()) + " are having a lovers quarrel, what are they fighting about?",
     "How does an omnipotent " + noun() + ", with an unquenchable hatred for humanity, torture it's prisoners for all of eternity?",
     "Your arm has been transformed into " + a(noun()) + ", what's the first thing you do with your new appendage?",
     "Everytime you sneeze " + a(noun()) + " comes out, how do you turn this into a business opportunity?",
     "You've been cursed to sweat liquified " + s(noun()) + ", how do you explain the strange aroma to a blind man?",
     "You're a mad scientist and you've just sewn " + a(noun()) + " to " + a(noun()) + ", what do you name your beautiful creation?",
     "You've been commissioned to give " + a(noun()) + " a big ole spook, how do you do it?"
     ];

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

function A(noun){
  if (noun.charAt(0) === "a" || noun.charAt(0) === "e" || noun.charAt(0) === "i" || noun.charAt(0) === "o" || noun.charAt(0) === "u"){
    return ("An " + noun);
  } else {
    return ("A " + noun);
  }
}

function s(noun){
  if (noun.charAt(noun.length-1) === "s"){
    return (noun + "es");
  } else {
    return (noun + "s");
  }
}

function cap(noun){
  if (noun === "spooky scary skeleton") {
    return "Spooky Scary Skeletons";
  } else if (noun === "spray cheese") {  
    return "Spray Cheese";
  } else {
    var capChar = noun.charAt(0).toUpperCase();
    return noun.replaceAt(0, capChar);
  }
}

function noun(){
  var noun =
    ["anteater",
    "asparagus",
    "baboon",
    "bean",
    "bladder",
    "boy",
    "cabbage",
    "cactus",
    "cake",
    "camel",
    "carp",
    "snake",
    "doggo",
    "pupper",    
    "caterpillar",
    "chicken",
    "spray cheese",
    "dentist",
    "donkey",
    "duckling",
    "ex-husband",
    "fish",
    "giraffe",
    "goldfish",
    "hamburger",
    "hippopotamus",
    "hyena",
    "llama",
    "lobster",
    "mayonnaise",
    "mustard",
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
    "sturgeon",
    "tongue",
    "turnip",
    "yak",
    "yam",
    "spooky scary skeleton",
    "egg",
    "jellyroll",
    "weenus"
  ];

  var nounRandom = Math.floor(Math.random() * (noun.length));
    return (noun[nounRandom]);
  }