//GLOBALS
//******************************************************************************* */
var deSelectedPlayers = [""];
var allSelectedPlayers = [""];
var pitcher, batter;
var selectedPlayers = ["jenny", "leon"];
var battingOrderHome = [];
var battingOrderAway = [];
var baSpotCounter = 1;
var lineup = {
  firstBase: "",
  secondBase: "",
  thirdBase: "",
  shortstop: "",
  catcher: "",
  leftField: "",
  rightField: "",
  centerField: "",
  pitcher: "",
  designatedHitter: "",
};

var lineup2 = {
  firstBase: "",
  secondBase: "",
  thirdBase: "",
  shortstop: "",
  catcher: "",
  leftField: "",
  rightField: "",
  centerField: "",
  pitcher: "",
  designatedHitter: "",
};

var orderWords = [
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
];
var spot = -1;
var spot2 = -1;

var called = false;
var calledTwo = false;
var picked = 0;

//******************************************************************************* \\
//******************************************************************************* \\

function addToOrder(player) {
  var i;
  for (i = 0; i < baSpotCounter; i++) {
    if (player.id == battingOrderHome[i]) {
      battingOrderHome.splice(i, 1);
      document.getElementById(baSpotCounter).remove();
      baSpotCounter--;

      return;
    }
  }

  battingOrderHome.push(player.id);
  var name = document.createTextNode(player.id);
  document.getElementById(baSpotCounter).appendChild(name);
  baSpotCounter++;
}

//******************************************************************************* \\
//******************************************************************************* \\

function doTheThings() {
  if (picked == 2) {
    var successes = 0;
    var i = 0;
    var elementH = document.createElement("h3");
    elementH.setAttribute("id", "data");
    while (i < 10) {
      var outcome = atBat(pitcher, batter);
      if (outcome == "hit") {
        successes++;
        outcome = hit();
      }
      var answer = document.createTextNode(outcome + ", ");
      elementH.appendChild(answer);
      document.getElementById("outcomes").appendChild(elementH);
      i++;
    }
    var elementHit = document.createElement("h5");
    elementHit.setAttribute("id", "dataTwo");
    var avie = successes / 10;
    var num = document.createTextNode(
      batter.name + "'s average against " + pitcher.name + " is " + avie
    );
    elementHit.appendChild(num);
    document.getElementById("outcomes").appendChild(elementHit);
  }
}

//******************************************************************************* \\
//******************************************************************************* \\

