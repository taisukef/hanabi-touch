let expectedTime;
let doubleTime;

/** メーターをdoubleTimeをIntにキャストした値に変更 */
function setMeter(){
	const meter = document.getElementById('meter');
	meter.value = parseInt(doubleTime);
}

/**
 * meterの初期設定
 * @param {number} time  設定する秒
 */
function initializeMeter(time) {
  const meter = document.getElementById('meter');
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
  const meter = document.getElementById('meter');
  // 1/100秒おきに実行
  setInterval(() => {
	doubleTime -= 10 / expectedTime;
    setMeter();
  }, 10);
}

/**
 * メーター同期
 * 　@param {number} time 設定される秒数
 */
function syncMeter(time) {
  doubleTime = time;
  setMeter();
}


