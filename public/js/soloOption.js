let oniCounter = 0;
let oniMode = false;

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

  button.addEventListener('mouseover', function () {
    document.querySelectorAll('.difficultyButton').forEach((btn) => {
      btn.classList.remove('selected');
    });
    this.classList.add('selected');
  });
});

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
    if (element.value === 'hard') {
      // 10回押したら鬼モード
      if (oniCounter < 10) {
        oniCounter++;
      } else {
        if (!oniMode) displayOni();
      }
      return;
    }

    element.classList.remove('selected');

    if (element.value === 'normal') {
      option.querySelector('[value="hard"]').classList.add('selected');
    } else {
      option.querySelector('[value="normal"]').classList.add('selected');
    }
  }
});