function selectPitcher(yourChoice) {
  var prevLineupNames = [
    lineup.pitcher.name,
    lineup.catcher.name,
    lineup.firstBase.name,
    lineup.secondBase.name,
    lineup.shortstop.name,
    lineup.thirdBase.name,
    lineup.leftField.name,
    lineup.centerField.name,
    lineup.rightField.name,
    lineup.designatedHitter.name,
  ];

  if (yourChoice.id == "johnson") {
    var player = {
      name: "Randy Johnson",
      handedness: "R",
      aveAgainst: 0.221,
      slugP: 0.353,
      bbRate: 0.088,
    };
  } else if (yourChoice.id == "maddux") {
    var player = {
      name: "Greg Maddux",
      handedness: "R",
      aveAgainst: 0.25,
      slugP: 0.413,
      bbRate: 0.049,
    };
  } else if (yourChoice.id == "ryan") {
    var player = {
      name: "Nolan Ryan",
      handedness: "R",
      aveAgainst: 0.204,
      slugP: 0.298,
      bbRate: 0.124,
      soRate: 0.253,
    };
  } else if (yourChoice.id == "sandy") {
    var player = {
      name: "Sandy Koufax",
      handedness: "R",
      aveAgainst: 0.205,
      slugP: 0.319,
      bbRate: 0.086,
      soRate: 0.252,
    };
  } else if (yourChoice.id == "rivera") {
    var player = {
      name: "Mariano Rivera",
      handedness: "R",
      aveAgainst: 0.211,
      slugP: 0.419,
      bbRate: 0.056,
      soRate: 0.23,
    };
  } else if (yourChoice.id == "willis") {
    var player = {
      name: "Dontrelle Willis",
      handedness: "R",
      aveAgainst: 0.268,
      slugP: 0.306,
      bbRate: 0.094,
      soRate: 0.168,
    };
  } else if (yourChoice.id == "hoffman") {
    var player = {
      name: "Trevor Hoffman",
      handedness: "R",
      aveAgainst: 0.211,
      slugP: 0.342,
      soRate: 0.258,
      bbRate: 0.07,
    };
  } else if (yourChoice.id == "edwards") {
    var player = {
      name: "Carl Edwards Jr.",
      handedness: "R",
      aveAgainst: 0.2,
      slugP: 0.6,
    };
  } else if (yourChoice.id == "smoltz") {
    var player = {
      name: "John Smoltz",
      handedness: "R",
      aveAgainst: 0.237,
      slugP: 0.36,
      soRate: 0.216,
      bbRate: 0.071,
    };
  } else if (yourChoice.id == "glavine") {
    var player = {
      name: "Tom Glavine",
      handedness: "R",
      aveAgainst: 0.257,
      slugP: 0.378,
      soRate: 0.14,
      bbRate: 0.081,
    };
  } else if (yourChoice.id == "degrom") {
    var player = {
      name: "Jacob Degrom",
      handedness: "R",
      aveAgainst: 0.22,
      slugP: 0.333,
      soRate: 0.287,
      bbRate: 0.061,
    };
  } else if (yourChoice.id == "spahn") {
    var player = {
      name: "Warren Spahn",
      handedness: "R",
      aveAgainst: 0.244,
      slugP: 0.377,
      soRate: 0.119,
      bbRate: 0.067,
    };
  } else if (yourChoice.id == "young") {
    var player = {
      name: "Cy Young",
      handedness: "R",
      aveAgainst: 0.243,
      slugP: 0.33,
      soRate: 0.096,
      bbRate: 0.042,
    };
  } else if (yourChoice.id == "jay") {
    var player = {
      name: "Jay Goldsher",
      handedness: "R",
      aveAgainst: 0.211,
      slugP: 0.311,
      soRate: 0.199,
      bbRate: 0.06,
    };
  } else if (yourChoice.id == "gibson") {
    var player = {
      name: "Bob Gibson",
      handedness: "R",
      aveAgainst: 0.228,
      slugP: 0.325,
      bbRate: 0.083,
      soRate: 0.194,
    };
  } else if (yourChoice.id == "palmer") {
    var player = {
      name: "Jim Palmer",
      handedness: "R",
      aveAgainst: 0.228,
      slugP: 0.325,
      soRate: 0.194,
      bbRate: 0.083,
    };
  } else if (yourChoice.id == "martinez") {
    var player = {
      name: "Pedro Martinez",
      handedness: "R",
      aveAgainst: 0.214,
      slugP: 0.337,
      soRate: 0.277,
      bbRate: 0.067,
    };
  } else if (yourChoice.id == "perry") {
    var player = {
      name: "Gaylord Perry",
      handedness: "R",
      aveAgainst: 0.254,
      slugP: 0.367,
      soRate: 0.161,
      bbRate: 0.063,
    };
  } else if (yourChoice.id == "marichal") {
    var player = {
      name: "Juan Marichal",
      handedness: "R",
      aveAgainst: 0.237,
      slugP: 0.35,
      soRate: 0.162,
      bbRate: 0.05,
    };
  }

  pitcher = player;
  lineup.pitcher = pitcher;
  changeStuff(yourChoice, prevLineupNames);

  //displayPitcher(pitcher);
  picked++;
}

//******************************************************************************* \\
//******************************************************************************* \\

function alertIdiocy() {
  alert("Shame on you and your family.");
}

function changeStuff(imagePassed, prevLineup) {
  var count = 0;
  var found = false;
  //Removes box shadow when deselecting a player by picking twice
  while (count < selectedPlayers.length && found == false) {
    if (selectedPlayers[count] == imagePassed.id) {
      imagePassed.setAttribute(
        "style",
        "box-shadow: 0px 0px 0px rgb(247, 190, 136)"
      );
      selectedPlayers.splice(count, 1);
      deSelectedPlayers.push(imagePassed.id);
      found = true;
      return;
    }
    count++;
  }

  //If they weren't already selected all them like normal and highlight the box
  selectedPlayers.push(imagePassed.id);
  allSelectedPlayers.push(imagePassed.id);
  imagePassed.setAttribute(
    "style",
    "box-shadow: 0px 10px 50px 14px rgb(200, 10, 30)"
  );

  compareLineups(prevLineup);
  console.log(deSelectedPlayers);
  console.log(allSelectedPlayers);
}

//******************************************************************************* \\
//******************************************************************************* \\

