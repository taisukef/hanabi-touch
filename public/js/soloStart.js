/**
 * idを取得（cookie）
 */
async function getId() {
  try {
    // GETリクエストを送信し、レスポンスを受け取る
    const response = await fetch('/getId', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseObj = await response.json();

    // ステータスコードが200でなければエラーハンドリング
    if (response.status !== 200) {
      console.error('Error:', responseObj.message || 'Unknown error');
      deleteCookie();
      location.reload();
      return;
    }
  } catch (error) {
    // ネットワークエラーなどの例外をキャッチして処理
    console.error('Fetch error:', error);
  }
}

/**
 * ゲームスタート時に一回のみ実行する関数
 * サーバーにゲーム開始を伝える
 */
async function soloGameStart() {
  try {
    // POSTリクエストを送信し、レスポンスを受け取る
    const response = await fetch('/solo/start', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // ステータスコードが200でなければエラーハンドリング
    if (response.status !== 200) {
      console.error('Error:', responseObj.message || 'Unknown error');
      deleteCookie();
      location.reload();
    }
    const responseObj = await response.json();
    //タイマーを開始
    timer(responseObj.endTime);
    // scoreの初期化
    initializeScore(responseObj.initializedScore);
    // 最初の文字を設定
    document.getElementById('notEntered').textContent =
      responseObj.sentenceAlphabet;
    document.getElementById('japanese').textContent =
      responseObj.sentenceJapanese;

    // メーターを設定
    setMeter(responseObj.expectedTime);
    startMeter();

    // キーの監視はじめ
    startObserve();
  } catch (error) {
    // ネットワークエラーなどの例外をキャッチして処理
    console.error('Fetch error:', error);
  }
}

// enterでゲームスタートできるようにする。
// 押されたら、要素を消してスタートオンを鳴らす。
document.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    const element = document.getElementById('enterToBegin');
    if (element) {
      element.remove();
      start.play();
      soloGameStart(); // Enterキーが押された時にゲームを開始
    }
  }
});

// ページロード時に実行する処理
onload = async (_event) => {
  await getId();
};
