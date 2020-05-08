const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
var totalSeconds;
var timer;

function startTimer() {
  totalSeconds = 0;
  setTime();
  timer = setInterval(setTime, 1000);
}

function stopTimer() {
  clearInterval(timer);
  totalSeconds = 0;
  setTime();
}

function setTime() {
  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  totalSeconds++;
}

function showHideTimeScore(show) {
  var tl = document.getElementById("topleft");
  var tr = document.getElementById("topright");
  if (show) {
    tl.style.visibility = "visible";
    tr.style.visibility = "visible";
  } else {
    tl.style.visibility = "hidden";
    tr.style.visibility = "hidden";
  }
}

function randomCorrectFakeBoxwithColor(difficult) {
  var R = Math.floor(Math.random() * 255);
  var G = Math.floor(Math.random() * 255);
  var B = Math.floor(Math.random() * 255);
  var rgb_invalid = "rgb(" + R + "," + G + "," + B + ")";
  var rgb_correct =
    "rgb(" +
    (R + colorVary) +
    "," +
    (G + colorVary) +
    "," +
    (B + colorVary) +
    ")";
  var n = Math.floor(Math.random() * difficult);
  return [rgb_invalid, rgb_correct, n];
}

const width = 500;
const height = 500;
const outerFrame = 30;
const innerFrame = 30;
const colorVary = 20;
const clickSound = document.getElementById("clickSound");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const endSceneSound = document.getElementById("endSceneSound");
var nowLevel;
var difficult;
var s;
var stage;