function compareLineups(prevLineup) {
  var found = false;
  var foundPlayer;
  if (lineup.pitcher.name !== prevLineup[0] && prevLineup[0] != null) {
    foundPlayer = prevLineup[0];
    found = true;
  } else if (lineup.catcher.name !== prevLineup[1] && prevLineup[1] != null) {
    foundPlayer = prevLineup[1];
    found = true;
  } else if (lineup.firstBase.name !== prevLineup[2] && prevLineup[2] != null) {
    foundPlayer = prevLineup[2];
    found = true;
  } else if (
    lineup.secondBase.name !== prevLineup[3] &&
    prevLineup[3] != null
  ) {
    foundPlayer = prevLineup[3];
    found = true;
  } else if (lineup.shortstop.name !== prevLineup[4] && prevLineup[4] != null) {
    foundPlayer = prevLineup[4];
    found = true;
  } else if (lineup.thirdBase.name !== prevLineup[5] && prevLineup[5] != null) {
    foundPlayer = prevLineup[5];
    found = true;
  } else if (lineup.leftField.name !== prevLineup[6] && prevLineup[6] != null) {
    foundPlayer = prevLineup[6];
    found = true;
  } else if (
    lineup.centerField.name !== prevLineup[7] &&
    prevLineup[7] != null
  ) {
    foundPlayer = prevLineup[7];
    found = true;
  } else if (
    lineup.rightField.name !== prevLineup[8] &&
    prevLineup[8] != null
  ) {
    foundPlayer = prevLineup[8];
    found = true;
  } else if (
    lineup.designatedHitter.name !== prevLineup[9] &&
    prevLineup[9] != null
  ) {
    foundPlayer = prevLineup[9];
    found = true;
  }
  console.log(found);
  console.log(foundPlayer);

  if (found == true) {
    foundPlayerID = reverseLookup(foundPlayer);
    var alreadDes = false;
    for (var k = 0; k < deSelectedPlayers.length; k++) {
      if (deSelectedPlayers[k] == foundPlayerID) {
        alreadDes = true;
      }
    }
    if (alreadDes == false) {
      deSelectedPlayers.push("placeholder");
    }

    // console.log(allSelectedPlayers);
    //  console.log(deSelectedPlayers);
  }
}

function checkAndRemove(imgID) {
  document
    .getElementById(imgID)
    .setAttribute("style", "box-shadow: 0px 0px 0px rgb(247, 190, 136)");

  var place = 0;
  for (var i = 0; i < selectedPlayers.length; i++) {
    if (imgID == selectedPlayers[i]) {
      place = i;
    }
  }

  selectedPlayers.splice(place, 1);
}

