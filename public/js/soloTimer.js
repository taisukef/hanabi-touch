function updateTimer(remainTime) {
  const timerId = document.getElementById('timer');
  timerId.textContent = `残り${remainTime}秒`;
}

function timer(endTime) { //endTime: サーバーから送られるゲームの終了時刻が入る
  /*一応手元だとこの記述で10秒～0秒まで自然にカウントダウンする
   サーバー側から終了時刻が送られる→以下の記述が発動するまでの計算時間によっては中途半端な時間からカウントダウンするかも*/
  updateTimer(Math.round((endTime - new Date().getTime()) / 1000));

  const intervalId = setInterval(() => {
    const remainTime = Math.round((endTime - new Date().getTime()) / 1000);
    updateTimer(remainTime);

    if (remainTime <= 0) {
      localStorage.clear();
      clearInterval(intervalId);
      location.href = './soloResult.html';
    }
  }, 1000);
}
