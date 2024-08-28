const fireworks = [];
let gravity;
let bgColor;

let graphicBuffers = [];
const raisingTrail = 6; //もともとの値: 15
const kikuTrail = 6; //もともとの値: 30
const botanTrail = 3; //もともとの値: 3
const standardFrame = 60;

/**
 * canvasのサイズを計算
 * @returns {width:number,height:number} canvasのサイズ
 */
function calcCanvasSize(){
	const ASPECT = 100/56; // アスペクト比  横 / 縦
	
	const canvasWidth = Math.min(0.95 * windowWidth, 0.94 * windowHeight * 10 / 7);
	const canvasHeight = canvasWidth / ASPECT ;

	return {width: canvasWidth, height:canvasHeight};
}

/** p5js ページ読み込み時に一回のみ実行 */
function setup() {
  const result = document.getElementById('gameMain');
  const { width, height } = calcCanvasSize();

  const canvas = createCanvas(width, height); // canvasを作成
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

/** p5js 一定時間ごとに実行される  */
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

/** ウィンドウがリサイズされた時にp5jsが自動実行  */
function windowResized() {
	const { width, height } = calcCanvasSize();
	resizeCanvas(width, height);
}