function startGame() {
  showHideTimeScore(false);
  stage = new Konva.Stage({
    container: "game",
    width: width,
    height: height,
  });
  var startLayer = new Konva.Layer();
  var bg = new Konva.Rect({
    width: width,
    height: height,
    fill: "#FFF0F5",
  });
  var text1 = new Konva.Text({
    y: 100,
    text: "COLORRUSH",
    fontFamily: "Julius Sans One",
    fontSize: 60,
    fill: "#555",
    padding: 20,
    width: stage.width(),
    align: "center",
  });
  var text2 = new Konva.Text({
    y: 200,
    text: "How well do your eyes distingush colors?",
    fontFamily: 'Poiret One',
    fontSize: 22,
    fill: "#555",
    padding: 20,
    width: stage.width(),
    align: "center",
  });
  var text3 = new Konva.Text({
    x: stage.width() / 2 - 115,
    y: 348,
    text: "PLAY",
    fontFamily: "Julius Sans One",
    fontSize: 30,
    fill: "#555",
    padding: 20,
    width: 230,
    align: "center",
  })
    .on("mouseover", () => {
      stage.container().style.cursor = "pointer";
      button.fill("LightGray");
      startLayer.draw();
    })
    .on("mouseout", () => {
      stage.container().style.cursor = "default";
      button.fill("#FFFAFA");
      startLayer.draw();
    })
    .on("click", () => {
      clickSound.play();
      newGame();
      startTimer();
    });
  var button = new Konva.Rect({
    x: stage.width() / 3.7,
    y: 350,
    width: 230,
    height: text2.height(),
    fill: "#FFFAFA",
    cornerRadius: 5,
  });


  startLayer.add(bg,text1,text2,button,text3);
  stage.add(startLayer);
}
///////////////////////////////////////////////////////////
function newGame() {
  showHideTimeScore(true);
  totalSeconds = 0;
  nowLevel = 0;
  difficult = 3;
  s = 10;

  var bgLayer = new Konva.Layer();
  var outerBg = new Konva.Rect({
    width: width,
    height: height,
    fill: "Snow",
  });
  var innerBg = new Konva.Rect({
    x: innerFrame / 2,
    y: innerFrame / 2,
    width: width - innerFrame,
    height: height - innerFrame,
    fill: "white",
  });
  bgLayer.add(outerBg, innerBg);

  var levelLayer = createLevel();

  stage.destroyChildren();
  stage.add(bgLayer, levelLayer);
}
///////////////////////////////////////////////////////////
function gameLose() {
  showHideTimeScore(false);
  var loseLayer = new Konva.Layer();
  var bg = new Konva.Rect({
    width: width,
    height: height,
    fill: "#FFF0F5",
  });
  var showScore = new Konva.Text({
    y: 90,
    text: "Score : " + nowLevel,
    fontFamily: "Julius Sans One",
    fontSize: 60,
    fill: "#555",
    padding: 20,
    width: stage.width(),
    align: "center",
  });
  var showTime = new Konva.Text({
    y: 155,
    text: "Time : " + minutesLabel.innerHTML + ":" + secondsLabel.innerHTML,
    fontFamily: "Julius Sans One",
    fontSize: 55,
    fill: "#555",
    padding: 20,
    width: stage.width(),
    align: "center",
  });
  var text1 = new Konva.Text({
    y: 250,
    text: "Do you want to try again?",
    fontFamily: "Julius Sans One",
    fontSize: 22,
    fill: "#555",
    padding: 20,
    width: stage.width(),
    align: "center",
  });
  var text2 = new Konva.Text({
    x: stage.width() / 2 - 115,
    y: 350,
    text: "PLAY AGAIN",
    fontFamily: "Julius Sans One",
    fontSize: 30,
    fill: "#555",
    padding: 20,
    width: 230,
    align: "center",
  })
    .on("mouseover", () => {
      stage.container().style.cursor = "pointer";
      button.fill("LightGray");
      loseLayer.draw();
    })
    .on("mouseout", () => {
      stage.container().style.cursor = "default";
      button.fill("#FFFAFA");
      loseLayer.draw();
    })
    .on("click", () => {
      wrongSound.pause();
      wrongSound.currentTime = 0;
      clickSound.play();
      newGame();
      startTimer();
    });
  var button = new Konva.Rect({
    x: stage.width() / 3.7,
    y: 350,
    width: 230,
    height: text2.height(),
    fill: "#FFFAFA",
    cornerRadius: 5,
  });
  loseLayer.add(bg, showScore, showTime, text1, button, text2);
  stage.destroyChildren();
  stage.add(loseLayer);
}
///////////////////////////////////////////////////////////
function nextLevel() {
  nowLevel++;
  var bgLayer = new Konva.Layer();
  var outerBg = new Konva.Rect({
    width: width,
    height: height,
    fill: "Snow",
  });
  var innerBg = new Konva.Rect({
    x: innerFrame / 2,
    y: innerFrame / 2,
    width: width - innerFrame,
    height: height - innerFrame,
    fill: "white",
  });

  var nextLevelLayer = createLevel();

  bgLayer.add(outerBg, innerBg);
  stage.destroyChildren();
  stage.add(bgLayer, nextLevelLayer);
}
////////////////////////////////////////////////////////
function createLevel() {
  var score = document.getElementById("score");
  score.innerHTML = nowLevel;

  difficult = nowLevel % 4 === 0 ? ++difficult : difficult;
  var allFrame = outerFrame + innerFrame;
  var levelLayer = new Konva.Layer();
  var rand = randomCorrectFakeBoxwithColor(difficult ** 2 - 1);
  var d = Math.round((width - allFrame - (difficult - 1) * s) / difficult);
  while (d * difficult + s * (difficult - 1) > width) {
    s -= 0.1;
    d = Math.round((width - allFrame - (difficult - 1) * s) / difficult);
  }
  for (let i = 0; i < difficult; i++) {
    for (let j = 0; j < difficult; j++) {
      var box = new Konva.Rect({
        x: allFrame / 2 + j * (d + s),
        y: allFrame / 2 + i * (d + s),
        width: d,
        height: d,
        fill: difficult * i + j === rand[2] ? rand[1] : rand[0],
      })
        .on("mouseover", () => {
          stage.container().style.cursor = "pointer";
        })
        .on("mouseout", () => {
          stage.container().style.cursor = "default";
        })
        .on("click", () => {
          if (difficult * i + j === rand[2]) {
            clickSound.play();
            correctSound.play();
            nextLevel();
          } else {
            clickSound.play();
            wrongSound.play();
            gameLose();
            stopTimer();
          }
        });
      levelLayer.add(box);
    }
  }
  return levelLayer;
}
///////////////////////////////////////////////////////////

startGame();
