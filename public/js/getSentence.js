async function getSentence() {
  let response;

  try {
    // POSTリクエストを送信し、レスポンスを受け取る
    response = await fetch('/solo/getSentence', {
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

  //   文章を設定
  document.getElementById('notEntered').textContent =
    responseObj.sentenceAlphabet;
  document.getElementById('japanese').textContent =
    responseObj.sentenceJapanese;

  // もらった変数で設定するように変更する
  setMeter(10);
  startMeter();
}
