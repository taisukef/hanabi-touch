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
  text = text.replaceAll('\r', '');
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
const EXPECTED_TYPES_PER_SEC = 2;
// 1文字ごとに加点する点数
const SCORE_PER_CHAR = 100;
// 1ゲームの制限時間(ms)
const TIME_LIMIT = 60 * 1000;

// 最後に出力したユーザーごとの文章
const userSentence = {};
// ユーザーごとのゲーム終了時間
const userEndTime = {};

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  // ユーザidをcookieに設定する
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

  // ゲームスタートと同時に初期化
  if (req.method === 'GET' && pathname === '/solo/start') {
    if (!getCookies(req)['id']) {
      return makeErrorResponse('id in cookies is not set', '10001');
    }
    const id = getCookies(req)['id'];
    delete userSentence[id];
    userEndTime[id] = Date.now() + TIME_LIMIT;
    return new Response(
      JSON.stringify({
        'endTime': userEndTime[id],
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    );
  }

  // cookieのidからユーザごとに文章を取得する
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
          targetSentence[1].length / EXPECTED_TYPES_PER_SEC,
        ),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    );
    return response;
  }

  // 1文字ごとに正誤判定を行う
  if (req.method === 'POST' && pathname === '/solo/sendCharacter') {
    if (!getCookies(req)['id']) {
      return makeErrorResponse('id in cookies is not set', '10001');
    }
    const id = getCookies(req)['id'];
    if (!userSentence[id] || !userSentence[id][1]) {
      return makeErrorResponse('sentence is not set', '10002');
    }
    const reqeustJson = await req.json();
    const sentChar = reqeustJson['alphabet'];
    let isCorrect = false;
    if (userSentence[id][1][0] === sentChar) { // 送られた文字と文章最初の文字が一致しているか
      isCorrect = true;
      userSentence[id][1] = userSentence[id][1].slice(1); // 保持していた文章の1文字目を消去
    }
    const isCompleted = userSentence[id][1] === ''; // 文章が空なら完了
    return new Response(
      JSON.stringify({
        'isCompleted': isCompleted,
        'isCorrect': isCorrect,
        'score': SCORE_PER_CHAR,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
    );
  }

  return serveDir(req, {
    fsRoot: 'public',
    urlRoot: '',
    showDirListing: true,
    enableCors: true,
  });
});
