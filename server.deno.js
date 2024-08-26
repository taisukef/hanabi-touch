import { serveDir } from 'https://deno.land/std@0.151.0/http/file_server.ts';
import { getCookies } from 'https://deno.land/std@0.74.0/http/mod.ts';

function makeId() {
  return crypto.randomUUID();
}

// 「日本語文章,アルファベット」
// 形式のcsvファイルを読み込む
const themeSentencesText = await Deno.readTextFile('./private/sentences.csv');
// 改行とカンマ区切りで2次元リスト化
const themeSentences = themeSentencesText.split('\n').map((text) => {
  text.replaceAll('\n', '');
  return text.split(',');
});

/**
 * ランダムな文章とそのローマ字文章の組み合わせを出力
 * @returns [日本語文章, ローマ字文章]
 */
function getRandomThemeSentence() {
  return themeSentences[Math.floor(Math.random() * themeSentences.length)];
}

/**
 * エラーレスポンス生成
 * @param {String} errorMessage bodyのerrorMessageに載せる文字列
 * @param {String} errorCode bodyのerrorCodeに載せる文字列
 * @returns 400番のエラーレスポンス
 */
function makeErrorResponse(errorMessage, errorCode) {
  return new Response(
    JSON.stringify({
      'errorMessage': errorMessage,
      'errorCode': errorCode,
    }),
    {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    },
  );
}

// 期待される1秒間のタイプ数
const expectedTypesPerSec = 2;
// 最後に出力したユーザーごとの文章
const userSentence = {};

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === 'GET' && pathname === '/getId') {
    if (getCookies(req)['id']) return new Response('id is already set');
    return new Response(
      'set id',
      {
        status: 200,
        headers: {
          'set-cookie': `id=${makeId()}`,
        },
      },
    );
  }

  if (req.method === 'GET' && pathname === '/solo/getSentence') {
    const targetSentence = getRandomThemeSentence();
    if (!getCookies(req)['id']) {
      return makeErrorResponse('id in cookies is not set', '10001');
    }
    const id = getCookies(req)['id'];
    userSentence[id] = targetSentence;
    const response = new Response(
      JSON.stringify({
        'sentenceJapanese': targetSentence[0],
        'sentenceAlphabet': targetSentence[1],
        'expectedTime': Math.ceil(
          targetSentence[1].length / expectedTypesPerSec,
        ),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    );
    return response;
  }

  return serveDir(req, {
    fsRoot: 'public',
    urlRoot: '',
    showDirListing: true,
    enableCors: true,
  });
});
