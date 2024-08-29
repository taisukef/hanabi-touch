/*
 メモ：名前とスコアはリストで送られる
*/

async function displayRanking(difficulty) {
  const response = await fetch(
    '/solo/getRanking',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty: difficulty }),
    },
  );
  const responseJson = await response.text();
  const responseObj = JSON.parse(responseJson);
  const ranking = responseObj['top10Results'];

  for (let i = 0; i < 10; i++) {
    const rankId = document.querySelector(`#rank${i + 1}`);
    const nameId = document.querySelector(`#name${i + 1}`);
    const scoreId = document.querySelector(`#score${i + 1}`);
    rankId.innerText = '';
    nameId.textContent = '';
    scoreId.innerText = '';
  }

  for (let i = 0; i < ranking.length; i++) {
    const rankId = document.querySelector(`#rank${i + 1}`);
    const nameId = document.querySelector(`#name${i + 1}`);
    const scoreId = document.querySelector(`#score${i + 1}`);
    rankId.innerText = `${i + 1}位`;
    nameId.textContent = `${ranking[i]['userName']}`;
    scoreId.innerText = `${ranking[i]['score']}`;
  }
  document.querySelector(`#${difficulty}Button`).style.background =
    'rgba(255, 255, 255, 0.15)';
}

document.querySelector('#easyButton').onclick = async (event) => {
  await displayRanking('easy');
  document.querySelector('#normalButton').style.background = 'midnightblue';
  document.querySelector('#hardButton').style.background = 'midnightblue';
};

document.querySelector('#normalButton').onclick = async (event) => {
  await displayRanking('normal');
  document.querySelector('#easyButton').style.background = 'midnightblue';
  document.querySelector('#hardButton').style.background = 'midnightblue';
};

document.querySelector('#hardButton').onclick = async (event) => {
  await displayRanking('hard');
  document.querySelector('#normalButton').style.background = 'midnightblue';
  document.querySelector('#easyButton').style.background = 'midnightblue';
};

onload = async (event) => {
  await displayRanking('normal');
  document.querySelector('#top10').style.visibility = 'visible';
  document.querySelector('#titleButton').style.visibility = 'visible';
  document.querySelector('#easyButton').style.visibility = 'visible';
  document.querySelector('#normalButton').style.visibility = 'visible';
  document.querySelector('#hardButton').style.visibility = 'visible';
};
