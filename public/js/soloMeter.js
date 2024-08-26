/**
 * meterの初期設定
 * @param {number} time  設定する秒
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
    // 1/100秒おきに実行
    meter.value -= 10/ meter.time;
  }, 10);
}
