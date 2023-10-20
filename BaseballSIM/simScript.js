//GLOBALS

//true is false of inning, true is bottom of inning
var halfInning = true;
var prevScored = 0;
var gameStarted = false;
var battingOrderHome = [];
var battingOrderAway = [];
var baCounterHome = 0;
var baCounterAway = 0;
var currentBattingOrder;
var pitcher, batter;
var pitcherHome, pitcherAway;
var inningWords = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
];
var homeScore = 0;
var awayScore = 0;
var outs = 0;
var scoredInHalf = 0;

var scored = 0;
var started = false;
var bases = {
  first: false,
  second: false,
  third: false,
};
var inningsPlayed = 0;

async function callAgain() {
  if (inningsPlayed < 17) {
    inningsPlayed++;
    inning();
  } else if (inningsPlayed == 17) {
    inningsPlayed++;
    endGame();
  } else if (inningsPlayed == 34) {
    removePreviousText();
    addText(
      "The players decided they were tired of playing and went out for beers"
    );
  } else {
    inningsPlayed++;
    endGame();
  }
}

function endGame() {
  if (homeScore == awayScore) {
    inning();
  } else if (awayScore > homeScore && inningsPlayed > 17) {
    if (halfInning == true) {
      removePreviousText();
      addText("Away Team Wins");
    } else {
      inning();
    }
  } else if (awayScore > homeScore) {
    removePreviousText();
    addText("Away Team Wins");
  } else if (homeScore > awayScore) {
    removePreviousText();
    addText("Home Team Wins");
  }
}
//******************************************************\\
//******************************************************\\
//******************************************************\\

async function inning() {
  //Assigns home and away pitchers from local storage
  //Check to see which half of the inning it is, use counters to find correct spot in batting order

  if (halfInning == true && inningsPlayed == 0) {
    setPitchers();
    pitcher = pitcherHome;
    currentBattingOrder = battingOrderAway;
    batter = battingOrderAway[baCounterAway % 9];
    halfInning = false;
  } else if (halfInning == true) {
    setPitchers();
    pitcher = pitcherHome;
    currentBattingOrder = battingOrderAway;
    setBatter(battingOrderAway[baCounterAway % 9]);
    halfInning = false;
  } else {
    setPitchers();
    pitcher = pitcherAway;
    currentBattingOrder = battingOrderHome;
    batter = battingOrderHome[baCounterHome % 9];
    setBatter(battingOrderHome[baCounterHome % 9]);
    halfInning = true;
  }
  changeScore(scored);
  //Display the pitcher and batter
  displayPitcher(pitcher);

  displayBatter(batter);
  if (halfInning == false) {
    setBatter(battingOrderAway[baCounterAway % 9]);
  } else {
    setBatter(battingOrderHome[baCounterHome % 9]);
  }

  console.log(batter.name);
  displayBatter(batter.name);
  //Keep running the inning while there are less than 3 outs
  while (outs < 3) {
    //Wait three seconds after player is displayed to print outcome to screen
    await sleep(1600);
    //Have an a3 bat and store its outcome

    var outcome = atBat(pitcher, batter);
    if (outcome === "Walk") {
      //If first base is occupied, advance the runner but keep first true because now the batter is there
      addText("Walk");
      if (bases.first == true && bases.second == true && bases.third == true) {
        addText("Runner from third scores, bases still loaded.");
        scored++;
      } else if (bases.first == true && bases.second == true) {
        bases.third = true;
        addText("Runners on first and second advance, bases loaded.");
      } else if (bases.first == true) {
        bases.second = true;
        addText("Runner from first advances to second.");
      } else {
        bases.first = true;
      }
    } else if (outcome === "Out" || outcome === "Strikeout") {
      addText(outcome);
      outs++;
    } else if (outcome === "Error") {
      addText("Error on the play, batter reaches first");
      if (bases.first == true && bases.second == true && bases.third == true) {
        addText("Runner on third scores, bases are still loaded.");
        scored++;
      } else if (bases.first == true && bases.second == true) {
        addText("Runners on first and second advance, bases are now loaded.");
        bases.third = true;
      } else if (bases.first == true) {
        addText("Runner on first advances to second");
        bases.second = true;
      } else if (bases.second == true) {
        bases.first = true;
        bases.third = true;
        bases.second = false;
        addText(
          "Runner from second advances to third, runners at first and third"
        );
      } else if (bases.third == true) {
        bases.third = false;
        scored++;
        bases.first = true;
        addText("Runner on third scores on error.");
      }
    } else {
      outcome = hit();
      addText(outcome);
    }

    //Wait another second before displaying what happens with the runners
    await sleep(1000);
    if (outcome == "single") {
      //If third was occupied advance the runner add one to the score, clear the base
      if (bases.third == true) {
        scored++;
        bases.third = false;
        addText("Runner from third advances and scores.");
      }

      //If second was occupied advance the runner, clear the base
      if (bases.second == true) {
        bases.third = true;
        bases.second = false;
        addText("Runner on second advances to third.");
      }

      //If first base is occupied, advance the runner but keep first true because now the batter is there
      if (bases.first == true) {
        bases.second = true;
        addText("Runner from first advances to second.");
      } else {
        bases.first = true;
      }
    } else if (outcome == "double") {
      //If third was occupied advance the runner add one to the score, clear the base
      if (bases.third == true) {
        scored++;
        bases.third = false;
        addText("Runner on third scores.");
      }

      //If second was occupied advance the runner and add to score, don't clear the base because the runner is there now
      if (bases.second == true) {
        scored++;
        addText("Runner on second scores");
      } else {
        bases.second = true;
      }

      //If first base is occupied, advance the runner
      if (bases.first == true) {
        bases.third = true;
        addText("Runner on first advances to third.");
      }
    } else if (outcome == "triple") {
      //If third was occupied advance the runner add one to the score, don't clear the base
      if (bases.third == true) {
        scored++;
        addText("Runner on third scores.");
      } else {
        bases.third = true;
      }

      //If second was occupied advance the runner add to score, clear the base
      if (bases.second == true) {
        bases.second = false;
        scored++;
        addText("Runner on second scores.");
      }

      //If first base is occupied, advance the runner but keep first true because now the batter is there
      if (bases.first == true) {
        bases.first = false;
        scored++;
        addText("Runner on first scores");
      }
    } else if (outcome == "homerun") {
      scored++;
      //If third was occupied advance the runner add one to the score, clear the base
      if (bases.third == true) {
        scored++;
        addText("Runner on third scores.");
      }

      //If second was occupied advance the runner, clear the base
      if (bases.second == true) {
        scored++;
        addText("Runner on second scores.");
      }

      //If first base is occupied, advance the runner but keep first true because now the batter is there
      if (bases.first == true) {
        scored++;
        addText("Runner on first scores.");
      }

      bases.first = false;
      bases.second = false;
      bases.third = false;
    }

    if (outs < 3) {
      window.scrollTo(0, document.body.scrollHeight);
      changeScore(scored);
      //If it's the bottom of the 9th or after, bttom half of inning, if home team passes away team. end game
      if (homeScore > awayScore && inningsPlayed >= 17) {
        await sleep(1000);
        endGame();

        outs = outs + 4;
        return;
      }

      addText("Next batter");
      window.scrollTo(0, document.body.scrollHeight);

      moveToNextBatter();
      await sleep(400);
      displayOuts();

      scoredInHalf = scoredInHalf + scored;

      scored = 0;
      window.scrollTo(0, document.body.scrollHeight);
      await sleep(1800);
    }
    //end while loop
  }
  window.scrollTo(0, document.body.scrollHeight);
  moveToNextBatter();
  displayOuts();
  //Bring outs back to 0 after the inning ends

  //end inning function
  addText(scoredInHalf + " runs were scored this inning.");
  window.scrollTo(0, document.body.scrollHeight);
  await sleep(2000);
  declareNextInning();
  window.scrollTo(0, document.body.scrollHeight);
  await sleep(2000);
  removePreviousText();
  //Clear the bases, reset outs and runs scored
  bases.first = false;
  bases.second = false;
  bases.third = false;
  scoredInHalf = 0;
  scored = 0;
  outs = 0;
  displayOuts();

  callAgain();
}

