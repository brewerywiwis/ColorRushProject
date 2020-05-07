function startTimer() {
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;
  setInterval(setTime, 1000);

  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
}

const width = 500;
const height = 500;
const outerFrame = 30;
const innerFrame = 30;
const maxLevel = 50;
const colorVary = 20;
var nowLevel = 1;
var difficult = 4;
var s = 10;
var stage;

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

function newGame() {
  ///////////////////////////////////////////////////////////
  function gameWin() {
    var winLayer = new Konva.Layer();
    var bg = new Konva.Rect({
      width: width,
      height: height,
      fill: "Snow",
    });
    var button = new Konva.Rect({
      width: 100,
      height: 100,
      fill: "blue",
      cornerRadius: 10,
    })
      .on("mouseover", () => {
        stage.container().style.cursor = "pointer";
      })
      .on("mouseout", () => {
        stage.container().style.cursor = "default";
      })
      .on("click", () => {
        newGame();
      });
    winLayer.add(bg, button);
    return winLayer;
  }
  ///////////////////////////////////////////////////////////
  function gameLose() {
    var loseLayer = new Konva.Layer();
    var bg = new Konva.Rect({
      width: width,
      height: height,
      fill: "#FFF0F5",
    });
    var showScore = new Konva.Text({
      y: 100,
      text: "Score : "+(nowLevel),
      fontFamily: 'Julius Sans One',
      fontSize: 60,
      fill: "#555",
      padding: 20,
      width: stage.width(),
      align: "center",
      font: "Cordia New",
    });
    var text1 = new Konva.Text({
      y: 200,
      text: "You are excellent",
      fontFamily: 'Julius Sans One',
      fontSize: 22,
      fill: "#555",
      padding: 20,
      width: stage.width(),
      align: "center",
    });
    var text2 = new Konva.Text({
      y: 350,
      text: "PLAY AGAIN",
      fontFamily: 'Julius Sans One',
      fontSize: 33,
      fill: "#555",
      padding: 20,
      width: stage.width(),
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
        newGame();
      });

    var button = new Konva.Rect({
      x: stage.width()/3.7,
      y: 350,
      width: 230,
      height: text2.height(),
      fill: "#FFFAFA",
      cornerRadius: 5,
    });
    loseLayer.add(bg, button, showScore, text1, text2);
    stage.destroyChildren();
    stage.add(loseLayer);
  }
  ///////////////////////////////////////////////////////////
  function nextLevel() {
    nowLevel++;
    var nextLevelLayer = createLevel();
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
    stage.destroyChildren();
    stage.add(bgLayer, nextLevelLayer);
  }
  ////////////////////////////////////////////////////////
  function createLevel() {
    if (nowLevel > maxLevel) {
      return gameWin();
    }
    var score = document.getElementById('score')
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
            difficult * i + j === rand[2] ? nextLevel() : gameLose();
          });
        levelLayer.add(box);
      }
    }
    return levelLayer;
  }
  ///////////////////////////////////////////////////////////
  nowLevel = 0;
  difficult = 3;
  s = 10;
  var stage = new Konva.Stage({
    container: "game",
    width: width,
    height: height,
  });
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

  stage.add(bgLayer, levelLayer);
}

newGame();
startTimer();
