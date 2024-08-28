/*
 メモ：名前とスコアはリストで送られる
*/

onload = async (event) => {
    const response = await fetch('/solo/getRanking', { method: 'GET' });
    const responseJson = await response.text();
    const responseObj = JSON.parse(responseJson);

    console.log(responseObj['top10Results'][0]['score']);
};
