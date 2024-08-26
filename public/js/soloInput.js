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
  console.log(key);
  update(key);
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
function startObserve(){
	document.addEventListener('keydown', (event) => {
		if (event.key.length === 1 && event.key >= 'a' && event.key <= 'z' || event.key === '-') {
		  const launchPos = createVector(random(width * 0.1, width * 0.9), height);
	  
		  // サイズ指定
		  const speedMultiplier = 0.5;
		  const lifespanMultiplier = 0.5;
	  
		  const firework = new Firework(
			[
			  color(random(255), 255, 255),
			  color(random(255), 255, 255),
			  color(random(255), 255, 255),
			],
			[random(['菊', '牡丹']), random(['菊', '牡丹']), random(['菊', '牡丹'])],
			graphicBuffers,
			launchPos,
			speedMultiplier,
			lifespanMultiplier,
		  );
	  
		  fireworks.push(firework);
		  
		  new Audio('sound/fireworkHugh.mp3').play();
		  setTimeout(()=>{
			new Audio('sound/fireworkBoom.mp3').play();
		  },2300);
		}
	  });

}
