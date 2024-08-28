/*
 メモ：名前とスコアはリストで送られる
*/

onload = async (event) => {
    const response = await fetch('/solo/getRanking', { method: 'GET' });
    const responseJson = await response.text();
    const responseObj = JSON.parse(responseJson);
    const ranking = responseObj['top10Results'];

    for (i = 0; i < ranking.length; i++) {
        const rank = document.querySelector(`#rank${i + 1}`);
        rank.innerHTML = `${i + 1}位. ${ranking[i]['userName']}　${
            ranking[i]['score']
        }`;
    }
    //console.log(responseObj['top10Results'][0]['score']);
};
