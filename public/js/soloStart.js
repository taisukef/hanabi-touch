/**
 * idを取得（cookie）
 */
async function getId() {
  try {
    // GETリクエストを送信し、レスポンスを受け取る
    const response = await fetch('/getId', {
      method: 'GET',
    });

    // ステータスコードが200でなければエラーハンドリング
    if (response.status !== 200) {
      const responseObj = await response.json();
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
async function soloGameStart(difficulty) {
  try {
    // POSTリクエストを送信し、レスポンスを受け取る
    const response = await fetch('/solo/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty: difficulty }),
    });

    const responseObj = await response.json();
    // ステータスコードが200でなければエラーハンドリング
    if (response.status !== 200) {
      console.error('Error:', responseObj.message || 'Unknown error');
      deleteCookie();
      location.reload();
    }
    //タイマーを開始
    timer(responseObj.endTime);
    // scoreの初期化
    initializeScore(responseObj.initializedScore);

    // 入力文字の表示開始
    const scorePanel = document.getElementById('sentence');
    scorePanel.style.display = 'flex';

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

// ページロード時に実行する処理
onload = async (_event) => {
  await getId();
};
