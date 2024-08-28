/**
 * 文章、想定入力時間を取得し、入力する文字に設定する。
 * meterの初期化もする。
 */
async function fetchSentenceAndRefreshMeter() {
  let response;

  try {
    // GETリクエストを送信し、レスポンスを受け取る
    response = await fetch('/solo/getSentence', {
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
    // // メーターを設定
    setMeter(responseObj.expectedTime);

    //  文章を設定
    document.getElementById('entered').textContent = '';
    document.getElementById('notEntered').textContent =
      responseObj.sentenceAlphabet;
    document.getElementById('japanese').textContent =
      responseObj.sentenceJapanese;
  } catch (error) {
    // ネットワークエラーなどの例外をキャッチして処理
    console.error('Fetch error:', error);
  }
}