function removePreviousText() {
  var prevTXT = document.getElementById("nextOutcome");
  prevTXT.remove();
}

function removePreviousScores() {
  var prevTXT = document.getElementById("scores");
  prevTXT.remove();
}

//*********************************** */

//******************************************************\\
//******************************************************\\
//******************************************************\\
function declareNextInning() {
  var tb = "bottom";
  if (inningsPlayed % 2 == 0) {
    tb = "top";
  }
  if (inningsPlayed <= 1) {
    var statement =
      "End of the " + tb + " of the " + inningWords[0] + " inning";
    addText(statement);
  } else {
    var statement =
      "End of the " +
      tb +
      " of the " +
      inningWords[Math.floor(inningsPlayed / 2)] +
      " inning";
    addText(statement);
  }
}

//******************************************************\\
//******************************************************\\
//******************************************************\\

function addText(inputTXT) {
  //Make a Break
  var brk = document.createElement("br");

  var textNode = document.createTextNode(inputTXT);
  var newSpot = document.createElement("h3");
  newSpot.setAttribute("id", "nextOutcome");
  document.getElementById("outcoming").appendChild(newSpot);
  document.getElementById("nextOutcome").appendChild(textNode);
  document.getElementById("nextOutcome").appendChild(brk);
  var element = document.getElementById("outcoming");
  element.scrollTop = element.scrollHeight - 1000;
}

//******************************************************* */
//******************************************************* */
//******************************************************* */
function changeScore(runsScored) {
  var inningTS = "";
  if (halfInning == false) {
    awayScore = awayScore + runsScored;
    var toS = awayScore.toString();

    document.getElementById("awayScore").innerHTML = toS;
    inningTS = "Top " + inningWords[Math.floor(inningsPlayed / 2)];
  } else {
    homeScore = homeScore + runsScored;
    var toS = homeScore.toString();
    var addTxt = document.createTextNode(toS);
    document.getElementById("homeScore").innerHTML = toS;
    inningTS = "Bottom " + inningWords[Math.floor(inningsPlayed / 2)];
  }

  document.getElementById("inning").innerHTML = inningTS;
}

function displayOuts() {
  var outTS = outs.toString();

  document.getElementById("outs").innerHTML = outTS;
}

