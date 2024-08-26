/**
 * @param {number} time  設定する秒
 * meterの初期設定
 */
function setMeter(time) {
  const meter = document.getElementById('meter');
  if (meter) {
    meter.value = 1000;
    meter.time = time;
  }
}

/**
 * 　タイマー更新
 */
function startMeter() {
  const meter = document.getElementById('meter');
  setInterval(() => {
    // 0.1秒おきに実行
    meter.value -= 100 / meter.time;
  }, 100);
}
