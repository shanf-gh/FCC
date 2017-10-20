// Quotes' source: https://www.forbes.com/sites/kevinkruse/2013/05/28/inspirational-quotes/#769b9d256c7a
var quotes = [
  {quote: "Life is about making an impact, not making an income.", author: "Kevin Kruse"},
  {quote: "Whatever the mind of man can conceive and believe, it can achieve.", author: "Napoleon Hill"},
  {quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein"},
  {quote: "I attribute my success to this: I never gave or took any excuse.", author: "Florence Nightingale"},
  {quote: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky"},
  {quote: "The most difficult thing is the decision to act, the rest is merely tenacity.", author: "Amelia Earhart"},
  {quote: "Every strike brings me closer to the next home run.", author: "Babe Ruth"},
  {quote: "Definiteness of purpose is the starting point of all achievement.", author: "W. Clement Stone"},
  {quote: "Life isn't about getting and having, it's about giving and being.", author: "Kevin Kruse"},
  {quote: "Life is what happens to you while you’re busy making other plans.", author: "John Lennon"},
  {quote: "We become what we think about.", author: "Earl Nightingale"},
  {quote: "Life is 10% what happens to me and 90% of how I react to it.", author: "Charles Swindoll"},
  {quote: "The most common way people give up their power is by thinking they don’t have any.", author: "Alice Walker"},
  {quote: "The mind is everything. What you think you become.", author: "Buddha"},
  {quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb"},
  {quote: "An unexamined life is not worth living.", author: "Socrates"},
  {quote: "Eighty percent of success is showing up.", author: "Woody Allen"},
  {quote: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs"},
  {quote: "Winning isn’t everything, but wanting to win is.", author: "Vince Lombardi"},
  {quote: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey"},
  {quote: "You can never cross the ocean until you have the courage to lose sight of the shore.", author: "Christopher Columbus"},
  {quote: "Every child is an artist.  The problem is how to remain an artist once he grows up.", author: "Pablo Picasso"}
]

// List modified from https://gist.github.com/bobspace/2712980
var CSS_COLOR_NAMES = [
  "Black", "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chocolate","Coral","CornflowerBlue",
  "Crimson","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen",
  "Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise",
  "DarkViolet","DeepPink","DeepSkyBlue",
];

/*
  var CSS_COLOR_NAMES = [
    "AliceBlue","Black", "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chocolate","Coral","CornflowerBlue",
    "Crimson","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen",
    "Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise",
    "DarkViolet","DeepPink","DeepSkyBlue",

    // Not filtered
    "DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite",
    "Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory",
    "Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
    "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen",
    "LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen",
    "Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue",
    "MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin",
    "NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
    "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red",
    "RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue",
    "SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise",
    "Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
    */

window.onLoad = newQuote();

function newQuote() {
  var randomNumber = Math.floor(Math.random() * (quotes.length));

  document.getElementById("quoteHolder").innerHTML = quotes[randomNumber].quote;
  document.getElementById("author").innerHTML = quotes[randomNumber].author;
  setColor();
}

function setColor() {
  var randomNumber = Math.floor(Math.random() * (CSS_COLOR_NAMES.length));
  document.documentElement.style.setProperty(`--color`, CSS_COLOR_NAMES[randomNumber]);
}

function tweetIt() {
    var phrase = document.getElementById("quoteHolder").innerHTML;
    var author =  document.getElementById("author").innerHTML;
    if (phrase.length != 0) {
      var tweetUrl = 'https://twitter.com/intent/tweet?hashtags=quotes&text="' + encodeURIComponent(phrase) + '"' + encodeURIComponent(" —" + author);
      window.open(tweetUrl);
    }
}