function updateScore(scored) {
  var txtA, txtH;
  if (halfInning == false) {
    //Update score and make away text node
    var totalScore = awayScore + scored;
    awayScore = awayScore + scored;
    var toS = totalScore.toString();
    txtA = document.createTextNode(toS);

    //Make Home text Node
    toS = homeScore.toString();
    txtH = document.createTextNode(toS);
  } else {
    //Update score and make home text node
    var totalScore = homeScore + scored;
    homeScore = homeScore + scored;
    var toS = totalScore.toString();
    txtH = document.createTextNode(toS);

    //Make away text Node
    toS = awayScore.toString();
    txtA = document.createTextNode(toS);
  }

  document.getElementById("homeScore").appendChild(txtH);
  document.getElementById("awayScore").appendChild(txtA);

  var brk = document.createElement("br");
  var scoreLine = document.createElement("h2");
  scoreLine.setAttribute("id", "scores");
  document.getElementById("scoreNums").appendChild(scoreLine);
  document.getElementById("scores").appendChild(brk);
  document.getElementById("scores").appendChild(brk);
  document.getElementById("scores").appendChild(brk);
  document.getElementById("scores").appendChild(txtA);
  document.getElementById("scores").appendChild(txtH);
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

async function game() {
  if (started == false) {
    populate();
    started = true;
  }
  //Assigns home and away pitchers from local storage
  setPitchers();

  pitcher = pitcherHome;

  currentBattingOrder = battingOrderAway;
  batter = battingOrderAway[baCounterAway % 9];

  displayPitcher(pitcher);
  displayBatter(batter);

  setTimeout(displayOutcome, 1000);

  for (var i = 0; i < 6; i++) {
    await sleep(1200);
    executeAB();
  }
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function displayOutcome() {
  var textOne = atBat(pitcher, batter);
  if (textOne === "Out" || textOne === "Strikeout") {
    outs++;
    return "Out";
  } else {
    textOne = hit();
  }

  var textNode = document.createTextNode("\n" + textOne);
  var newSpot = document.createElement("h3");
  newSpot.setAttribute("id", "nextOutcome");
  document.getElementById("outcoming").appendChild(newSpot);
  document.getElementById("nextOutcome").appendChild(textNode);
  window.scrollTo(0, document.body.scrollHeight);
  return textOne;
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

async function executeAB() {
  moveToNextBatterAway();
  window.scrollTo(0, document.body.scrollHeight);
  setTimeout(displayOutcome, 1000);
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function moveToNextBatter() {
  if (inningsPlayed % 2 == 0) {
    baCounterAway++;
    setBatter(battingOrderAway[baCounterAway % 9]);
    displayBatter(batter.name);
  } else {
    baCounterHome++;
    setBatter(battingOrderHome[baCounterHome % 9]);
    displayBatter(batter.name);
  }
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function moveToNextBatterHome() {
  baCounterHome++;
  setBatter(battingOrderHome[baCounterHome]);
  displayBatter(batter.name);
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function atBat(pitcher, batter) {
  //Evenly weighted adjusted walk rate
  var adjWalkRate = (pitcher.bbRate + batter.bbRate) / 2;

  //Make an adjusted average that they get a hit, weighted towards batter's ave
  var aveAdjust = (1.07 * batter.ave + pitcher.aveAgainst) / 2;

  //2019 MLB fielding% .984
  var errorLim = 0.984;

  //simulate the at-bat using a random number generator to see if it's within aveAdjust
  var hitNum = Math.random();

  if (adjWalkRate >= hitNum) {
    return "Walk";
  }

  //Generate another hitNum, as this time we are looking at stats over at-bats not plate appearances
  //Do not want overlap
  hitNum = Math.random();
  if (hitNum <= aveAdjust) {
    outcomeAB = "hit";
  } else {
    //represents the percent that any given batter the pitcher is facing would strikeout
    var strikeoutRate = (batter.soRate + pitcher.soRate) / 2;

    //Upper limit cutoff between strikeout and out in play
    var upperLimit = aveAdjust + strikeoutRate;

    //Cutoff between error and out
    var inPlay = 1 - upperLimit;
    var errorNum = 0.016 * inPlay;
    var errorNumLimit = upperLimit + errorNum;
    if (hitNum > aveAdjust && hitNum <= upperLimit) {
      return "Strikeout";
    } else if (hitNum > upperLimit && hitNum <= errorNumLimit) {
      return "Error";
    } else {
      return "Out";
    }
  }
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function hit() {
  //Use appropriate slugging percentage to determine hit
  var pSlg = pitcher.slugP;
  var hSlg = batter.slugP;

  //Adjusted figure
  var slugAdj = (hSlg + pSlg) / 2;

  var baAdj = (1.07 * batter.ave + pitcher.aveAgainst) / 2;

  var ratioStoA = slugAdj / baAdj;

  //Numbers based on 2012 hit distribution stats
  var hr = 0.118;
  var triple = 0.02;
  var single = 0.664;
  var double = 0.198;

  //Divide the average slg% over the last 5 years over ave BA last 5 years
  var mlbAveRatio = 0.418 / 0.253;

  //If over league ave
  if (ratioStoA > mlbAveRatio) {
    var difference = ratioStoA - mlbAveRatio;
    var amount = Math.round(difference / 0.025);

    hr += amount * 0.005;
    double += amount * 0.005;
    triple += amount * 0.001;
    single = single - amount * 0.011;
  } else if (ratioStoA < mlbAveRatio) {
    var difference = mlbAveRatio - ratioStoA;
    var amount = Math.round(difference / 0.025);

    hr -= amount * 0.005;
    double -= amount * 0.005;
    triple -= amount * 0.001;
    single += amount * 0.011;
  }

  var hit = Math.random();

  if (hit > hr + double + triple) {
    return "single";
  } else if (hit > hr && hit < hr + triple) {
    return "triple";
  } else if (hit < hr) {
    return "homerun";
  } else {
    return "double";
  }
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

//Assign to globals
function setPitchers() {
  var getPitchOne = JSON.parse(localStorage.getItem("lineup"));
  pitcherHome = getPitchOne.pitcher;
  var getPitchTwo = JSON.parse(localStorage.getItem("lineup2"));
  pitcherAway = getPitchTwo.pitcher;
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function switchSides() {
  //Change pitcher, and change batting lineup
  if (halfInning == true) {
    halfInning = false;
    pitcher = pitcherAway;
    currentBattingOrder = battingOrderHome;
    var num = baCounterHome % 9;

    batter = currentBattingOrder[baCounterHome % 9];
  } else {
    halfInning = true;
    pitcher = pitcherHome;
    currentBattingOrder = battingOrderAway;
    batter = battingOrderAway[baCounterAway % 9];
  }
  displayPitcher(pitcher);
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function displayPitcher(pitcher) {
  getImageofPlayer(pitcher.name, "pitching");
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function displayBatter(batter) {
  getImageofPlayer(batter, "batting");
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function populate() {
  battingOrderHome = JSON.parse(localStorage.getItem("baHome"));
  for (var i = 0; i < battingOrderHome.length; i++) {
    getImageofPlayer(battingOrderHome[i], i);
  }
  battingOrderAway = JSON.parse(localStorage.getItem("baAway"));
  for (var i = 0; i < battingOrderAway.length; i++) {
    var id = i + 10;
    getImageofPlayer(battingOrderAway[i], id);
  }
  setPitchers();

  getImageofPlayer(pitcherHome.name, "homePitcher");
  getImageofPlayer(pitcherAway.name, "awayPitcher");

  inning();
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function getImageofPlayer(playerName, position) {
  if (playerName == "Rickey Henderson") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/henderson.jpg");
  } else if (playerName == "Hank Aaron") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/aaron.jpg");
  } else if (playerName == "Roberto Alomar") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/alomar.jpg");
  } else if (playerName == "Ashley Troutman") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/ashley_troutman_sball_2019_20.jpg");
  } else if (playerName == "Babe Ruth") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/babe1.jpg");
  } else if (playerName == "Bo Jackson") {
    document.getElementById(position).setAttribute("src", "./Pictures/Bo1.jpg");
  } else if (playerName == "Lou Brock") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/brock.jpg");
  } else if (playerName == "Carl Edwards Jr.") {
    document.getElementById(position).setAttribute("src", "./Pictures/cje.jpg");
  } else if (playerName == "Dontrelle Willis") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/dwill.jpg");
  } else if (playerName == "Carlton Fisk") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/fisk.jpg");
  } else if (playerName == "Tom Glavine") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/glavine.jpg");
  } else if (playerName == "Luke Sclamberg") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/luke1.jpg");
  } else if (playerName == "Greg Maddux") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/Gmaddux1.jpg");
  } else if (playerName == "Harmon Killebrew") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/harmon.jpg");
  } else if (playerName == "Trevor Hoffman") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/hoffman.jpg");
  } else if (playerName == "Ichiro") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/ichiro.jpg");
  } else if (playerName == "Javy Baez") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jbaez2.jpg");
  } else if (playerName == "Derek Jeter") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jeter.jpg");
  } else if (playerName == "Chipper Jones") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jones.jpg");
  } else if (playerName == "Ken Griffey Jr.") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/kgjr.jpg");
  } else if (playerName == "Mickey Mantle") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/mantle.jpg");
  } else if (playerName == "Mariano Rivera") {
    document.getElementById(position).setAttribute("src", "./Pictures/Mo1.jpg");
  } else if (playerName == "Mike Trout") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/Mtrout1.jpg");
  } else if (playerName == "Nolan Ryan") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/nolanR1.jpg");
  } else if (playerName == "Albert Pujols") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/pujols.jpg");
  } else if (playerName == "Randy Johnson") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/randyJohnson1.jpg");
  } else if (playerName == "Ryne Sandberg") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/ryne.jpg");
  } else if (playerName == "Sandy Koufax") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/sandyK1.jpg");
  } else if (playerName == "Ron Santo") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/santo.jpg");
  } else if (playerName == "John Smoltz") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/smoltz.jpg");
  } else if (playerName == "Darryl Strawberry") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/strawb.jpg");
  } else if (playerName == "Wilson Contreras") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/wilsonC.jpg");
  } else if (playerName == "Robinson Cano") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/cano1.jpg");
  } else if (playerName == "Frank Thomas") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/fthomas1.jpg");
  } else if (playerName == "Nomar Garciaparra") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/garciaparra1.jpg");
  } else if (playerName == "Jackie Robinson") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jrobinson1.jpg");
  } else if (playerName == "David Ross") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/dross1.jpg");
  } else if (playerName == "Johnny Bench") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jbench1.jpg");
  } else if (playerName == "Jacob Degrom") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/degrom2.jpg");
  } else if (playerName == "Cy Young") {
    document.getElementById(position).setAttribute("src", "./Pictures/cy1.jpg");
  } else if (playerName == "Andre Dawson") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/adawson1.jpg");
  } else if (playerName == "Billy Hamilton") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/bham1.jpg");
  } else if (playerName == "Jacob Degrom") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/degrom2.jpg");
  } else if (playerName == "Rod Carew") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/carew1.jpg");
  } else if (playerName == "George Brett") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/gbrett1.jpg");
  } else if (playerName == "Joe DiMaggio") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jdimaggio1.jpg");
  } else if (playerName == "Jimmy Rollins") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jrollins1.jpg");
  } else if (playerName == "Manny Ramirez") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/mramiez1.jpg");
  } else if (playerName == "Mark Teixeira") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/mteixeira.jpg");
  } else if (playerName == "Eddie Murray") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/murray1.jpg");
  } else if (playerName == "Anthony Rizzo") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/rizzo1.jpg");
  } else if (playerName == "Robin Ventura") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/rventura1.jpg");
  } else if (playerName == "Warren Spahn") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/spahn1.jpg");
  } else if (playerName == "Wade Boggs") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/wboggs1.jpg");
  } else if (playerName == "Nellie Fox") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/nox1.jpg");
  } else if (playerName == "Roberto Clemente") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/rclemente1.jpg");
  } else if (playerName == "Roger Maris") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/rmaris1.jpg");
  } else if (playerName == "Ozzie Smith") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/osmith1.jpg");
  } else if (playerName == "Cal Ripken Jr.") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/cripkenjr1.jpg");
  } else if (playerName == "Jay Goldsher") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jay2.jpg");
  } else if (playerName == "Billy Williams") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/bwilliams1.jpg");
  } else if (playerName == "Carl Yastrzemski") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/cyastremski1.jpg");
  } else if (playerName == "Adrian Beltre") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/abeltre1.jpg");
  } else if (playerName == "Mike Schmidt") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/mschmidt1.jpg");
  } else if (playerName == "Robin Yount") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/ryount1.jpg");
  } else if (playerName == "Airbud") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/airbud3.jpg");
  } else if (playerName == "Glenn Beckert") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/gbeckert1.jpg");
  } else if (playerName == "Bob Gibson") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/bgibson1.jpg");
  } else if (playerName == "Gaylord Perry") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/gperry1.jpg");
  } else if (playerName == "Jim Palmer") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jpalmer1.jpg");
  } else if (playerName == "Juan Marichal") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jmarichal1.jpg");
  } else if (playerName == "Pedro Martinez") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/pmartinez1.jpg");
  } else if (playerName == "Stan Musial") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/musial1.jpg");
  } else if (playerName == "Barry Bonds") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/bbonds.jpg");
  } else if (playerName == "Jim Thome") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jthome.jpg");
  } else if (playerName == "Sammy Sosa") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/ssosa.jpg");
  } else if (playerName == "Chili Davis") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/cdavis.jpg");
  } else if (playerName == "David Ortiz") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/dortiz.jpg");
  } else if (playerName == "Edgar Martinez") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/emartinez.jpg");
  } else if (playerName == "Rod Carew") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/carew1.jpg");
  } else if (playerName == "Yogi Berra") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/yberra.jpg");
  } else if (playerName == "Ivan Rodriguez") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/pudge.jpg");
  } else if (playerName == "Ted Williams") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/twilliams.jpg");
  } else if (playerName == "Buster Posey") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/posey.jpg");
  } else if (playerName == "Joe Torre") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/torre.jpg");
  } else if (playerName == "Vladamir Guerrero Sr.") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/vlad.jpg");
  } else if (playerName == "Frank Robinson") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/frobinson.jpg");
  } else if (playerName == "Brooks Robinson") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/brooks.jpg");
  } else if (playerName == "Joe Morgan") {
    document
      .getElementById(position)
      .setAttribute("src", "./Pictures/jmorgan.jpg");
  }
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function setBatter(yourChoice) {
  if (yourChoice === "Javy Baez") {
    batter = {
      name: "Javy Baez",
      handedness: "R",
      ave: 0.269,
      slugP: 0.484,
      soRate: 0.28,
      bbRate: 0.049,
    };
  } else if (yourChoice === "Mike Trout") {
    batter = {
      name: "Mike Trout",
      handedness: "R",
      ave: 0.305,
      slugP: 0.582,
      soRate: 0.212,
      bbRate: 0.152,
    };
  } else if (yourChoice === "Babe Ruth") {
    batter = {
      name: "Babe Ruth",
      handedness: "R",
      ave: 0.342,
      slugP: 0.69,
      soRate: 0.125,
      bbRate: 0.194,
    };
  } else if (yourChoice === "Ken Griffey Jr.") {
    batter = {
      name: "Ken Griffey Jr.",
      handedness: "R",
      ave: 0.284,
      slugP: 0.538,
      soRate: 0.157,
      bbRate: 0.116,
    };
  } else if (yourChoice === "Luke Sclamberg") {
    batter = {
      name: "Luke Sclamberg",
      handedness: "R",
      ave: 0.8,
      slugP: 0.9,
      soRate: 0.075,
      bbRate: 0.18,
    };
  } else if (yourChoice === "Bo Jackson") {
    batter = {
      name: "Bo Jackson",
      handedness: "R",
      ave: 0.25,
      slugP: 0.474,
      soRate: 0.32,
      bbRate: 0.076,
    };
  } else if (yourChoice === "Ashley Troutman") {
    batter = {
      name: "Ashley Troutman",
      handedness: "R",
      ave: 0.798,
      slugP: 1.9,
      soRate: 0.001,
      bbRate: 0.1,
    };
  } else if (yourChoice === "Wilson Contreras") {
    batter = {
      name: "Wilson Contreras",
      handedness: "R",
      ave: 0.268,
      slugP: 0.473,
      soRate: 0.236,
      bbRate: 0.095,
    };
  } else if (yourChoice === "Derek Jeter") {
    batter = {
      name: "Derek Jeter",
      handedness: "R",
      ave: 0.31,
      slugP: 0.44,
      soRate: 0.146,
      bbRate: 0.086,
    };
  } else if (yourChoice === "Darryl Strawberry") {
    batter = {
      name: "Darryl Strawberry",
      handedness: "R",
      ave: 0.259,
      slugP: 0.505,
      soRate: 0.213,
      bbRate: 0.128,
    };
  } else if (yourChoice === "Mickey Mantle") {
    batter = {
      name: "Mickey Mantle",
      handedness: "R",
      ave: 0.298,
      slugP: 0.557,
      soRate: 0.172,
      bbRate: 0.175,
    };
  } else if (yourChoice === "Harmon Killebrew") {
    batter = {
      name: "Harmon Killebrew",
      handedness: "R",
      ave: 0.256,
      slugP: 0.509,
      soRate: 0.172,
      bbRate: 0.158,
    };
  } else if (yourChoice === "Albert Pujols") {
    batter = {
      name: "Albert Pujols",
      handedness: "R",
      ave: 0.299,
      slugP: 0.548,
      soRate: 0.104,
      bbRate: 0.108,
    };
  } else if (yourChoice === "Ryne Sandberg") {
    batter = {
      name: "Ryne Sandberg",
      handedness: "R",
      ave: 0.285,
      slugP: 0.452,
      soRate: 0.136,
      bbRate: 0.082,
    };
  } else if (yourChoice === "Roberto Alomar") {
    batter = {
      name: "Roberto Alomar",
      handedness: "R",
      ave: 0.3,
      slugP: 0.443,
      soRate: 0.11,
      bbRate: 0.099,
    };
  } else if (yourChoice === "Chipper Jones") {
    batter = {
      name: "Chipper Jones",
      handedness: "R",
      ave: 0.303,
      slugP: 0.529,
      soRate: 0.133,
      bbRate: 0.142,
    };
  } else if (yourChoice === "Ron Santo") {
    batter = {
      name: "Ron Santo",
      handedness: "R",
      ave: 0.277,
      slugP: 0.464,
      soRate: 0.143,
      bbRate: 0.118,
    };
  } else if (yourChoice == "Lou Brock") {
    batter = {
      name: "Lou Brock",
      handedness: "R",
      ave: 0.293,
      slugP: 0.41,
      soRate: 0.152,
      bbRate: 0.068,
    };
  } else if (yourChoice === "Rickey Henderson") {
    batter = {
      name: "Rickey Henderson",
      handedness: "R",
      ave: 0.279,
      slugP: 0.401,
      soRate: 0.126,
      bbRate: 0.164,
    };
  } else if (yourChoice === "Carlton Fisk") {
    batter = {
      name: "Carlton Fisk",
      handedness: "R",
      ave: 0.269,
      slugP: 0.457,
      soRate: 0.14,
      bbRate: 0.086,
    };
  } else if (yourChoice === "Hank Aaron") {
    batter = {
      name: "Hank Aaron",
      handedness: "R",
      ave: 0.305,
      slugP: 0.555,
      soRate: 0.099,
      bbRate: 0.101,
    };
  } else if (yourChoice === "Ichiro") {
    batter = {
      name: "Ichiro",
      handedness: "R",
      ave: 0.311,
      slugP: 0.402,
      soRate: 0.101,
      bbRate: 0.06,
    };
  } else if (yourChoice === "Robinson Cano") {
    batter = {
      name: "Robinson Cano",
      handedness: "R",
      ave: 0.303,
      slugP: 0.491,
      soRate: 0.126,
      bbRate: 0.066,
    };
  } else if (yourChoice === "Frank Thomas") {
    batter = {
      name: "Frank Thomas",
      handedness: "R",
      ave: 0.301,
      slugP: 0.555,
      soRate: 0.139,
      bbRate: 0.165,
    };
  } else if (yourChoice === "Nomar Garciaparra") {
    batter = {
      name: "Nomar Garciaparra",
      handedness: "R",
      ave: 0.313,
      slugP: 0.521,
      soRate: 0.091,
      bbRate: 0.066,
    };
  } else if (yourChoice === "Jackie Robinson") {
    batter = {
      name: "Jackie Robinson",
      handedness: "R",
      ave: 0.311,
      slugP: 0.474,
      soRate: 0.05,
      bbRate: 0.127,
    };
  } else if (yourChoice === "Stan Musial") {
    batter = {
      name: "Stan Musial",
      handedness: "R",
      ave: 0.331,
      slugP: 0.559,
      soRate: 0.055,
      bbRate: 0.126,
    };
  } else if (yourChoice === "Johnny Bench") {
    batter = {
      name: "Johnny Bench",
      handedness: "R",
      ave: 0.267,
      slugP: 0.476,
      soRate: 0.147,
      bbRate: 0.103,
    };
  } else if (yourChoice === "David Ross") {
    batter = {
      name: "David Ross",
      handedness: "R",
      ave: 0.229,
      slugP: 0.423,
      soRate: 0.278,
      bbRate: 0.109,
    };
  } else if (yourChoice === "Mark Teixeira") {
    batter = {
      name: "Mark Teixeira",
      handedness: "R",
      ave: 0.268,
      slugP: 0.509,
      soRate: 0.179,
      bbRate: 0.114,
    };
  } else if (yourChoice === "Jimmy Rollins") {
    batter = {
      name: "Jimmy Rollins",
      handedness: "R",
      ave: 0.264,
      slugP: 0.418,
      soRate: 0.123,
      bbRate: 0.079,
    };
  } else if (yourChoice === "Billy Hamilton") {
    batter = {
      name: "Billy Hamilton",
      handedness: "R",
      ave: 0.242,
      slugP: 0.326,
      soRate: 0.207,
      bbRate: 0.072,
    };
  } else if (yourChoice === "Wade Boggs") {
    batter = {
      name: "Wade Boggs",
      handedness: "R",
      ave: 0.328,
      slugP: 443,
      soRate: 0.069,
      bbRate: 0.131,
    };
  } else if (yourChoice === "Warren Spahn") {
    batter = {
      name: "Warren Spahn",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
      soRate: 0.1,
    };
  } else if (yourChoice === "Robin Ventura") {
    batter = {
      name: "Robin Ventura",
      handedness: "R",
      ave: 0.267,
      slugP: 0.444,
      soRate: 0.142,
      bbRate: 0.13,
    };
  } else if (yourChoice === "Nellie Fox") {
    batter = {
      name: "Nellie Fox",
      handedness: "R",
      ave: 0.288,
      slugP: 0.363,
      soRate: 0.021,
      bbRate: 0.069,
    };
  } else if (yourChoice === "Eddie Murray") {
    batter = {
      name: "Eddie Murray",
      handedness: "R",
      ave: 0.287,
      slugP: 0.476,
      soRate: 0.118,
      bbRate: 0.104,
    };
  } else if (yourChoice === "Manny Ramirez") {
    batter = {
      name: "Manny Ramirez",
      handedness: "R",
      ave: 0.312,
      slugP: 0.585,
      soRate: 0.185,
      bbRate: 0.136,
    };
  } else if (yourChoice === "Joe DiMaggio") {
    batter = {
      name: "Joe DiMaggio",
      handedness: "R",
      ave: 0.325,
      slugP: 0.579,
      soRate: 0.048,
      bbRate: 0.103,
    };
  } else if (yourChoice === "Andre Dawson") {
    batter = {
      name: "Andre Dawson",
      handedness: "R",
      ave: 0.279,
      slugP: 0.482,
      soRate: 0.14,
      bbRate: 0.055,
    };
  } else if (yourChoice === "George Brett") {
    batter = {
      name: "George Brett",
      handedness: "R",
      ave: 0.305,
      slugP: 0.487,
      soRate: 0.078,
      bbRate: 0.094,
    };
  } else if (yourChoice === "Anthony Rizzo") {
    batter = {
      name: "Anthony Rizzo",
      handedness: "R",
      ave: 0.273,
      slugP: 0.488,
      soRate: 0.159,
      bbRate: 0.113,
    };
  } else if (yourChoice === "Rod Carew") {
    batter = {
      name: "Rod Carew",
      handedness: "R",
      ave: 0.328,
      slugP: 0.429,
      soRate: 0.097,
      bbRate: 0.096,
    };
  } else if (yourChoice === "Roberto Clemente") {
    batter = {
      name: "Roberto Clemente",
      handedness: "R",
      ave: 0.317,
      slugP: 0.475,
      soRate: 0.12,
      bbRate: 0.061,
    };
  } else if (yourChoice === "Roger Maris") {
    batter = {
      name: "Roger Maris",
      handedness: "R",
      ave: 0.26,
      slugP: 0.476,
      soRate: 0.125,
      bbRate: 0.112,
    };
  } else if (yourChoice === "Ozzie Smith") {
    batter = {
      name: "Ozzie Smith",
      handedness: "R",
      ave: 0.262,
      slugP: 0.328,
      soRate: 0.055,
      bbRate: 0.099,
    };
  } else if (yourChoice === "Cal Ripken") {
    batter = {
      name: "Cal Ripken Jr.",
      handedness: "R",
      ave: 0.276,
      slugP: 0.447,
      soRate: 0.113,
      bbRate: 0.098,
    };
  } else if (yourChoice === "Carl Yastrzemski") {
    batter = {
      name: "Carl Yastrzemski",
      handedness: "R",
      ave: 0.385,
      slugP: 0.462,
      soRate: 0.1,
      bbRate: 0.132,
    };
  } else if (yourChoice === "Billy Williams") {
    batter = {
      name: "Billy Williams",
      handedness: "R",
      ave: 0.29,
      slugP: 0.492,
      soRate: 0.099,
      bbRate: 0.099,
    };
  } else if (yourChoice === "Adrian Beltre") {
    batter = {
      name: "Adrian Beltre",
      handedness: "R",
      ave: 0.286,
      slugP: 0.48,
      soRate: 0.143,
      bbRate: 0.07,
    };
  } else if (yourChoice === "Mike Schmidt") {
    batter = {
      name: "Mike Schmidt",
      handedness: "R",
      ave: 0.267,
      slugP: 0.527,
      soRate: 0.187,
      bbRate: 0.15,
    };
  } else if (yourChoice === "Glenn Beckert") {
    batter = {
      name: "Glenn Beckert",
      handedness: "R",
      ave: 0.283,
      slugP: 0.345,
      soRate: 0.044,
      bbRate: 0.047,
    };
  } else if (yourChoice === "Airbud") {
    batter = {
      name: "Airbud",
      handedness: "R",
      ave: 0.447,
      slugP: 0.89,
      soRate: 0.09,
      bbRate: 0.3,
    };
  } else if (yourChoice === "Robin Yount") {
    batter = {
      name: "Robin Yount",
      handedness: "R",
      ave: 0.285,
      slugP: 0.43,
      soRate: 0.123,
      bbRate: 0.088,
    };
  } else if (yourChoice === "Barry Bonds") {
    batter = {
      name: "Barry Bonds",
      handedness: "R",
      ave: 0.298,
      slugP: 0.607,
      soRate: 0.122,
      bbRate: 0.203,
    };
  } else if (yourChoice === "Sammy Sosa") {
    batter = {
      name: "Sammy Sosa",
      handedness: "R",
      ave: 0.273,
      slugP: 0.534,
      soRate: 0.233,
      bbRate: 0.094,
    };
  } else if (yourChoice === "Jim Thome") {
    batter = {
      name: "Jim Thome",
      handedness: "R",
      ave: 0.276,
      slugP: 0.554,
      soRate: 0.247,
      bbRate: 0.169,
    };
  } else if (yourChoice === "Edgar Martinez") {
    batter = {
      name: "Edgar Martinez",
      handedness: "R",
      ave: 0.312,
      slugP: 0.515,
      soRate: 0.138,
      bbRate: 0.143,
    };
  } else if (yourChoice === "Chili Davis") {
    batter = {
      name: "Chili Davis",
      handedness: "R",
      ave: 0.274,
      slugP: 0.451,
      soRate: 0.17,
      bbRate: 0.119,
    };
  } else if (yourChoice === "David Ortiz") {
    batter = {
      name: "David Ortiz",
      handedness: "R",
      ave: 0.286,
      slugP: 0.552,
      soRate: 0.173,
      bbRate: 0.131,
    };
  } else if (yourChoice === "Yogi Berra") {
    batter = {
      name: "Yogi Berra",
      handedness: "R",
      ave: 0.285,
      slugP: 0.482,
      soRate: 0.173,
      bbRate: 0.049,
    };
  } else if (yourChoice === "Ted Williams") {
    batter = {
      name: "Ted Williams",
      handedness: "R",
      ave: 0.344,
      slugP: 0.634,
      soRate: 0.092,
      bbRate: 0.262,
    };
  } else if (yourChoice === "Frank Robinson") {
    batter = {
      name: "Frank Robinson",
      handedness: "R",
      ave: 0.294,
      slugP: 0.537,
      soRate: 0.153,
      bbRate: 0.142,
    };
  } else if (yourChoice === "Brooks Robinson") {
    batter = {
      name: "Brooks Robinson",
      handedness: "R",
      ave: 0.267,
      slugP: 0.401,
      soRate: 0.093,
      bbRate: 0.081,
    };
  } else if (yourChoice === "Ivan Rodriguez") {
    batter = {
      name: "Ivan Rodriguez",
      handedness: "R",
      ave: 0.296,
      slugP: 0.464,
      soRate: 0.144,
      bbRate: 0.05,
    };
  } else if (yourChoice === "Buster Posey") {
    batter = {
      name: "Buster Posey",
      handedness: "R",
      ave: 0.302,
      slugP: 0.456,
      soRate: 0.123,
      bbRate: 0.094,
    };
  } else if (yourChoice === "Joe Torre") {
    batter = {
      name: "Joe Torre",
      handedness: "R",
      ave: 0.297,
      slugP: 0.452,
      soRate: 0.124,
      bbRate: 0.089,
    };
  } else if (yourChoice === "Vladamir Guerrero Sr.") {
    batter = {
      name: "Vladamir Guerrero Sr.",
      handedness: "R",
      ave: 0.318,
      slugP: 0.553,
      soRate: 0.109,
      bbRate: 0.0813,
    };
  } else if (yourChoice === "Joe Morgan") {
    batter = {
      name: "Joe Morgan",
      handedness: "R",
      ave: 0.271,
      slugP: 0.427,
      soRate: 0.09,
      bbRate: 0.165,
    };
  }
}