function reverseLookup(playerName) {
  if (playerName === "Javy Baez") {
    checkAndRemove("baez");
    return "baez";
  } else if (playerName === "Ashley Troutman") {
    checkAndRemove("trouty");
    return "trouty";
  } else if (playerName === "Greg Maddux") {
    checkAndRemove("maddux");
    return "maddux";
  } else if (playerName === "Randy Johnson") {
    checkAndRemove("johnson");
    return "johnson";
  } else if (playerName === "Sandy Koufax") {
    checkAndRemove("sandy");
    return "sandy";
  } else if (playerName === "Nolan Ryan") {
    checkAndRemove("ryan");
    return "ryan";
  } else if (playerName === "Tom Glavine") {
    checkAndRemove("glavine");
    return "glavine";
  } else if (playerName === "Carl Edwards Jr.") {
    checkAndRemove("edwards");
  } else if (playerName === "Dontrelle Willis") {
    checkAndRemove("willis");
    return "willis";
  } else if (playerName === "Trevor Hoffman") {
    checkAndRemove("hoffman");
    return "hoffman";
  } else if (playerName === "Jacob Degrom") {
    checkAndRemove("degrom");
    return "degrom";
  } else if (playerName === "Cy Young") {
    checkAndRemove("young");
    return "young";
  } else if (playerName === "Warren Spahn") {
    checkAndRemove("spahn");
    return "spahn";
  } else if (playerName === "Mariano Rivera") {
    checkAndRemove("rivera");
    return "rivera";
  } else if (playerName === "John Smoltz") {
    checkAndRemove("smoltz");
    return "smoltz";
  } else if (playerName === "Jay Goldsher") {
    checkAndRemove("jay");
    return "jay";
  } else if (playerName === "Jim Palmer") {
    checkAndRemove("palmer");
    return "palmer";
  } else if (playerName === "Juan Marichal") {
    checkAndRemove("marichal");
    return "marichal";
  } else if (playerName === "Bob Gibson") {
    checkAndRemove("gibson");
    return "gibson";
  } else if (playerName === "Pedro Martinez") {
    checkAndRemove("martinez");
    return "martinez";
  } else if (playerName === "Gaylord Perry") {
    checkAndRemove("perry");
    return "perry";
  } else if (playerName === "Albert Pujols") {
    checkAndRemove("pujols");
    return "pujols";
  } else if (playerName === "Harmon Killebrew") {
    checkAndRemove("killebrew");
    return "killebrew";
  } else if (playerName === "Frank Thomas") {
    checkAndRemove("thomas");
    return "thomas";
  } else if (playerName === "Stan Musial") {
    checkAndRemove("musial");
    return "musial";
  } else if (playerName === "Anthony Rizzo") {
    checkAndRemove("rizzo");
    return "rizzo";
  } else if (playerName === "Mark Teixeira") {
    checkAndRemove("teixeira");
    return "teixeira";
  } else if (playerName === "Eddie Murray") {
    checkAndRemove("murray");
    return "murray";
  } else if (playerName === "Airbud") {
    checkAndRemove("airbud");
    return "airbud";
  } else if (playerName === "Ryne Sandberg") {
    checkAndRemove("sandberg");
    return "sandberg";
  } else if (playerName === "Jackie Robinson") {
    checkAndRemove("robinson");
    return "robinson";
  } else if (playerName === "Roberto Alomar") {
    checkAndRemove("alomar");
    return "alomar";
  } else if (playerName === "Robinson Cano") {
    checkAndRemove("cano");
    return "cano";
  } else if (playerName === "Nellie Fox") {
    checkAndRemove("fox");
    return "fox";
  } else if (playerName === "Rod Carew") {
    checkAndRemove("carew");
    return "carew";
  } else if (playerName === "Glenn Beckert") {
    checkAndRemove("beckert");
    return "beckert";
  } else if (playerName === "Roberto Alomar") {
    checkAndRemove("alomar");
    return "alomar";
  } else if (playerName === "Nomar Garciaparra") {
    checkAndRemove("garciaparra");
    return "garciaparra";
  } else if (playerName === "Jimmy Rollins") {
    checkAndRemove("rollins");
    return "rollins";
  } else if (playerName === "Cal Ripken Jr.") {
    checkAndRemove("ripken");
    return "ripken";
  } else if (playerName === "Ozzie Smith") {
    checkAndRemove("smith");
    return "smith";
  } else if (playerName === "Robin Yount") {
    checkAndRemove("yount");
    return "yount";
  } else if (playerName === "Derek Jeter") {
    checkAndRemove("jeter");
    return "jeter";
  } else if (playerName === "Chipper Jones") {
    checkAndRemove("jones");
    return "jones";
  } else if (playerName === "Ron Santo") {
    checkAndRemove("santo");
    return "santo";
  } else if (playerName === "Wade Boggs") {
    checkAndRemove("boggs");
    return "boggs";
  } else if (playerName === "Robin Ventura") {
    checkAndRemove("ventura");
    return "ventura";
  } else if (playerName === "Mike Schmidt") {
    checkAndRemove("schmidt");
    return "schmidt";
  } else if (playerName === "Adrian Beltre") {
    checkAndRemove("beltre");
    return "beltre";
  } else if (playerName === "Babe Ruth") {
    checkAndRemove("ruth");
    return "ruth";
  } else if (playerName === "Rickey Henderson") {
    checkAndRemove("henderson");
    return "henderson";
  } else if (playerName === "Bob Gibson") {
    checkAndRemove("gibson");
    return "gibson";
  } else if (playerName === "Manny Ramirez") {
    checkAndRemove("ramirez");
    return "ramirez";
  } else if (playerName === "Carl Yastrzemski") {
    checkAndRemove("yastrzemski");
    return "yastrzemski";
  } else if (playerName === "Billy Williams") {
    checkAndRemove("williams");
    return "williams";
  } else if (playerName === "Lou Brock") {
    checkAndRemove("brock");
    return "brock";
  } else if (playerName === "Mike Trout") {
    checkAndRemove("trout");
    return "trout";
  } else if (playerName === "Luke Sclamberg") {
    checkAndRemove("sclamberg");
    return "sclamberg";
  } else if (playerName === "Mickey Mantle") {
    checkAndRemove("mantle");
    return "mantle";
  } else if (playerName === "Ken Griffey Jr.") {
    checkAndRemove("griffey");
    return "griffey";
  } else if (playerName === "Joe DiMaggio") {
    checkAndRemove("dimaggio");
    return "dimaggio";
  } else if (playerName === "Bo Jackson") {
    checkAndRemove("jackson");
    return "jackson";
  } else if (playerName === "Andre Dawson") {
    checkAndRemove("dawson");
    return "dawson";
  } else if (playerName === "Billy Hamilton") {
    checkAndRemove("hamilton");
    return "hamilton";
  } else if (playerName === "Darryl Strawberry") {
    checkAndRemove("strawb");
    return "strawb";
  } else if (playerName === "Ichiro") {
    checkAndRemove("ichiro");
    return "ichiro";
  } else if (playerName === "Hank Aaron") {
    checkAndRemove("aaron");
    return "aaron";
  } else if (playerName === "Roberto Clemente") {
    checkAndRemove("clemente");
    return "clemente";
  } else if (playerName === "Roger Maris") {
    checkAndRemove("maris");
    return "maris";
  } else if (playerName === "Wilson Contreras") {
    checkAndRemove("contreras");
    return "contreras";
  } else if (playerName === "Carlton Fisk") {
    checkAndRemove("fisk");
    return "fisk";
  } else if (playerName === "Johnny Bench") {
    checkAndRemove("bench");
    return "bench";
  } else if (playerName === "George Brett") {
    checkAndRemove("brett");
    return "brett";
  } else if (playerName === "David Ross") {
    checkAndRemove("ross");
    return "ross";
  } else if (playerName === "David Ortiz") {
    checkAndRemove("ortiz");
    return "ortiz";
  } else if (playerName === "Barry Bonds") {
    checkAndRemove("bonds");
    return "bonds";
  } else if (playerName === "Sammy Sosa") {
    checkAndRemove("sosa");
    return "sosa";
  } else if (playerName === "Chili Davis") {
    checkAndRemove("davis");
    return "davis";
  } else if (playerName === "Jim Thome") {
    checkAndRemove("thome");
    return "thome";
  } else if (playerName === "Edgar Martinez") {
    checkAndRemove("emartinez");
    return "emartinez";
  } else if (playerName === "Yogi Berra") {
    checkAndRemove("berra");
    return "berra";
  } else if (playerName === "Joe Torre") {
    checkAndRemove("torre");
    return "torre";
  } else if (playerName === "Frank Robinson") {
    checkAndRemove("frobinson");
    return "frobinson";
  } else if (playerName === "Brooks Robinson") {
    checkAndRemove("brobinson");
    return "brobinson";
  } else if (playerName === "Ted Williams") {
    checkAndRemove("twilliams");
    return "twilliams";
  } else if (playerName === "Vladamir Guerrero Sr.") {
    checkAndRemove("vlad");
    return "vlad";
  } else if (playerName === "Ivan Rodriguez") {
    checkAndRemove("pudge");
    return "pudge";
  } else if (playerName === "Buster Posey") {
    checkAndRemove("posey");
    return "posey";
  } else if (playerName === "Joe Morgan") {
    checkAndRemove("morgan");
    return "morgan";
  }
}

