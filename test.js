// test用　margeする時には消す。
const entered = document.getElementById('entered');
const notEntered = document.getElementById('notEntered');
notEntered.textContent - 'aiueokakikukeko';
const key = 'a';

// notEnteredの最初の一文字を取得
const firstChar = notEntered.textContent.charAt(0);

if (key === firstChar) {
  // notEnteredから最初の一文字を削除
  notEntered.textContent = notEntered.textContent.slice(1);

  // enteredの最後にその一文字を追加
  entered.textContent += firstChar;
}
