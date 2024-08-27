import {
  EXPECTED_TYPES_PER_SEC,
  INITIALIZED_SCORE,
  LAST_COEFFICIENT,
  METER,
  SCORE_PER_CHAR,
  TIME_LIMIT,
} from './../utils/constantValue.js';

class UserGame {
  /**
   * @param {String} id ユーザid
   */
  constructor(id) {
    this.id = id;
    this.initialize();
    this.endTime = Date.now() + TIME_LIMIT;
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
    this.sentenceCur = 0; // その文章での現在の位置
    this.meter = METER['METER_MAX']; // 花火メーター
  }

  /**
   * 1文字の正誤判定を行う
   * @param {String} alphabet ゲーム中に入力された文字
   * @returns {boolean} 正解ならtrue
   */
  judgeCorrectness(alphabet) {
    if (this.sentenceCur < 0 || this.isCompleted()) {
      return false;
    }
    const isCorrect = this.sentenceNowAlphabet[this.sentenceCur] === alphabet;
    this.totalTypeCount++;
    if (isCorrect) {
      this.sentenceCur++;
      this.totalCorrectTypeCount++;
      if (this.isCompleted()) {
        this.totalSentenceCount++;
      }
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
    return this.sentenceNowAlphabet.length <= this.sentenceCur;
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
    this.sentenceCur = 0;
  }

  /**
   * endTimeのゲッター
   * @returns {Number}
   */
  getEndTime() {
    return this.endTime;
  }

  /**
   * 1秒あたりの期待タイプ数を取得
   * @returns {Number}
   */
  getExpectedTypesPerSec() {
    return EXPECTED_TYPES_PER_SEC;
  }
  /**
   * スコアの初期値を取得
   * @returns {Number}
   */
  getInitializedScore() {
    return INITIALIZED_SCORE;
  }
  /**
   * 1文字ごとの加算スコアを取得
   * @returns {Number}
   */
  getScorePerChar() {
    return SCORE_PER_CHAR;
  }
  /**
   * 制限時間[ms]を取得
   * @returns {Number}
   */
  getTimeLimit() {
    return TIME_LIMIT;
  }
  /**
   * このゲームにおける合計スコアを取得
   * @returns {Number}
   */
  getTotalScore() {
    return this.totalScore;
  }
  /**
   * 現在のメーターの値を取得
   * @returns {Number}
   */
  getMeter() {
    return this.meter;
  }
  /**
   * 合計タイプ数を取得
   * @returns {Number}
   */
  getTotalCorrectTypeCount() {
    return this.totalCorrectTypeCount;
  }

  /**
   * 現在の文章の予測タイムを計算
   * @returns {Number} 予測時間[s]
   */
  calcExpectedTime() {
    return Math.ceil(
      this.sentenceNowAlphabet.length / this.getExpectedTypesPerSec(),
    );
  }
  /**
   * 花火の大きさを計算
   * @returns {Number} 計算式の切り上げ結果
   */
  calcFireworkSize() {
    return Math.ceil(this.meter / 10);
  }
  /**
   * 今までに打ち上がった花火の数を計算
   * @returns {Number}
   */
  calcTotalFireworks() {
    return this.totalCorrectTypeCount + this.totalSentenceCount;
  }
  /**
   * 秒間のタイプ数を計算
   * @returns {Number} 小数は丸めない
   */
  calcTypesPerSecond() {
    return this.getTotalCorrectTypeCount() / (TIME_LIMIT / 1000);
  }
  /**
   * 文章完了時の加算スコア
   * @returns {Number} 計算式の切り上げ結果
   */
  calcSentenceScore() {
    let scoreDiff = 0;
    // (文字数×メーター/10)
    scoreDiff += Math.ceil(
      this.sentenceNowAlphabet.length * this.meter / 10,
    );
    // 加点分に最終倍率をかける
    if (this.meter >= LAST_COEFFICIENT['THRESHOLD_BIG_FIREWORK']) {
      scoreDiff *= LAST_COEFFICIENT['COEFFICIENT_BIG_FIREWORK'];
    } else if (this.meter >= LAST_COEFFICIENT['THRESHOLD_MEDIUM_FIREWORK']) {
      scoreDiff *= LAST_COEFFICIENT['COEFFICIENT_MEDIUM_FIREWORK'];
    } else {
      scoreDiff *= LAST_COEFFICIENT['COEFFICIENT_SMALL_FIREWORK'];
    }
    return Math.ceil(scoreDiff);
  }
  /**
   * ミスタイプ時のメーター減少量
   * @returns {Number} 正整数の減少量
   */
  calcMissPenaltyMeter() {
    return Math.ceil(
      METER['PENALTY_COEFFICENT'] / this.calcExpectedTime() *
        METER['METER_MAX'],
    );
  }
  /**
   * 正解タイプ時のメーター上昇量
   * @returns {Number} 正整数の上昇量
   */
  calcCorrectBonusMeter() {
    return Math.ceil(
      METER['BONUS_COEFFICIENT'] / this.calcExpectedTime() *
        METER['METER_MAX'],
    );
  }
  /**
   * 現在のメーターの値を計算してmeterに代入
   */
  calcMeterNow() {
    // 文章が始まってから何秒経ったか
    const diffTime = (Date.now() - this.sentenceStartTime) / 1000;
    // 経過時間による減少量
    const decreaseByTime = diffTime / this.calcExpectedTime() *
      METER['METER_MAX'];
    // その文章における合計ミスペナルティ減少量
    const sentencePenalty = this.calcMissPenaltyMeter() *
      this.sentenceMissTypeCount;
    // その文章における合計ボーナス上昇量
    const sentenceBonus = this.calcCorrectBonusMeter() * this.sentenceCur;
    // メーター量を計算
    this.meter = METER['METER_MAX'] - decreaseByTime - sentencePenalty +
      sentenceBonus;
    // 計算結果切り上げ
    this.meter = Math.ceil(this.meter);
    // メータのレンジに収まるようにminとmaxを取る
    this.meter = Math.min(
      Math.max(this.meter, METER['METER_MIN']),
      METER['METER_MAX'],
    );
  }
  /**
   * ユーザーからの1文字を入れて正誤判定、スコア加点などをする
   * @param {String} alphabet ユーザーから入力された文字
   * @returns {boolean} 正誤判定結果
   */
  judgeAndCalcScore(alphabet) {
    const isCorrect = this.judgeCorrectness(alphabet);
    if (isCorrect) {
      this.totalScore += this.getScorePerChar();
      if (this.isCompleted()) {
        this.totalScore += this.calcSentenceScore();
      }
    }
    this.calcMeterNow();
    return isCorrect;
  }
}

export { UserGame };
