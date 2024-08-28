/*
 メモ：名前とスコアはリストで送られる
*/

onload = async (event) => {
    const response = await fetch('/solo/getRanking', { method: 'GET' });
    const responseJson = await response.text();
    const responseObj = JSON.parse(responseJson);
    const ranking = responseObj['top10Results'];

    for (let i = 0; i < ranking.length; i++) {
        const rank = document.querySelector(`#rank${i + 1}`);
        const name = document.querySelector(`#name${i + 1}`);
        const score = document.querySelector(`#score${i + 1}`);
        rank.innerHTML = `${i + 1}位`;
        name.innerHTML = `${ranking[i + 1]['userName']}`;
        score.innerHTMK = `${ranking[i + 1]['score']}`;
    }
    //console.log(responseObj['top10Results'][0]['score']);
};
