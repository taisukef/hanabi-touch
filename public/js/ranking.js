/*
 メモ：名前とスコアはリストで送られる
*/

onload = async (event) => {
    const response = await fetch('/solo/getRanking', { method: 'GET' });
    const responseJson = await response.text();
    const responseObj = JSON.parse(responseJson);

    const rank1 = document.querySelector('#rank1');
    rank1.innerHTML = `1位. ${responseObj['top10Results'][0]['userName']}　${
        responseObj['top10Results'][0]['score']
    }`;
    //console.log(responseObj['top10Results'][0]['score']);
};
