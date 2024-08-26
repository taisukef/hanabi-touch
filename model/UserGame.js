class UserGame {
  /**
   * @param {String} id ユーザid
   * @param {Number} timeLimit 1ゲームの制限時間
   */
  constructor(id, timeLimit) {
    this.id = id;
    this.initialize();
    this.endTime = Date.now() + timeLimit;
  }

  /**
   * メンバ変数の初期化(idを除く)
   */
  initialize() {
    this.sentenceNowJapanese = ''; // 現在の文章の日本語
    this.sentenceNowAlphabet = ''; // 現在の文章のアルファベット
    this.endTime = 0; // このゲームの終了時刻
    this.totalScore = 0; // このゲームの合計スコア
    this.totalSentenceCount = 0; // このゲームの合計完了文章
    this.totalTypeCount = 0; // このゲームの合計タイプ数
    this.totalCorrectTypeCount = 0; // このゲームの合計正解タイプ数
    this.sentenceStartTime = 0; // その文章が始まった時刻
    this.sentenceMissTypeCount = 0; // その文章でのミスタイプ数
    this.meter = 1000; // 花火メーター
  }

  /**
   * 1文字の正誤判定を行う
   * @param {String} alphabet ゲーム中に入力された文字
   * @returns {boolean}
   */
  judgeCorrectness(alphabet) {
    const isCorrect = this.sentenceNowAlphabet[0] === alphabet;
    if (isCorrect) {
      this.sentenceNowAlphabet = this.sentenceNowAlphabet.slice(1);
    } else {
      this.sentenceMissTypeCount++;
    }
    return isCorrect;
  }

  /**
   * 文章が完了したかの判定を行う
   * @returns {boolean} 文章が完了したのならtrueそうでないならfalse
   */
  isCompleted() {
    return this.sentenceNowAlphabet === '';
  }

  /**
   * 文章と文章時刻のセッター
   * @param {String} japanese
   * @param {String} alphabet
   */
  setSentenceNow(japanese, alphabet) {
    this.sentenceNowJapanese = japanese;
    this.sentenceNowAlphabet = alphabet;
    this.sentenceStartTime = Date.now();
    this.sentenceMissTypeCount = 0;
  }

  /**
   * endTimeのゲッター
   * @returns {Number} 終了時刻
   */
  getEndTime() {
    return this.endTime;
  }
}

export { UserGame };
