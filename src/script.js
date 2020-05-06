function f1(id) {
  var e = document.getElementById(id);
  if (e.style.display == "block") e.style.display = "none";
  else e.style.display = "block";
}
const width = 500;
const height = 500;
const maxLevel = 100;
var nowLevel = 1;
var difficult = 4;
var s = 5;
var stage;

function newGame() {
  /////////////////////////////////////////////////////
  function gameWin() {
    var winLayer = new Konva.Layer();
    var bg = new Konva.Rect({
      width: width,
      height: height,
      fill: "black",
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
    stage.destroyChildren();
    stage.add(winLayer);
  }
  ////////////////////////////////////////////////////////
  function checkWinOrLose() {
      //wait for implementing 
    console.log("click");
  }
  function createLevel() {
    if (nowLevel > maxLevel) {
      return gameWin();
    }
    var levelLayer = new Konva.Layer();
    difficult = nowLevel % 4 === 0 ? ++difficult : difficult;
    var d = Math.round((width - (difficult - 1) * s) / difficult);
    while (d * difficult + s * (difficult - 1) > width) {
      s -= 0.1;
      d = Math.round((width - (difficult - 1) * s) / difficult);
    }
    for (let i = 0; i < difficult; i++) {
      for (let j = 0; j < difficult; j++) {
        var box = new Konva.Rect({
          x: j * (d + s),
          y: i * (d + s),
          width: d,
          height: d,
          fill: "red",
        })
          .on("mouseover", () => {
            stage.container().style.cursor = "pointer";
          })
          .on("mouseout", () => {
            stage.container().style.cursor = "default";
          })
          .on("click", () => {
            checkWinOrLose();
          });
        levelLayer.add(box);
      }
    }
    return levelLayer;
  }
  nowLevel = 1;
  difficult = 4;
  s = 5;
  var stage = new Konva.Stage({
    container: "game",
    width: width,
    height: height,
  });
  var bgLayer = new Konva.Layer();
  var bg = new Konva.Rect({
    width: width,
    height: height,
    fill: "white",
  });
  bgLayer.add(bg);

  var levelLayer = createLevel();

  stage.add(bgLayer, levelLayer);
}

newGame();
