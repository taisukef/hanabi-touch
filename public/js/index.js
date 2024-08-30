// マウスホバーで選択中にする
document.querySelectorAll('.startMenuButton').forEach((button) => {
    button.addEventListener('mouseover', function () {
        document.querySelectorAll('.startMenuButton').forEach((btn) => {
            btn.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// 上下矢印で移動、Enterでボタンクリックと同じ挙動をさせる
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        document.querySelector('#startButton').classList.add('selected');
        document.querySelector('#rankingButton').classList.remove('selected');
    } else if (event.key === 'ArrowDown') {
        document.querySelector('#rankingButton').classList.add('selected');
        document.querySelector('#startButton').classList.remove('selected');
    } else if (event.key === 'Enter') {
        document.querySelector('.selected').dispatchEvent(
            new PointerEvent('click'),
        );
    } else {
        return;
    }
});
