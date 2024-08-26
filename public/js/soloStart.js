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

/**
 * ゲームスタート時に一回のみ実行する関数
 * サーバーにゲーム開始を伝える
 */
async function soloGameStart() {
  let response;

  try {
    // POSTリクエストを送信し、レスポンスを受け取る
    response = await fetch('/solo/start', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // ステータスコードが200でなければエラーハンドリング
    if (response.status !== 200) {
      if (response.body.errorCode === '10001') {
        response = getId();
      } else {
        console.error('Error:', responseObj.message || 'Unknown error');
        return;
      }

      if (response.status !== 200) return;
    }
  } catch (error) {
    // ネットワークエラーなどの例外をキャッチして処理
    console.error('Fetch error:', error);
  }

  const responseObj = await response.json();
  //タイマーを開始
  timer(responseObj.endTime);

  // もらった変数で設定するように変更する
  setMeter(10);
  startMeter();

  startObserve();
}

// enterでゲームスタートできるようにする。
// 押されたら、要素を消してスタートオンを鳴らす。
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
