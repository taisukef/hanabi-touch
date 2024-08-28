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
};

// もう一度遊ぶボタン。現段階では、ボタンのidが「restartButton」と仮定して作っています。
document.getElementById('restartButton').onclick = (event) => {
  location.href = '/solo.html';
};

document.querySelector('#rankingButton').onclick = (event) => {
};

// タイトルに戻るボタン。ひとまず、ボタンのidが「titleButton」と仮定して作ってます。
document.querySelector('#titleButton').onclick = (event) => {
  location.href = '/index.html';
};

document.querySelector('#sendButton').onclick = (event) => {
};
