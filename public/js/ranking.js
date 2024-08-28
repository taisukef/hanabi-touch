/*
 メモ：名前とスコアはリストで送られる
*/

onload = async (event) => {
    const response = await fetch('/solo/getRanking', { method: 'GET' });
    const responseJson = await response.text();
    const responseObj = JSON.parse(responseJson);

    for (let i = 0; i < responseObj['top10Results'].length; i++) {
        const ranking = responseObj['top10Results'][i];
        const rankId = document.querySelector(`#rank${i + 1}`);
        const nameId = document.querySelector(`#name${i + 1}`);
        const scoreId = document.querySelector(`#score${i + 1}`);
        rankId.innerHTML = `${i + 1}位`;
        nameId.innerHTML = `${ranking['userName']}`;
        scoreId.innerHTML = `${ranking['score']}`;
    }
    console.log(responseObj['top10Results'][0]);
};
