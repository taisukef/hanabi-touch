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
  if (responseObj['score'] >= responseObj['highScore']) {
    const bestTextId = document.querySelector('#bestText');
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
  if (name.length < 1 || name.length >= 10) {
    alert('1文字以上10文字以内で入力してください');
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

// マウスホバーで選択中にする
document.querySelectorAll('.startMenuButton').forEach((button) => {
  button.addEventListener('mouseover', function () {
    document.querySelectorAll('.startMenuButton').forEach((btn) => {
      btn.classList.remove('selected');
    });
    this.classList.add('selected');
  });
});

// 横並びのボタン
const buttons = [
  document.querySelector('#restartButton'),
  document.querySelector('#rankingButton'),
  document.querySelector('#titleButton'),
];
// 選択中のボタンの位置
let buttonIndex = 0;
// 上下左右矢印で移動、Enterでボタンクリックと同じ挙動をさせる
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    buttons[buttonIndex].classList.remove('selected');
    buttonIndex = Math.min(buttonIndex + 1, 2);
    buttons[buttonIndex].classList.add('selected');
  } else if (event.key === 'ArrowLeft') {
    buttons[buttonIndex].classList.remove('selected');
    buttonIndex = Math.max(buttonIndex - 1, 0);
    buttons[buttonIndex].classList.add('selected');
  } else if (event.key === 'ArrowUp') {
    buttons[buttonIndex].classList.remove('selected');
    document.querySelector('#sendRanking').classList.add('selected');
  } else if (event.key === 'ArrowDown') {
    document.querySelector('#sendRanking').classList.remove('selected');
    buttons[buttonIndex].classList.add('selected');
  } else if (event.key === 'Enter') {
    document.querySelector('.selected').dispatchEvent(
      new PointerEvent('click'),
    );
  }
  return;
});
