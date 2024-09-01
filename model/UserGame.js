//import { TypingText } from 'npm:@mogamoga1024/typing-jp';
import { TypingText } from "https://taisukef.github.io/typing-jp/main.js";

import {
  DEPEND_DIFFICULTY,
  INITIALIZED_SCORE,
  LAST_COEFFICIENT,
  METER,
  TIME_LIMIT,
} from './../utils/constantValue.js';

class UserGame {
  /**
   * @param {String} id ユーザid
   * @param {String} japanese 日本語文章
   * @param {String} reading 文章の読み
   */
  constructor(id, difficulty, japanese, reading) {
    this.id = id;
    this.initialize(difficulty);
    this.setSentenceNow(japanese, reading);
    this.endTime = Date.now() + TIME_LIMIT;
  }

  /**
   * メンバ変数の初期化(idを除く)
   */
  initialize(difficulty) {
    this.endTime = 0; // このゲームの終了時刻
    this.totalScore = 0; // このゲームの合計スコア
    this.totalSentenceCount = 0; // このゲームの合計完了文章
    this.totalTypeCount = 0; // このゲームの合計タイプ数
    this.totalCorrectTypeCount = 0; // このゲームの合計正解タイプ数
    this.difficulty = difficulty; // このゲームの難易度
    this.meter = METER['METER_MAX']; // 花火メーター
  }
  /**
   * 文章と文章時刻のセッター
   * @param {String} japanese
   * @param {String} reading
   */
  setSentenceNow(japanese, reading) {
    this.sentenceNowJapanese = japanese; // 現在の文章の日本語
    this.sentenceNowTypingText = new TypingText(reading); // 現在の文章の読み方
    this.sentenceStartTime = Date.now(); // その文章が始まった時刻
    this.sentenceMissTypeCount = 0; // その文章でのミスタイプ数
  }

  /**
   * 1文字の正誤判定を行う
   * @param {String} alphabet ゲーム中に入力された文字
   * @returns {boolean} 正解ならtrue
   */
  judgeCorrectness(alphabet) {
    const matchResult = this.sentenceNowTypingText.inputKey(alphabet, true);
    const isCorrect = matchResult === 'incomplete' || this.isCompleted();
    this.totalTypeCount++;
    if (isCorrect) {
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
    return this.getRemainingRoman() === '';
  }

  /**
   * endTimeのゲッター
   * @returns {Number}
   */
  getEndTime() {
    return this.endTime;
  }
  /**
   * difficultyのゲッター
   * @returns {String} (easy, normal, hard)のいずれか
   */
  getDifficulty() {
    return this.difficulty;
  }

  /**
   * 1秒あたりの期待タイプ数を取得
   * @returns {Number}
   */
  getExpectedTypesPerSec() {
    return DEPEND_DIFFICULTY[this.getDifficulty()]['EXPECTED_TYPES_PER_SEC'];
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
    return DEPEND_DIFFICULTY[this.getDifficulty()]['SCORE_PER_CHAR'];
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
   * 現在の日本語文章を取得
   * @returns {String}
   */
  getNowJapanese() {
    return this.sentenceNowJapanese;
  }
  /**
   * 現在の状態に関わらずに読み仮名を取得
   * @returns {String}
   */
  getNowYomigana() {
    return this.sentenceNowTypingText.text;
  }
  /**
   * 現在の残り読み仮名を取得
   * @returns {String}
   */
  getRemainingYomigana() {
    return this.sentenceNowTypingText.remainingText;
  }
  /**
   * 現在の完了済み読み仮名を取得
   * @returns {String}
   */
  getCompletedYomigana() {
    return this.sentenceNowTypingText.completedText;
  }
  /**
   * 現在の状態に関わらずにタイプ文字を取得
   * @returns {String}
   */
  getRoman() {
    return this.sentenceNowTypingText.roman;
  }
  /**
   * 残りタイプ文字を取得
   * @returns {String}
   */
  getRemainingRoman() {
    return this.sentenceNowTypingText.remainingRoman;
  }
  /**
   * タイプ済みの文字を取得
   * @returns {String}
   */
  getCompletedRoman() {
    return this.sentenceNowTypingText.completedRoman;
  }

  /**
   * 現在の文章の予測タイムを計算
   * @returns {Number} 予測時間[s]
   */
  calcExpectedTime() {
    return Math.ceil(
      this.getRoman().length / this.getExpectedTypesPerSec(),
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
    return this.totalSentenceCount;
  }
  /**
   * このゲームにおける合計ミスタイプ数
   * @returns {Number}
   */
  calcTotalMissType() {
    return this.totalTypeCount - this.totalCorrectTypeCount;
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
      this.getCompletedRoman().length * this.meter / 10,
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
      METER[this.getDifficulty()]['PENALTY_COEFFICENT'] /
        this.calcExpectedTime() *
        METER['METER_MAX'],
    );
  }
  /**
   * 正解タイプ時のメーター上昇量
   * @returns {Number} 正整数の上昇量
   */
  calcCorrectBonusMeter() {
    return Math.ceil(
      METER[this.getDifficulty()]['BONUS_COEFFICIENT'] /
        this.calcExpectedTime() *
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
    const sentenceBonus = this.calcCorrectBonusMeter() *
      this.getCompletedRoman().length;
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
