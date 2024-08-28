let expectedTime;
let doubleTime;

/** メーターをdoubleTimeをIntにキャストした値に変更 */
function setMeter() {
  const meter = document.querySelector('progress');
  meter.value = parseInt(doubleTime > 0 ? doubleTime : 1);

  updateColor();
}

function updateColor() {
  const meter = document.querySelector('progress');
  if (meter.value >= 666) {
    meter.id = 'red';
  } else if (meter.value >= 333) {
    meter.id = 'yellow';
  } else {
    meter.id = 'blue';
  }
}

/**
 * meterの初期設定
 * @param {number} time  設定する秒
 */
function initializeMeter(time) {
  const meter = document.querySelector('progress');
  if (meter) {
    meter.style.display = 'block';
    doubleTime = 1000;
    meter.value = 1000;
    expectedTime = time;
  }
}

/**
 * タイマー更新
 */
function startMeter() {
  const meter = document.querySelector('progress');
  // 1/100秒おきに実行
  setInterval(() => {
    doubleTime -= 10 / expectedTime;
    setMeter();
    updateColor();
  }, 10);
}

/**
 * メーター同期
 * 　@param {number} time 設定される秒数
 */
function syncMeter(time) {
  doubleTime = time;
  setMeter();
  updateColor();
}

/**
 * メーターの色を取得
 * @returns {string} 　メーターの色
 */
function getMeterColor() {
  return document.querySelector('progress').id;
}
