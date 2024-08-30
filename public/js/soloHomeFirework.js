function makeSmallFirework() {
  const shape = random(['菊', '牡丹']);
  const size = random(100) / 30;
  const firework = new Firework(
    [
      color(random(360), 255, 255),
      color(random(360), 255, 255),
      color(random(360), 255, 255),
    ],
    [shape, shape, shape],
    graphicBuffers,
    launchPos = createVector(
      random(width * 0.1, width * 0.9),
      height,
    ), // launchPos
    size, //  speedMultiplier
    size, // lifespanMultiplier
    false,
    false,
  );
  fireworks.push(firework);
}
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        // タブが非アクティブになったときに実行を停止する処理
        stopScripts();
    } else if (document.visibilityState === 'visible') {
        // タブがアクティブになったときにスクリプトを再開する処理
        startScripts();
    }
});

function stopScripts() {
    // 停止
    clearInterval(someInterval);
}

function startScripts() {
    // 再開
    someInterval = setInterval(() => {
        makeSmallFirework();
    }, 1000);
}

let someInterval = setInterval(() => {
    makeSmallFirework();
}, 500);
