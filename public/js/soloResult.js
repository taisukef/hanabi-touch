/*メモ用
  responseObj[""]で使用できる
  表示させるものに対応するidが以下に定義されているものとして実装しています。
  score: スコア
  fireworkCount: 花火打ち上げた数(大花火)
  typesPerSecond: 単位時間当たりのタイプ回数
  typeCount: 何回タイプできたか
*/

onload = async (event) => {
  // サーバーから結果情報を受け取る
  const response = await fetch('/solo/getResult', { method: 'GET' });

  // エラー処理
  if (response.status !== 200) {
    console.error('Error:', responseObj.message || 'Unknown error');
    const scoreResult = document.querySelector('#score');
    scoreResult.innerHTML = '結果を正しく取得できませんでした';
  }

  const responseJson = await response.text();
  const responseObj = JSON.parse(responseJson);

  //スコアの表示
  const scoreResult = document.querySelector('#score');
  scoreResult.innerHTML = `${responseObj['score']}`;

  const highScoreId = document.querySelector('#highScore');
  highScoreId.innerHTML = `${responseObj['highScore']}`;
  if (responseObj['score'] > responseObj['highScore']) {
    const bestTextId = document.querySelector('#bestTextId');
    bestTextId.innerHTML = '自己ベスト更新!';
  }

  //花火を打ち上げた回数を表示
  const fireworkCountResult = document.querySelector('#fireworkCount');
  fireworkCountResult.innerHTML = `${responseObj['fireworkCount']}`;

  //単位時間当たりのタイプ回数の表示
  const typesPerSecondResult = document.querySelector('#typesPerSecond');
  typesPerSecondResult.innerHTML = `${
    responseObj['typesPerSecond'].toFixed(2)
  }`;

  //タイプした回数の表示
  const typeCountResult = document.querySelector('#typeCount');
  typeCountResult.innerHTML = `${responseObj['typeCount']}`;

  //ミスタイプ数の表示
  const typeMissCountResult = document.querySelector('#typeMissCount');
  typeMissCountResult.innerHTML = `${responseObj['typeMissCount']}`;

  document.getElementById('resultContents').style.visibility = 'visible';
  if (
    responseObj.length < 7 || responseObj['score'] < responseObj['rankingScore']
  ) {
    document.getElementById('sendRanking').style.visibility = 'hidden';
  }
};

// もう一度遊ぶボタン
document.querySelector('#restartButton').onclick = (event) => {
  location.href = '/solo.html';
};
// ランキング画面に遷移するボタン
document.querySelector('#rankingButton').onclick = (event) => {
  location.href = 'ranking.html';
};

// タイトルに戻るボタン
document.querySelector('#titleButton').onclick = (event) => {
  location.href = '/index.html';
};
// 記録をランキングに登録するボタン
document.querySelector('#sendRanking').onclick = async (event) => {
  const name = prompt('ランキングに表示する名前を入力してください');
  if (name.length === 0) {
    alert('その名前は登録できません');
  } else if (name.includes('<') || name.includes('>')) {
    alert('使用できない文字が含まれています');
  } else {
    const response = await fetch(
      '/solo/sendRanking',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: name }),
      },
    );
    const responseObj = await response.json();
    if (!responseObj['isSuccessful']) {
      alert('結果を正しく送信できませんでした');
    } else {
      alert('ランキングに登録しました');
    }
  }
};
