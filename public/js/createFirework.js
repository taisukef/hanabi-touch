let fireworks = [];
let gravity;
let bgColor;

let graphicBuffers = [];
let raisingTrail = 15;
let kikuTrail = 30;
let botanTrail = 3;
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
  //　花火の更新
  graphicBuffers[0].background(0, Math.ceil(255 / raisingTrail));
  graphicBuffers[1].background(0, Math.ceil(255 / botanTrail));
  graphicBuffers[2].background(0, Math.ceil(255 / kikuTrail));

  const delta = deltaTime;
  const currentFrame = frameRate();
  for (var i = fireworks.length - 1; i >= 0; i--) {
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

document.getElementById('small').onclick = () => {
  const launchPos = createVector(random(width * 0.4, width * 0.6), height);
  const firework = new Firework(
    [
      color(random(255), 255, 255),
      color(random(255), 255, 255),
      color(random(255), 255, 255),
    ], // ランダムな色
    [random(['菊', '牡丹']), random(['菊', '牡丹']), random(['菊', '牡丹'])], // ランダムなタイプ
    graphicBuffers,
    launchPos,
  );

  fireworks.push(firework);
};

let counter = 0;
document.addEventListener('keydown', (event) => {
  // const input = document.getElementById('number');
  // if(!input) return;
  // const mod = parseInt(input.value, 10); // 数値に変換
  // if (isNaN(mod) || mod <= 0) return; // modが無効な場合は何もしない
  // counter++;
  // if (counter % mod !== 0) return;

  if (event.key.length === 1 && event.key >= 'a' && event.key <= 'z') {
    const launchPos = createVector(random(width * 0.1, width * 0.9), height);

    // サイズ指定
    const speedMultiplier = 0.5;
    const lifespanMultiplier = 0.5;
    const numberOfParticles = 1;

    const firework = new Firework(
      [
        color(random(255), 255, 255),
        color(random(255), 255, 255),
        color(random(255), 255, 255),
      ],
      [random(['菊', '牡丹']), random(['菊', '牡丹']), random(['菊', '牡丹'])],
      graphicBuffers,
      launchPos,
      speedMultiplier,
      lifespanMultiplier,
    );

    fireworks.push(firework);
  }
});
