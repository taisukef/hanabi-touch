// 期待される1秒間のタイプ数
const EXPECTED_TYPES_PER_SEC = 2;
// 1文字ごとに加点する点数
const SCORE_PER_CHAR = 100;
// 1ゲームの制限時間(ms)
const TIME_LIMIT = 60 * 1000;
// スコアの初期値
const INITIALIZED_SCORE = 0;
// typingTextの初期値文字列(コンストラクタに空文字列は入れられないため)
const INITIALIZED_TYPINGTEXT = 'test';

// メーターに関する数値を載せた辞書型
const METER = {
  'METER_MAX': 1000, // メーターの最大値
  'METER_MIN': 1, // メーターの最小値
  'PENALTY_COEFFICENT': 1.5, // ミス時の減少係数
  'BONUS_COEFFICIENT': 0.2, // 正解時の上昇係数
};

// 最終倍率に関する数値を載せた辞書型
const LAST_COEFFICIENT = {
  'THRESHOLD_BIG_FIREWORK': 666, // 大花火のメーター閾値
  'THRESHOLD_MEDIUM_FIREWORK': 333, // 中花火のメーター閾値
  'THRESHOLD_SMALL_FIREWORK': 0, // 小花火のメーター閾値
  'COEFFICIENT_BIG_FIREWORK': 2.0, // 大花火の最終倍率
  'COEFFICIENT_MEDIUM_FIREWORK': 1.5, // 中花火の最終倍率
  'COEFFICIENT_SMALL_FIREWORK': 1.0, // 小花火の最終倍率
};

export {
  EXPECTED_TYPES_PER_SEC,
  INITIALIZED_SCORE,
  INITIALIZED_TYPINGTEXT,
  LAST_COEFFICIENT,
  METER,
  SCORE_PER_CHAR,
  TIME_LIMIT,
};
