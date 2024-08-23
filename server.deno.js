import { serveDir } from 'https://deno.land/std@0.151.0/http/file_server.ts';
import { getCookies } from 'https://deno.land/std@0.74.0/http/mod.ts';

function makeId() {
  return crypto.randomUUID();
}

const themeSentencesText = await Deno.readTextFile('./private/sentences.csv');
const themeSentences = themeSentencesText.split('\n').map((text) => {
  text.replaceAll('\n', '');
  return text.split(',');
});
function getRandomThemeSentence() {
  return themeSentences[Math.floor(Math.random() * themeSentences.length)];
}

const expectedTypesPerSec = 2;

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === 'GET' && pathname === '/welcome-message') {
    Response('jigインターンへようこそ！');
  }

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
    console.log(targetSentence);
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
