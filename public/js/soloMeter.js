const PENALTY_TIME = 1.5; // 1.5秒
let expectedTime;

/**
 * meterの初期設定
 * @param {number} time  設定する秒
 */
function setMeter(time) {
  const meter = document.getElementById('meter');
  if (meter) {
    meter.style.display = 'block';
    meter.value = 1000;
	expectedTime = time;
  }
}

/**
 * タイマー更新
 */
function startMeter() {
  const meter = document.getElementById('meter');
  // 1/100秒おきに実行
  setInterval(() => {
    meter.value -= parseInt(10 / expectedTime);
  }, 10);
}

/**
 * メーター同期
 * 　@param {number} time 設定される秒数
 */
function syncMeter(time) {
  const meter = document.getElementById('meter');
  meter.value = time;
}

/**
 * 打ち間違えた時のペナルティーとして、メーターを減少させる。
 * @param {number} time  減少させる秒数
 */
function penalty(time) {
  const meter = document.getElementById('meter');
  meter.value -= 10 / expectedTime * PENALTY_TIME;
}
