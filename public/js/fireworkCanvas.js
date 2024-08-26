const fireworks = [];
let gravity;
let bgColor;

let graphicBuffers = [];
const raisingTrail = 15;
const kikuTrail = 30;
const botanTrail = 3;
const standardFrame = 60;

// ページ読み込み時に一回のみ実行
function setup() {
  const result = document.getElementById('gamePanel');

  const canvas = createCanvas(result.clientWidth, result.clientHeight); // canvasを作成
  canvas.parent(result); // 子要素に追加

  bgColor = color(20, 20, 50); // RGB gamePanel同じ色
  background(bgColor); // 背景を黒く指定

  colorMode(HSB); //花火を出す色の指定の仕方
  gravity = createVector(0, 0.7);
  stroke(255); // 線の色を設定
  strokeWeight(4); // 線の太さ

  graphicBuffers = [
    createGraphics(result.clientWidth, result.clientHeight),
    createGraphics(result.clientWidth, result.clientHeight),
    createGraphics(result.clientWidth, result.clientHeight),
  ];

  frameRate(standardFrame);
}

function draw() {
  colorMode(RGB); // 花火を出す色の指定の仕方
  background(bgColor); // 背景に少し透明なのを重ねてだんだん消えて行くように

  colorMode(HSB);
  // 花火の更新
  graphicBuffers[0].background(0, Math.ceil(255 / raisingTrail));
  graphicBuffers[1].background(0, Math.ceil(255 / botanTrail));
  graphicBuffers[2].background(0, Math.ceil(255 / kikuTrail));

  const delta = deltaTime;
  const currentFrame = frameRate();
  for (let i = fireworks.length - 1; i >= 0; i--) {
    // フレームレートを考慮して更新をかける
    fireworks[i].update(delta * currentFrame * 0.001);
    fireworks[i].show();
    if (fireworks[i].done) {
      fireworks[i].dispose();
      fireworks.splice(i, 1);
    }
  }

  // canvasに反映
  blendMode(SCREEN);
  for (let i = 0; i < graphicBuffers.length; i++) {
    graphicBuffers[i].background(0, 1);

    image(graphicBuffers[i], 0, 0);
  }
  blendMode(BLEND);
}

