function updateTimer(gameTime) {
    const timerId = document.getElementById('timer');
    timerId.textContent = `残り${gameTime}秒`;
}

function timer(endTime) {
    let remainTime = (endTime - new Date().getTime()) / 1000;

    const intervalId = setInterval(() => {
        updateTimer(remainTime);

        if (remainTime < 0) {
            clearInterval(intervalId);
            location.href = './soloResult.html';
        }
    }, 1000);
}
