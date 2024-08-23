function updateTimer(duration) {
    const timerId = document.getElementById('timer');
    timerId.innerHTML = `<p>残り${duration}秒</p>`;
}

function timer(endTime) {
    const remainTime = (endTime - new Date().getTime()) / 1000;

    let count = 0;

    const intervalId = setInterval(() => {
        updateTimer(count);
        count++;

        if (count >= remainTime) {
            clearInterval(intervalId);
        }
    }, 1000);
}
