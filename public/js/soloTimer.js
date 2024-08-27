function updateTimer(remainTime) { // 残り時間の記述の更新
  const timerId = document.getElementById('timer');
  timerId.textContent = `残り${remainTime.toFixed(1)}秒`;
}

function timer(endTime) { //endTime: サーバーから送られるゲームの終了時刻が入る
  /*一応手元だとこの記述で10秒～0秒まで自然にカウントダウンする。0秒時にページ遷移することも確認しました
   サーバー側から終了時刻が送られる→以下の記述が発動するまでの計算時間によっては中途半端な時間からカウントダウンするかも*/
  updateTimer(Math.round((endTime - new Date().getTime()) / 100) / 10);

  const intervalId = setInterval(() => { // 1秒ごとに以下の処理を行う
    const remainTime = Math.round((endTime - new Date().getTime()) / 100) / 10;
    updateTimer(remainTime);

    if (remainTime <= 0) {
      localStorage.clear();
      clearInterval(intervalId);
      location.href = '/soloResult.html'; // リンク直した方がいいかも
    }
  }, 50);
}
