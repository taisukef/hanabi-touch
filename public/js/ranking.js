/*
 メモ：名前とスコアはリストで送られる
*/

onload = async (event) => {
  const response = await fetch('/solo/getRanking', { method: 'GET' });
  const responseJson = await response.text();
  const responseObj = JSON.parse(responseJson);
  const ranking = responseObj['top10Results'];

  for (let i = 0; i < ranking.length; i++) {
    const rankId = document.querySelector(`#rank${i + 1}`);
    const nameId = document.querySelector(`#name${i + 1}`);
    const scoreId = document.querySelector(`#score${i + 1}`);
    rankId.innerText = `${i + 1}位`;
    nameId.textContent = `${ranking[i]['userName']}`;
    scoreId.innerText = `${ranking[i]['score']}`;
  }
  console.log(responseObj['top10Results'][0]);

  document.querySelector('#top10').style.visibility = 'visible';
  document.querySelector('#titleButton').style.visibility = 'visible';
};
