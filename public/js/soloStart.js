// idを取得（cookie）
async function getId() {
  try {
    // GETリクエストを送信し、レスポンスを受け取る
    const response = await fetch('/getId', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // ステータスコードが200でなければエラーハンドリング
    if (response.status !== 200) {
      const responseObj = await response.json();
      console.error('Error:', responseObj.message || 'Unknown error');
      return;
    }

    // ステータスコードが200の場合、正常に処理されました
    console.log('ID retrieved successfully');
  } catch (error) {
    // ネットワークエラーなどの例外をキャッチして処理
    console.error('Fetch error:', error);
  }
}

// ゲームスタート時に一回のみ実行する関数
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
      const responseObj = await response.json();
      console.error('Error:', responseObj.message || 'Unknown error');
      return;
    }

    // 正常にレスポンスを受け取った場合、タイマーを開始
    const responseObj = await response.json();
    timer(responseObj.endtime);
  } catch (error) {
    // ネットワークエラーなどの例外をキャッチして処理
    console.error('Fetch error:', error);
  }
}

// enterでゲームスタート
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const element = document.getElementById('enterToBegin');
    if (element) {
      element.remove();
      //   スタートのサウンドの再生
      new Audio('sound/start.mp3').play();
      console.log('play');
    }
    soloGameStart(); // Enterキーが押された時にゲームを開始
  }
}, { once: true });

// ページロード時に実行する処理
onload = async (_event) => {
  await getId();
};