//******************************************************* */
//******************************************************* */
//******************************************************* */

function selectBatter(yourChoice) {
  if (yourChoice.id === "javy") {
    lineup.shortstop = {
      name: "Javy Baez",
      handedness: "R",
      ave: 0.5,
      slugP: 0.6,
    };
  } else if (yourChoice.id === "trout") {
    lineup.centerField = {
      name: "Mike Trout",
      handedness: "R",
      ave: 0.515,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ruth") {
    lineup.leftField = {
      name: "Babe Ruth",
      handedness: "R",
      ave: 0.515,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "griffey") {
    lineup.centerField = {
      name: "Ken Griffey Jr.",
      handedness: "R",
      ave: 0.515,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "sclamberg") {
    lineup.centerField = {
      name: "Luke Sclamberg",
      handedness: "R",
      ave: 0.8,
      slugP: 1.7,
    };
  } else if (yourChoice.id === "jackson") {
    lineup.centerField = {
      name: "Bo Jackson",
      handedness: "R",
      ave: 0.515,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "trouty") {
    lineup.shortstop = {
      name: "Ashley Troutman",
      handedness: "R",
      ave: 0.6,
      slugP: 1.1,
    };
  } else if (yourChoice.id === "contreras") {
    lineup.catcher = {
      name: "Wilson Contreras",
      handedness: "R",
      ave: 0.515,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "jeter") {
    lineup.shortstop = {
      name: "Derek Jeter",
      handedness: "R",
      ave: 0.515,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "strawb") {
    lineup.rightField = {
      name: "Darryl Strawberry",
      handedness: "R",
      ave: 0.515,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "mantle") {
    lineup.centerField = {
      name: "Mickey Mantle",
      handedness: "R",
      ave: 0.515,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "killebrew") {
    lineup.firstBase = {
      name: "Harmon Killebrew",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "pujols") {
    lineup.firstBase = {
      name: "Albert Pujols",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "sandberg") {
    lineup.secondBase = {
      name: "Ryne Sandberg",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "alomar") {
    lineup.secondBase = {
      name: "Roberto Alomar",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "jones") {
    lineup.thirdBase = {
      name: "Chipper Jones",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "santo") {
    lineup.thirdBase = {
      name: "Ron Santo",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "brock") {
    lineup.leftField = {
      name: "Lou Brock",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "henderson") {
    lineup.leftField = {
      name: "Rickey Henderson",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "fisk") {
    lineup.catcher = {
      name: "Carlton Fisk",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "aaron") {
    lineup.rightField = {
      name: "Hank Aaron",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ichiro") {
    lineup.rightField = {
      name: "Ichiro",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "cano") {
    lineup.secondBase = {
      name: "Robinson Cano",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "thomas") {
    lineup.firstBase = {
      name: "Frank Thomas",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "garciaparra") {
    lineup.shortstop = {
      name: "Nomar Garciaparra",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "robinson") {
    lineup.secondBase = {
      name: "Jackie Robinson",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "musial") {
    lineup.firstBase = {
      name: "Stan Musial",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "bench") {
    lineup.catcher = {
      name: "Johnny Bench",
      handedness: "R",
      ave: 0.715,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ross") {
    lineup.catcher = {
      name: "David Ross",
      handedness: "R",
      ave: 0.15,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "teixeira") {
    lineup.firstBase = {
      name: "Mark Teixeira",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "rollins") {
    lineup.shortstop = {
      name: "Jimmy Rollins",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "hamilton") {
    lineup.centerField = {
      name: "Billy Hamilton",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "boggs") {
    lineup.thirdBase = {
      name: "Wade Boggs",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "spahn") {
    lineup.pitcher = {
      name: "Warren Spahn",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ventura") {
    lineup.thirdBase = {
      name: "Robin Ventura",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "fox") {
    lineup.secondBase = {
      name: "Nellie Fox",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "murray") {
    lineup.firstBase = {
      name: "Eddie Murray",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ramirez") {
    lineup.leftField = {
      name: "Manny Ramirez",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "dimaggio") {
    lineup.centerField = {
      name: "Joe DiMaggio",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "dawson") {
    lineup.centerField = {
      name: "Andre Dawson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "brett") {
    lineup.firstBase = {
      name: "George Brett",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "rizzo") {
    lineup.firstBase = {
      name: "Anthony Rizzo",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "carew") {
    lineup.secondBase = {
      name: "Rod Carew",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "clemente") {
    lineup.rightField = {
      name: "Roberto Clemente",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "maris") {
    lineup.rightField = {
      name: "Roger Maris",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "smith") {
    lineup.shortstop = {
      name: "Ozzie Smith",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ripken") {
    lineup.shortstop = {
      name: "Cal Ripken Jr.",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "yastrzemski") {
    lineup.leftField = {
      name: "Carl Yastrzemski",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "williams") {
    lineup.leftField = {
      name: "Billy Williams",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "beltre") {
    lineup.thirdBase = {
      name: "Adrian Beltre",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "schmidt") {
    lineup.thirdBase = {
      name: "Mike Schmidt",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "beckert") {
    lineup.secondBase = {
      name: "Glenn Beckert",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "airbud") {
    lineup.firstBase = {
      name: "Airbud",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "yount") {
    lineup.shortstop = {
      name: "Robin Yount",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "berra") {
    lineup.catcher = {
      name: "Yogi Berra",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "pudge") {
    lineup.catcher = {
      name: "Ivan Rodriguez",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "posey") {
    lineup.catcher = {
      name: "Buster Posey",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "vlad") {
    lineup.rightField = {
      name: "Vladamir Guerrero Sr.",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "frobinson") {
    lineup.rightField = {
      name: "Frank Robinson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "brobinson") {
    lineup.thirdBase = {
      name: "Brooks Robinson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "morgan") {
    lineup.secondBase = {
      name: "Joe Morgan",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "twilliams") {
    lineup.leftField = {
      name: "Ted Williams",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "torre") {
    lineup.catcher = {
      name: "Joe Torre",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  }
}
