// ゲームスタート時に一回のみ実行する関数
async function soloGameStart() {
  try {
    // POSTリクエストを送信し、レスポンスを受け取る
    const response = await fetch(
      '/solo/start',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nextWord: nextWordInputText }),
      },
    );

    // レスポンスをJSON形式に変換
    const responseObj = await response.json();

    // ステータスコードが200でなければエラーハンドリング
    if (response.status !== 200) {
      console.error('Error:', responseObj.message || 'Unknown error');
    } else {
      timer(responseObj.endtime);
    }
  } catch (error) {
    // ネットワークエラーなどの例外をキャッチして処理
    console.error('Fetch error:', error);
  }
}

onload = (_event) => {
  soloGameStart();
};
