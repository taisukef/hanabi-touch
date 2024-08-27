/** 指定された値に、得点を初期化して、表示 */
function initializeScore(initializedScore){
	updateScore(initializedScore)
	const scorePanel = document.getElementById('scorePanel');
	scorePanel.style.display = "block";
}

/**
 * 得点を追加する関数
 * @param {number} score 設定する得点
 */
function updateScore(score){
	const scoreElem = document.getElementById('score');
	scoreElem.textContent = score;
}