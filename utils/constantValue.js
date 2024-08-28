// 1ゲームの制限時間(ms)
const TIME_LIMIT = 60 * 1000;
// スコアの初期値
const INITIALIZED_SCORE = 0;

// 難易度で変化する箇所
const DEPEND_DIFFICULTY = {
  'easy': {
    'EXPECTED_TYPES_PER_SEC': 2.0, // 期待される1秒間のタイプ数
    'SCORE_PER_CHAR': 50, // 1文字ごとに加点する点数
  },
  'normal': {
    'EXPECTED_TYPES_PER_SEC': 2.0, // 期待される1秒間のタイプ数
    'SCORE_PER_CHAR': 100, // 1文字ごとに加点する点数
  },
  'hard': {
    'EXPECTED_TYPES_PER_SEC': 4.0, // 期待される1秒間のタイプ数
    'SCORE_PER_CHAR': 200, // 1文字ごとに加点する点数
  },
};

// メーターに関する数値を載せた辞書型
const METER = {
  'METER_MAX': 1000, // メーターの最大値
  'METER_MIN': 1, // メーターの最小値
  'easy': {
    'PENALTY_COEFFICENT': 1.0, // ミス時の減少係数
    'BONUS_COEFFICIENT': 0.1, // 正解時の上昇係数
  },
  'normal': {
    'PENALTY_COEFFICENT': 1.5, // ミス時の減少係数
    'BONUS_COEFFICIENT': 0.2, // 正解時の上昇係数
  },
  'hard': {
    'PENALTY_COEFFICENT': 3.0, // ミス時の減少係数
    'BONUS_COEFFICIENT': 0.4, // 正解時の上昇係数
  },
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

// ランキングの上位何位まで出力するか
const OUTPUT_TOPRANKING_NUMBER = 10;

export {
  DEPEND_DIFFICULTY,
  INITIALIZED_SCORE,
  LAST_COEFFICIENT,
  METER,
  OUTPUT_TOPRANKING_NUMBER,
  TIME_LIMIT,
};
