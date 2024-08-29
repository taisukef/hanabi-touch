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

    for (let i = 0; i < ranking.length; i++) {
        const rankId = document.querySelector(`#rank${i + 1}`);
        const nameId = document.querySelector(`#name${i + 1}`);
        const scoreId = document.querySelector(`#score${i + 1}`);
        rankId.innerText = `${i + 1}位`;
        nameId.textContent = `${ranking[i]['userName']}`;
        scoreId.innerText = `${ranking[i]['score']}`;
    }
}

document.querySelector('#easyButton').onclick = (event) => {
    displayRanking('easy');
};

document.querySelector('#normalButton').onclick = (event) => {
    displayRanking('normal');
};

document.querySelector('#hardButton').onclick = (event) => {
    displayRanking('hard');
};

onload = async (event) => {
    await displayRanking('normal');
    document.querySelector('#top10').style.visibility = 'visible';
    document.querySelector('#titleButton').style.visibility = 'visible';
};
