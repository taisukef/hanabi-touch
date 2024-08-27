//サーバーで処理する場合
// あとで作る
// async function sendChar(){
// 	const response = await fetch(
// 		"/solo/sendCharacter",
// 		{
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ alphabet: event.key })
// 		}
// 	);
// // responseが成功ならば
// }

/**
 * サーバに入力された文字を送信
 * @param {string} key 一文字
 */
async function sendChar(key) {
  const response = await fetch(
    '/solo/sendCharacter',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alphabet: key }),
    },
  );

  const responseObj = await response.json();

   // ステータスコードが200でなければエラーハンドリング
   if (response.status !== 200) {
	console.error('Error:', responseObj.message || 'Unknown error');
	deleteCookie();
	location.reload();
	return;
  }

  //正しい入力ならば
  if(responseObj.isCorrect){
	  // 打った文字の色の更新
	  update(key);
	}else{
		miss.play();// 音声の再生
	}
	// 得点の更新
	  updateScore(responseObj.score);
	// メーターの更新
	  syncMeter(responseObj.meter);
}

/**
 * 入力した文字の更新（idがnotEnteredの文字をidがenteredの要素に移動）
 * @param {string} key 一文字
 */
function update(key) {
  const entered = document.getElementById('entered');
  const notEntered = document.getElementById('notEntered');

  // notEnteredの最初の一文字を取得
  const firstChar = notEntered.textContent.charAt(0);

  if (key === firstChar) {
    // notEnteredから最初の一文字を削除
    notEntered.textContent = notEntered.textContent.slice(1);

    // enteredの最後にその一文字を追加
    entered.textContent += firstChar;
  }
}

// 入力された文字をサーバーを送る
function startObserve() {
  document.addEventListener('keydown', (event) => {
    if (
      event.key.length === 1 && ((event.key >= 'a' && event.key <= 'z' )|| (event.key >= 'A' && event.key <= 'Z')||
      event.key === '-')
    ) {
      // 次打つ文字が正しいか確認
      const notEntered = document.getElementById('notEntered');
      if (!notEntered) return;

      const notEnteredText = notEntered.textContent;
      if (notEnteredText === '') return;

      // 正しい入力の時
      if (notEnteredText.charAt(0) === event.key) {
        // サイズ指定
        let speedMultiplier;
        let lifespanMultiplier;
        let launchPos;

        if (notEnteredText.length === 1) { // 最後の文字の時
          speedMultiplier = 6;
          lifespanMultiplier = 6;
          launchPos = createVector(
            width * 0.5,
            height,
          );
        } else {
          speedMultiplier = 0.5;
          lifespanMultiplier = 0.5;
          launchPos = createVector(
            random(width * 0.1, width * 0.9),
            height,
          );
        }
        update(event.key);

        const firework = new Firework(
          [
            color(random(255), 255, 255),
            color(random(255), 255, 255),
            color(random(255), 255, 255),
          ],
          [
            random(['菊', '牡丹']),
            random(['菊', '牡丹']),
            random(['菊', '牡丹']),
          ],
          graphicBuffers,
          launchPos,
          speedMultiplier,
          lifespanMultiplier,
        );

        fireworks.push(firework);

        fireworkHugh.play();
        setTimeout(() => {
          fireworkBoom.play();
        }, 1450);
      } else {
        miss.play();
        penalty();
      }
    }
  });
}
