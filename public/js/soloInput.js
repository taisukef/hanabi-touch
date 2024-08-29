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
  //   console.log(responseObj);

  // ステータスコードが200でなければエラーハンドリング
  if (response.status !== 200) {
    console.error('Error:', responseObj.message || 'Unknown error');
    deleteCookie();
    location.reload();
    return;
  }

  if (responseObj.isCorrect) { //正しい入力ならば
    // 打った文字の色の更新
    updateWord(responseObj);

    const shape = random(['菊', '牡丹']);
    const firework = new Firework(
      [
        color(random(255), 255, 255),
        color(random(255), 255, 255),
        color(random(255), 255, 255),
      ],
      [shape, shape, shape],
      graphicBuffers,
      launchPos = createVector(
        random(width * 0.1, width * 0.9),
        height,
      ), // launchPos
      0.5, //  speedMultiplier
      0.5, // lifespanMultiplier
    );
    fireworks.push(firework);
    new Audio(fireworkHugh.src).play();
  } else { // 間違った入力ならば
    new Audio(miss.src).play();
  }

  // 得点の更新
  updateScore(responseObj.score);
  // メーターの更新
  syncMeter(responseObj.meter);
  //   console.log(responseObj);

  // 最後の文字ならば
  if (responseObj.isCompleted) {
    await fetchSentenceAndRefreshMeter();

    const size = responseObj.fireworkSize / 20 + 1.5;
    const fireworkColor = getMeterColor();
    let colorFrom; // 色彩の閾値のうち小さい方
    if (fireworkColor === 'red') {
      colorFrom = 280;
    } else if (fireworkColor === 'yellow') {
      colorFrom = 40;
    } else { // blue
      colorFrom = 170;
    }
    const firework = new Firework(
      [
        color(random(colorFrom, colorFrom + 120) % 360, 255, 255),
        color(random(colorFrom, colorFrom + 120) % 360, 255, 255),
        color(random(colorFrom, colorFrom + 120) % 360, 255, 255),
      ],
      [random(['菊', '牡丹']), random(['菊', '牡丹']), random(['菊', '牡丹'])],
      graphicBuffers,
      launchPos = createVector(
        width * 0.5,
        height * 0.5,
      ), // launchPos
      size, //  speedMultiplier
      size, // lifespanMultiplier
      size,
      true, // すぐ開くように
    );
    fireworks.push(firework);
    new Audio(fireworkBoom.src).play();
  }
}

function updateWord(responseObj) {
  setWord('kana', responseObj.notEnteredYomigana, responseObj.enteredYomigana);
  setWord('alphabet', responseObj.notEnteredChars, responseObj.enteredChars);
}

// 入力された文字をサーバーを送る
function startObserve() {
  document.addEventListener('keydown', (event) => {
    if (
      event.key.length === 1 &&
      ((event.key >= 'a' && event.key <= 'z') ||
        (event.key >= 'A' && event.key <= 'Z') ||
        event.key === '-')
    ) {
      sendChar(event.key);
    }
  });
}

/**
 * 引数で指定した要素内の入力済みの部分を削除し、未入力部分に引数のワードを入れる。
 * @param {string} id
 * @param {string} notEntered
 * @param {string} entered  ない場合は''を入れる。
 */
function setWord(id, notEntered, entered = '') {
  const elem = document.getElementById(id);
  console.log(elem);

  elem.querySelector('.notEntered').textContent = notEntered;
  elem.querySelector('.entered').textContent = entered;
}
