//GLOBALS
//******************************************************************************* */

var pitcher, batter;
var selectedPlayers = ["jenny", "leon"];
var deSelectedPlayers = [""];
var allSelectedPlayers = [""];
var lineup = {
  firstBase: "",
  secondBase: "",
  thirdBase: "",
  shortstop: "",
  catcher: "",
  leftField: "",
  rightField: "",
  centerField: "",
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

var called = false;
var calledTwo = false;
var picked = 0;

//******************************************************************************* \\
//******************************************************************************* \\

function selectBatterTwo(yourChoice) {
  var prevLineupNames = [
    lineup2.pitcher.name,
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
  if (yourChoice.id === "baez") {
    lineup2.shortstop = {
      name: "Javy Baez",
      handedness: "R",
      ave: 0.3,
      slugP: 0.6,
    };
  } else if (yourChoice.id === "trout") {
    lineup2.centerField = {
      name: "Mike Trout",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ruth") {
    lineup2.leftField = {
      name: "Babe Ruth",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "griffey") {
    lineup2.centerField = {
      name: "Ken Griffey Jr.",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "jackson") {
    lineup2.centerField = {
      name: "Bo Jackson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "sclamberg") {
    lineup2.centerField = {
      name: "Luke Sclamberg",
      handedness: "R",
      ave: 0.8,
      slugP: 1.7,
    };
  } else if (yourChoice.id === "trouty") {
    lineup2.shortstop = {
      name: "Ashley Troutman",
      handedness: "R",
      ave: 0.6,
      slugP: 1.1,
    };
  } else if (yourChoice.id === "contreras") {
    lineup2.catcher = {
      name: "Wilson Contreras",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "jeter") {
    lineup2.thirdBase = {
      name: "Derek Jeter",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "strawb") {
    lineup2.rightField = {
      name: "Darryl Strawberry",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "mantle") {
    lineup2.centerField = {
      name: "Mickey Mantle",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "killebrew") {
    lineup2.firstBase = {
      name: "Harmon Killebrew",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "pujols") {
    lineup2.firstBase = {
      name: "Albert Pujols",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "sandberg") {
    lineup2.secondBase = {
      name: "Ryne Sandberg",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "alomar") {
    lineup2.secondBase = {
      name: "Roberto Alomar",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "jones") {
    lineup2.thirdBase = {
      name: "Chipper Jones",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "santo") {
    lineup2.thirdBase = {
      name: "Ron Santo",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "brock") {
    lineup2.leftField = {
      name: "Lou Brock",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "henderson") {
    lineup2.leftField = {
      name: "Rickey Henderson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "fisk") {
    lineup2.catcher = {
      name: "Carlton Fisk",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "aaron") {
    lineup2.rightField = {
      name: "Hank Aaron",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ichiro") {
    lineup2.rightField = {
      name: "Ichiro",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "cano") {
    lineup2.secondBase = {
      name: "Robinson Cano",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "musial") {
    lineup2.firstBase = {
      name: "Stan Musial",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "thomas") {
    lineup2.firstBase = {
      name: "Frank Thomas",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "garciaparra") {
    lineup2.shortstop = {
      name: "Nomar Garciaparra",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "robinson") {
    lineup2.secondBase = {
      name: "Jackie Robinson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "bench") {
    lineup2.catcher = {
      name: "Johnny Bench",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ross") {
    lineup2.catcher = {
      name: "David Ross",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "teixeira") {
    lineup2.firstBase = {
      name: "Mark Teixeira",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "rollins") {
    lineup2.shortstop = {
      name: "Jimmy Rollins",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "hamilton") {
    lineup2.centerField = {
      name: "Billy Hamilton",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "boggs") {
    lineup2.thirdBase = {
      name: "Wade Boggs",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ventura") {
    lineup2.thirdBase = {
      name: "Robin Ventura",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "fox") {
    lineup2.secondBase = {
      name: "Nellie Fox",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "murray") {
    lineup2.firstBase = {
      name: "Eddie Murray",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ramirez") {
    lineup2.leftField = {
      name: "Manny Ramirez",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "dimaggio") {
    lineup2.centerField = {
      name: "Joe DiMaggio",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "dawson") {
    lineup2.centerField = {
      name: "Andre Dawson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "brett") {
    lineup2.firstBase = {
      name: "George Brett",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "rizzo") {
    lineup2.firstBase = {
      name: "Anthony Rizzo",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "carew") {
    lineup2.secondBase = {
      name: "Rod Carew",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "clemente") {
    lineup2.rightField = {
      name: "Roberto Clemente",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "maris") {
    lineup2.rightField = {
      name: "Roger Maris",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "smith") {
    lineup2.shortstop = {
      name: "Ozzie Smith",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ripken") {
    lineup2.shortstop = {
      name: "Cal Ripken Jr.",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "yastrzemski") {
    lineup2.leftField = {
      name: "Carl Yastrzemski",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "williams") {
    lineup2.leftField = {
      name: "Billy Williams",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "beltre") {
    lineup2.thirdBase = {
      name: "Adrian Beltre",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "schmidt") {
    lineup2.thirdBase = {
      name: "Mike Schmidt",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "beckert") {
    lineup2.secondBase = {
      name: "Glenn Beckert",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "airbud") {
    lineup2.firstBase = {
      name: "Airbud",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "yount") {
    lineup2.shortstop = {
      name: "Robin Yount",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "bonds") {
    lineup2.designatedHitter = {
      name: "Barry Bonds",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "emartinez") {
    lineup2.designatedHitter = {
      name: "Edgar Martinez",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "sosa") {
    lineup2.designatedHitter = {
      name: "Sammy Sosa",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "thome") {
    lineup2.designatedHitter = {
      name: "Jim Thome",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "ortiz") {
    lineup2.designatedHitter = {
      name: "David Ortiz",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "davis") {
    lineup2.designatedHitter = {
      name: "Chili Davis",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "berra") {
    lineup2.catcher = {
      name: "Yogi Berra",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "pudge") {
    lineup2.catcher = {
      name: "Ivan Rodriguez",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "posey") {
    lineup2.catcher = {
      name: "Buster Posey",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "vlad") {
    lineup2.rightField = {
      name: "Vladamir Guerrero Sr.",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "frobinson") {
    lineup2.rightField = {
      name: "Frank Robinson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "brobinson") {
    lineup2.thirdBase = {
      name: "Brooks Robinson",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "morgan") {
    lineup2.secondBase = {
      name: "Joe Morgan",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "twilliams") {
    lineup2.leftField = {
      name: "Ted Williams",
      handedness: "R",
      ave: 0.315,
      slugP: 0.7,
    };
  } else if (yourChoice.id === "torre") {
    lineup2.catcher = {
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

function submitLineup() {
  if (allSelectedPlayers.length - deSelectedPlayers.length == 10) {
    logging();
    displayPitcher(pitcher);
    localStorage.setItem("lineup2", JSON.stringify(lineup2));
  } else {
    alert(
      "Missing one or more players, make sure all positions have a selection"
    );
  }
}

//******************************************************************************* \\
//******************************************************************************* \\

function loadawayLineup() {
  var lineup = localStorage.getItem("lineup2");
  console.log(lineup.catcher);
  /*var name = lineup.catcher.name;
  var place = document.createTextNode().appendChild(name);
  document.getElementById("printing").appendChild(place);
  */
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
    "box-shadow: 0px 10px 50px 14px rgb(0, 10, 200)"
  );

  compareLineups(prevLineup);
}

//****************************************************** */
function alertIdiocy() {
  alert("Shame on you and your family.");
}
//******************************************************************************* \\
//******************************************************************************* \\

function selectPitcher(yourChoice) {
  var prevLineupNames = [
    lineup2.pitcher.name,
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
  lineup2.pitcher = pitcher;

  changeStuff(yourChoice, prevLineupNames);
  picked++;
}
//******************************************************************************* \\
//******************************************************************************* \\

function compareLineups(prevLineup) {
  var found = false;
  var foundPlayer;
  if (lineup2.pitcher.name !== prevLineup[0] && prevLineup[0] != null) {
    foundPlayer = prevLineup[0];
    found = true;
  } else if (lineup2.catcher.name !== prevLineup[1] && prevLineup[1] != null) {
    foundPlayer = prevLineup[1];
    found = true;
  } else if (
    lineup2.firstBase.name !== prevLineup[2] &&
    prevLineup[2] != null
  ) {
    foundPlayer = prevLineup[2];
    found = true;
  } else if (
    lineup2.secondBase.name !== prevLineup[3] &&
    prevLineup[3] != null
  ) {
    foundPlayer = prevLineup[3];
    found = true;
  } else if (
    lineup2.shortstop.name !== prevLineup[4] &&
    prevLineup[4] != null
  ) {
    foundPlayer = prevLineup[4];
    found = true;
  } else if (
    lineup2.thirdBase.name !== prevLineup[5] &&
    prevLineup[5] != null
  ) {
    foundPlayer = prevLineup[5];
    found = true;
  } else if (
    lineup2.leftField.name !== prevLineup[6] &&
    prevLineup[6] != null
  ) {
    foundPlayer = prevLineup[6];
    found = true;
  } else if (
    lineup2.centerField.name !== prevLineup[7] &&
    prevLineup[7] != null
  ) {
    foundPlayer = prevLineup[7];
    found = true;
  } else if (
    lineup2.rightField.name !== prevLineup[8] &&
    prevLineup[8] != null
  ) {
    foundPlayer = prevLineup[8];
    found = true;
  } else if (
    lineup2.designatedHitter.name !== prevLineup[9] &&
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

//******************************************************************************* \\
//******************************************************************************* \\

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

//******************************************************************************* \\
//******************************************************************************* \\
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
  } else if (playerName === "Robin Yount") {
    checkAndRemove("yount");
    return "yount";
  } else if (playerName === "Derek Jeter") {
    checkAndRemove("jeter");
    return "jeter";
  } else if (playerName === "Yogi Berra") {
    checkAndRemove("berra");
    return "berra";
  } else if (playerName === "Cal Ripken Jr.") {
    checkAndRemove("ripken");
    return "ripken";
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
//******************************************************************************* \\
//******************************************************************************* \\
function logging() {
  var headingLineup = document.createTextNode("Selected Lineup");

  document.getElementById("headingL").appendChild(headingLineup);

  var team = document.createElement("p");
  team.setAttribute("id", "team1");
  var listed8 = document.createTextNode(" C: " + lineup2.catcher.name);
  team.appendChild(listed8);
  var listed = document.createTextNode(" 1B: " + lineup2.firstBase.name);
  team.appendChild(listed);
  var listed2 = document.createTextNode(" 2B: " + lineup2.secondBase.name);
  team.appendChild(listed2);
  var listed3 = document.createTextNode(" SS: " + lineup2.shortstop.name);
  team.appendChild(listed3);
  var listed4 = document.createTextNode(" 3B: " + lineup2.thirdBase.name);
  team.appendChild(listed4);
  var listed5 = document.createTextNode(" LF: " + lineup2.leftField.name);
  team.appendChild(listed5);
  var listed6 = document.createTextNode(" CF: " + lineup2.centerField.name);
  team.appendChild(listed6);
  var listed7 = document.createTextNode(" RF: " + lineup2.rightField.name);
  team.appendChild(listed7);
  var listed8 = document.createTextNode("DH:" + lineup2.designatedHitter.name);
  team.appendChild(listed8);

  /*
  var listed8 = document.createTextNode(" C: " + squad.catcher.name);
  team.appendChild(listed8);
  var listed = document.createTextNode(" 1B: " + squad.firstBase.name);
  team.appendChild(listed);
  var listed2 = document.createTextNode(" 2B: " + squad.secondBase.name);
  team.appendChild(listed2);
  var listed3 = document.createTextNode(" SS: " + squad.shortstop.name);
  team.appendChild(listed3);
  var listed4 = document.createTextNode(" 3B: " + squad.thirdBase.name);
  team.appendChild(listed4);
  var listed5 = document.createTextNode(" LF: " + squad.leftField.name);
  team.appendChild(listed5);
  var listed6 = document.createTextNode(" CF: " + squad.centerField.name);
  team.appendChild(listed6);
  var listed7 = document.createTextNode(" RF: " + squad.rightField.name);
  team.appendChild(listed7);
  var listed7 = document.createTextNode(" P: " + squad.pitcher.name);
  team.appendChild(listed7);

  */

  document.getElementById("result").appendChild(team);
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