//******************************************************************************* \\
//******************************************************************************* \\

function selectBatter(yourChoice) {
  var prevLineupNames = [
    lineup.pitcher.name,
    lineup.catcher.name,
    lineup.firstBase.name,
    lineup.secondBase.name,
    lineup.shortstop.name,
    lineup.thirdBase.name,
    lineup.leftField.name,
    lineup.centerField.name,
    lineup.rightField.name,
    lineup.designatedHitter.name,
  ];

  if (yourChoice.id === "baez") {
    lineup.shortstop = {
      name: "Javy Baez",
      handedness: "R",
      ave: 0.3,
      slugP: 0.6,
    };
  } else if (yourChoice.id === "trout") {
    lineup.centerField = {
      name: "Mike Trout",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ruth") {
    lineup.leftField = {
      name: "Babe Ruth",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "griffey") {
    lineup.centerField = {
      name: "Ken Griffey Jr.",
      handedness: "R",
      ave: 0.315,
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
      ave: 0.315,
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
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "jeter") {
    lineup.shortstop = {
      name: "Derek Jeter",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "strawb") {
    lineup.rightField = {
      name: "Darryl Strawberry",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "mantle") {
    lineup.centerField = {
      name: "Mickey Mantle",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "killebrew") {
    lineup.firstBase = {
      name: "Harmon Killebrew",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "pujols") {
    lineup.firstBase = {
      name: "Albert Pujols",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "sandberg") {
    lineup.secondBase = {
      name: "Ryne Sandberg",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "alomar") {
    lineup.secondBase = {
      name: "Roberto Alomar",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "jones") {
    lineup.thirdBase = {
      name: "Chipper Jones",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "santo") {
    lineup.thirdBase = {
      name: "Ron Santo",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "brock") {
    lineup.leftField = {
      name: "Lou Brock",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "henderson") {
    lineup.leftField = {
      name: "Rickey Henderson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "fisk") {
    lineup.catcher = {
      name: "Carlton Fisk",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "aaron") {
    lineup.rightField = {
      name: "Hank Aaron",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ichiro") {
    lineup.rightField = {
      name: "Ichiro",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "cano") {
    lineup.secondBase = {
      name: "Robinson Cano",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "thomas") {
    lineup.firstBase = {
      name: "Frank Thomas",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "garciaparra") {
    lineup.shortstop = {
      name: "Nomar Garciaparra",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "robinson") {
    lineup.secondBase = {
      name: "Jackie Robinson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "musial") {
    lineup.firstBase = {
      name: "Stan Musial",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "bench") {
    lineup.catcher = {
      name: "Johnny Bench",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ross") {
    lineup.catcher = {
      name: "David Ross",
      handedness: "R",
      ave: 0.315,
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
  } else if (yourChoice.id === "bonds") {
    lineup.designatedHitter = {
      name: "Barry Bonds",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "emartinez") {
    lineup.designatedHitter = {
      name: "Edgar Martinez",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "sosa") {
    lineup.designatedHitter = {
      name: "Sammy Sosa",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "thome") {
    lineup.designatedHitter = {
      name: "Jim Thome",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ortiz") {
    lineup.designatedHitter = {
      name: "David Ortiz",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "davis") {
    lineup.designatedHitter = {
      name: "Chili Davis",
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

  changeStuff(yourChoice, prevLineupNames);
}

//******************************************************************************* \\
//******************************************************************************* \\

function logging() {
  var headingLineup = document.createTextNode("Selected Lineup");

  document.getElementById("headingL").appendChild(headingLineup);

  var team = document.createElement("p");
  team.setAttribute("id", "team1");
  var listed8 = document.createTextNode(" C: " + lineup.catcher.name);
  team.appendChild(listed8);
  var listed = document.createTextNode(" 1B: " + lineup.firstBase.name);
  team.appendChild(listed);
  var listed2 = document.createTextNode(" 2B: " + lineup.secondBase.name);
  team.appendChild(listed2);
  var listed3 = document.createTextNode(" SS: " + lineup.shortstop.name);
  team.appendChild(listed3);
  var listed4 = document.createTextNode(" 3B: " + lineup.thirdBase.name);
  team.appendChild(listed4);
  var listed5 = document.createTextNode(" LF: " + lineup.leftField.name);
  team.appendChild(listed5);
  var listed6 = document.createTextNode(" CF: " + lineup.centerField.name);
  team.appendChild(listed6);
  var listed7 = document.createTextNode(" RF: " + lineup.rightField.name);
  team.appendChild(listed7);
  var listed8 = document.createTextNode(" DH: " + lineup.designatedHitter.name);
  team.appendChild(listed8);

  document.getElementById("result").appendChild(team);
}

//******************************************************************************* \\
//******************************************************************************* \\

function displaySelectedLineup() {
  var squad = JSON.parse(localStorage.getItem("lineup"));
  getImageofPlayer(squad.leftField.name, "left");
  getImageofPlayer(squad.rightField.name, "right");
  getImageofPlayer(squad.centerField.name, "center");
  getImageofPlayer(squad.firstBase.name, "first");
  getImageofPlayer(squad.secondBase.name, "second");
  getImageofPlayer(squad.shortstop.name, "short");
  getImageofPlayer(squad.thirdBase.name, "third");
  getImageofPlayer(squad.pitcher.name, "pitcher");
  getImageofPlayer(squad.catcher.name, "catcher");
  getImageofPlayer(squad.designatedHitter.name, "designatedHitter");
  var squad2 = JSON.parse(localStorage.getItem("lineup2"));
  console.log(squad2);
  getImageofPlayer(squad2.leftField.name, "left2");
  getImageofPlayer(squad2.rightField.name, "right2");
  getImageofPlayer(squad2.centerField.name, "center2");
  getImageofPlayer(squad2.firstBase.name, "first2");
  getImageofPlayer(squad2.secondBase.name, "second2");
  getImageofPlayer(squad2.shortstop.name, "short2");
  getImageofPlayer(squad2.thirdBase.name, "third2");
  getImageofPlayer(squad2.pitcher.name, "pitcher2");
  getImageofPlayer(squad2.catcher.name, "catcher2");
  getImageofPlayer(squad2.designatedHitter.name, "designatedHitter2");

  logIt();

  populateLists();
  document.getElementById("showLin").remove();
}

//******************************************************************************* \\
//******************************************************************************* \\

function logValue() {
  //Add the player selected to the batting order
  var selected = document.getElementById("bo1").value;
  var menu = document.getElementById("bo1").options;
  for (var k = 0; k < menu.length; k++) {
    if (menu[k].value == selected) {
      if (k == 0) {
        return 0;
      }
    }
  }

  battingOrderHome.push(selected);
  console.log(battingOrderHome);

  //Checking if submission was the "select player", if so return
  for (var i = 0; i < menu.length; i++) {
    if (menu[i].value == selected) {
      return i;
    }
  }

  return selected;
}

//******************************************************************************* \\
//******************************************************************************* \\

function moveToNextLine() {
  var positionSelected = logValue();
  if (positionSelected == 0) {
    return;
  }

  spot++;
  if (spot == 7) {
    document.getElementById("homeOrder").innerHTML =
      "Select Last player and Submit lineup";
  }
  if (spot == 8) {
    document.getElementById("bo1").remove();
    document.getElementById("homeOrder").remove();

    localStorage.setItem("baHome", JSON.stringify(battingOrderHome));
    if (spot2 == 8) {
      var linkIt = document.createElement("a");
      var txxt = document.createTextNode("Click to go to Simulation");
      linkIt.title = "Click to go to Simulation";
      linkIt.appendChild(txxt);
      document.getElementById("paster").appendChild(linkIt);
    }
    return;
  }
  var menu = document.getElementById("bo1");
  menu.remove(0);
  var option = document.createElement("OPTION");
  var headNode = document.createTextNode(
    "Select " + orderWords[spot] + " batter"
  );
  option.appendChild(headNode);
  menu.insertBefore(option, menu.firstChild);
  menu.remove(positionSelected);
}

//******************************************************************************* \\
//******************************************************************************* \\

function moveToNextLineAway() {
  var positionSelected = logValueAway();

  if (positionSelected == 0) {
    return;
  }
  spot2++;
  if (spot2 == 7) {
    document.getElementById("awayOrder").innerHTML =
      "Select Last player and Submit lineup";
  }
  if (spot2 == 8) {
    document.getElementById("bo2").remove();
    document.getElementById("awayOrder").remove();
    localStorage.setItem("baAway", JSON.stringify(battingOrderAway));
    if (spot == 8) {
      var linkIt = document.createElement("a");
      var txxt = document.createTextNode("Click to go to Simulation");
      linkIt.title = "Click to go to Simulation";
      linkIt.appendChild(txxt);
      linkIt.href = "sim.html";
      document.getElementById("paster").appendChild(linkIt);
    }
    return;
  }
  var menu = document.getElementById("bo2");
  menu.remove(0);
  var option = document.createElement("OPTION");
  var headNode = document.createTextNode(
    "Select " + orderWords[spot2] + " batter"
  );
  option.appendChild(headNode);
  menu.insertBefore(option, menu.firstChild);
  menu.remove(positionSelected);
}

//******************************************************************************* \\
//******************************************************************************* \\

function logValueAway() {
  var selected = document.getElementById("bo2").value;
  var menu = document.getElementById("bo2").options;
  for (var k = 0; k < menu.length; k++) {
    if (menu[k].value == selected) {
      if (k == 0) {
        return 0;
      }
    }
  }
  battingOrderAway.push(selected);

  for (var i = 0; i < menu.length; i++) {
    if (menu[i].value == selected) {
      return i;
    }
  }
  return selected;
}

//******************************************************************************* \\
//******************************************************************************* \\

function populateLists() {
  var menu = document.getElementById("bo1");
  var arr = [
    lineup.catcher.name,
    lineup.firstBase.name,
    lineup.secondBase.name,
    lineup.shortstop.name,
    lineup.thirdBase.name,
    lineup.leftField.name,
    lineup.centerField.name,
    lineup.rightField.name,
    lineup.designatedHitter.name,
  ];

  for (var i = 0; i < arr.length; i++) {
    var option = document.createElement("OPTION");
    var txt = document.createTextNode(arr[i]);
    option.appendChild(txt);
    menu.insertBefore(option, menu.lastChild);
  }

  var menu2 = document.getElementById("bo2");
  var arr2 = [
    lineup2.catcher.name,
    lineup2.firstBase.name,
    lineup2.secondBase.name,
    lineup2.shortstop.name,
    lineup2.thirdBase.name,
    lineup2.leftField.name,
    lineup2.centerField.name,
    lineup2.rightField.name,
    lineup2.designatedHitter.name,
  ];

  for (var i = 0; i < arr2.length; i++) {
    var option = document.createElement("OPTION");
    var txt = document.createTextNode(arr2[i]);
    option.appendChild(txt);
    menu2.insertBefore(option, menu2.lastChild);
  }
}

//******************************************************************************* \\
//******************************************************************************* \\

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

  document.getElementById(position).setAttribute("id", playerName);
}

//******************************************************************************* \\
//******************************************************************************* \\

function displayPitcher(pitcher) {
  var h1 = document.createElement("h4");
  var answer = document.createTextNode("Pitching: " + pitcher.name);
  h1.setAttribute("id", "resultA");
  h1.appendChild(answer);
  document.getElementById("result").appendChild(h1);
}

//******************************************************************************* \\
//******************************************************************************* \\

function displayBatter(batter) {
  var h1 = document.createElement("h2");
  var answer = document.createTextNode(batter.name);
  h1.setAttribute("id", "resultB");
  h1.appendChild(answer);
  document.getElementById("result").appendChild(h1);
}

//******************************************************************************* \\
//******************************************************************************* \\

function resetPitcher() {
  document.getElementById("resultA").remove();
  called = false;
  picked--;
}

//******************************************************************************* \\
//******************************************************************************* \\

function resetBatter() {
  document.getElementById("resultB").remove();
  calledTwo = false;
  picked--;
}

//******************************************************************************* \\
//******************************************************************************* \\

function deleteSomething() {
  document.getElementById("dataTwo").remove();

  document.getElementById("data").remove();

  resetPitcher();
  resetBatter();
}

//******************************************************************************* \\
//******************************************************************************* \\

function atBat(pitcher, batter) {
  //Define variables needed to be assigned based on handedness of opposing player
  var pitcherAve;
  var batterAve;
  var outcomeAB;

  //If the batter is right handed, then use the ave against righty #
  if (batter.handedness == "R") {
    pitcherAve = pitcher.aveAgainst;
  } else {
    //If they're lefty call the lefty average
    pitcherAve = pitcher.aveAgainst;
  }

  //Do they same to get which batter ave to use
  if (pitcher.handedness == "R") {
    batterAve = batter.ave;
  } else {
    //If they're lefty call the lefty average
    batterAve = batter.ave;
  }

  //Now make an adjusted average that they get a hit
  var aveAdjust = (1.07 * batterAve + pitcherAve) / 2;

  //simulate the at-bat using a random number generator to see if it's within aveAdjust
  var hitNum = Math.random();

  if (hitNum <= aveAdjust) {
    outcomeAB = "hit";
  } else {
    outcomeAB = "out";
  }

  return outcomeAB;
}

//******************************************************************************* \\
//******************************************************************************* \\

function hit() {
  //Use appropriate slugging percentage to determine hit
  var pSlg;
  var hSlg;

  //If the batter is right handed, then use the slg% against righty #
  if (batter.handedness == "R") {
    pSlg = pitcher.slgP;
  } else {
    //If they're lefty call the lefty slg%
    pSlg = pitcher.slgP;
  }

  //Do they same to get which batter slg% to use
  if (pitcher[5] == "R") {
    hSlg = batter.slgP;
  } else {
    hSlg = batter.slgP;
  }

  var slugAdj = (hSlg + pSlg) / 2;

  //Numbers based on 2012 hit distribution stats
  var hr = 0.118;
  var triple = 0.02;
  var single = 0.664;
  var double = 0.198;

  //If over league ave + standard deviation
  if (slugAdj > 0.408) {
    var difference = slugAdj - 0.408;
    var amount = Math.round(difference / 0.02);

    hr += amount * 0.001;
    double += amount * 0.001;
    triple += amount * 0.001;
    single = single - amount * 0.003;
  }
  var total = single + triple + double + hr;

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

//******************************************************************************* \\
//******************************************************************************* \\

function submitLineup() {
  if (allSelectedPlayers.length - deSelectedPlayers.length == 10) {
    logging();
    displayPitcher(pitcher);
    localStorage.setItem("lineup", JSON.stringify(lineup));
  } else {
    alert(
      "Missing one or more players, make sure all positions have a selection"
    );
  }
}

//******************************************************************************* \\
//******************************************************************************* \\

function logIt() {
  lineup = JSON.parse(localStorage.getItem("lineup"));
  lineup2 = JSON.parse(localStorage.getItem("lineup2"));
}
