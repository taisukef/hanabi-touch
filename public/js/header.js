        async function loadHeader() {
            await fetch('../header.html')
                .then((response) => response.text())
                .then((data) => {
                    document.getElementById('header').innerHTML = data;
                });

            // ヘッダーの読み込みが完了したら、ページ全体を表示
            document.body.style.visibility = 'visible';
        }

        // DOMの解析が完了したらloadHeaderを呼び出す
        document.addEventListener('DOMContentLoaded', loadHeader);
