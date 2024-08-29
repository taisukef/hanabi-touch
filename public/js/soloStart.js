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

// enter　その時選択している難易度でゲームスタート
// ← →  難易度を変更
document.addEventListener('keydown', async (event) => {
  const option = document.getElementById('option');
  if (!option) return;

  const element = option.querySelector('.selected');
  if (!element) return;
  if (event.key === 'Enter') {
    soloGameStart(element.value);
    option.remove();
    start.play();
  } else if (event.key === 'ArrowLeft') {
    if (element.value === 'easy') return;
    element.classList.remove('selected');

    if (element.value === 'normal') {
      option.querySelector('[value="easy"]').classList.add('selected');
    } else {
      option.querySelector('[value="normal"]').classList.add('selected');
    }
  } else if (event.key === 'ArrowRight') {
    if (element.value === 'hard') return;
    element.classList.remove('selected');

    if (element.value === 'normal') {
      option.querySelector('[value="hard"]').classList.add('selected');
    } else {
      option.querySelector('[value="normal"]').classList.add('selected');
    }
  }
});

// 難易度選択画面でボタンをクリックして始める
document.querySelectorAll('.difficultyButton').forEach((button) => {
  button.addEventListener('click', () => {
    const option = document.getElementById('option');
    if (option) {
      soloGameStart(button.value);
      option.remove();
      start.play();
    }
  });
});

// ページロード時に実行する処理
onload = async (_event) => {
  await getId();
};
